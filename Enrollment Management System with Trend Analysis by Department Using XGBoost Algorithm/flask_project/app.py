import mysql.connector
from mysql.connector import pooling

import logging
import traceback
import re
import time
import pandas as pd
import xgboost as xgb
import numpy as np

from sklearn.model_selection import train_test_split, StratifiedKFold, cross_val_score
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix, classification_report

from flask import Flask, jsonify, request, render_template
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

@app.route("/")
def index():  
    return render_template("index.html")

@app.route("/home")
def home():
    return render_template("home.html")

@app.route("/forecast_stages")
def forecast_stages():
    return render_template("forecast_stages.html")

@app.route("/insights")
def insights():
    return render_template("insights.html")

@app.route("/reports")
def reports():
    return render_template("reports.html")

@app.route("/settings")
def settings():
    return render_template("settings.html")


db_config = {
    "host": "localhost",
    "user": "root",
    "password": "",
    "database": "enrollmentthesis"
}

db_pool = pooling.MySQLConnectionPool(
    pool_name="app_pool",
    pool_size=5,
    **db_config
)

logging.basicConfig(level=logging.INFO)

def get_db_connection():
    """Get a fresh database connection from the pool"""
    return db_pool.get_connection()


logging.basicConfig(level=logging.DEBUG)



# ========================================== STAGE 1: LOAD & CLEAN DATA STAGE =======================================//

@app.route('/api/check-year-range', methods=['POST'])
def check_year_range():
    conn = None
    cursor = None
    try:
        data = request.get_json()
        start_year = data.get("startYear")
        end_year = data.get("endYear")
        if not start_year or not end_year:
            return jsonify({"error": "Both start year and end year must be provided."}), 400
        start_year = int(start_year)
        end_year = int(end_year)
        year_ranges = [f"{y}-{y+1}" for y in range(start_year, end_year + 1)]
        placeholders = ', '.join(['%s'] * len(year_ranges))
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        query = f"SELECT school_year FROM student_info WHERE school_year IN ({placeholders})"
        cursor.execute(query, year_ranges)
        result = cursor.fetchall()

        if result:
            return jsonify({"message": "The selected year range is available in the database."}), 200
        else:
            return jsonify({"error": "No data found for the selected range."}), 404

    except mysql.connector.Error as err:
        logging.error(f"Database error: {err}")
        return jsonify({"error": "Database operation failed"}), 500
    except Exception as e:
        logging.error(f"Unexpected error: {e}")
        return jsonify({"error": "Server error"}), 500
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()

@app.route('/api/check-existing-data', methods=['GET'])
def check_existing_data():
    conn = None
    cursor = None
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        tables = ['load_data', 'preprocessing_data', 'final_preprocessed_data']
        has_data = False
        
        for table in tables:
            cursor.execute(f"SELECT COUNT(*) FROM {table}")
            if cursor.fetchone()[0] > 0:
                has_data = True
                break
                
        return jsonify({"has_data": has_data}), 200
        
    except mysql.connector.Error as err:
        return jsonify({"error": f"Database error: {err}"}), 500
    finally:
        if cursor: cursor.close()
        if conn: conn.close()

@app.route('/api/reset-tables', methods=['POST'])
def reset_tables():
    conn = None
    cursor = None
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute("TRUNCATE TABLE load_data;")
        cursor.execute("TRUNCATE TABLE preprocessing_data;")
        cursor.execute("TRUNCATE TABLE final_preprocessed_data;")
        conn.commit()
        
        return jsonify({"message": "All tables reset successfully"}), 200
    except mysql.connector.Error as err:
        conn.rollback()
        return jsonify({"error": f"Database error: {err}"}), 500
    finally:
        if cursor: cursor.close()
        if conn: conn.close()

@app.route('/api/process-school-dataset', methods=['POST'])
def process_school_dataset():
    conn = None
    cursor = None
    try:
        data = request.get_json()
        start_year = int(data.get('startYear'))
        end_year = int(data.get('endYear'))
        batch_size = 1000
        last_student_id = ""
        last_school_year = ""

        if start_year >= end_year:
            return jsonify({"error": "Start year must be less than end year."}), 400

        school_years = [f"{y}-{y+1}" for y in range(start_year, end_year)]
        for year in school_years:
            if not re.match(r"^\d{4}-\d{4}$", year):
                return jsonify({"error": f"Invalid school year format: {year}"}), 400

        placeholders = ', '.join(['%s'] * len(school_years))
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        try:
            cursor.execute("SELECT COUNT(*) AS row_count FROM load_data;")
            result = cursor.fetchone()
            existing_rows = result['row_count']

            if existing_rows > 0:
                cursor.execute("TRUNCATE TABLE load_data;")
                cursor.execute("TRUNCATE TABLE preprocessing_data;")
                cursor.execute("TRUNCATE TABLE final_preprocessed_data;")
                conn.commit()
                logging.info("All tables truncated for fresh data load")

                logging.info(f"Cleared {existing_rows} existing rows from load_data")
                logging.info(f"Cleared {existing_rows} existing rows from preprocessing_data")
                logging.info(f"Cleared {existing_rows} existing rows from final_preprocessed_data")
            else:
                logging.info("load_data is empty - proceeding without truncation")
                logging.info("preprocessing_data is empty - proceeding without truncation")
                logging.info("final_preprocessed_data is empty - proceeding without truncation")
        except mysql.connector.Error as truncate_error:
                conn.rollback()
                logging.error(f"Table truncation failed: {truncate_error}")
                return jsonify({"error": "Database maintenance failed"}), 500

        total_inserted = 0
        loop_count = 0

        while True:
            loop_count += 1
            
            query = f"""
                SELECT 
                    si.branch,
                    si.student_id,
                    si.school_year,
                    si.semester,
                    si.department,
                    si.program,
                    si.year_level,
                    si.classified_as,
                    si.status,
                    si.last_school_attended,
                    COALESCE(pi.gender, 'Unknown') AS gender,
                    COALESCE(pi.birth_date, '01/01/1900') AS birth_date,
                    COALESCE(pi.civil_status, 'Unknown') AS civil_status,
                    COALESCE(pi.address, 'Unknown') AS address,
                    COALESCE(pi.birth_place, 'Unknown') AS birth_place
                FROM student_info si
                LEFT JOIN personal_info pi
                    ON si.student_id = pi.student_info_id
                WHERE si.school_year IN ({placeholders})
                    AND (si.student_id, si.school_year) > (%s, %s)
                ORDER BY si.student_id, si.school_year
                LIMIT %s;
            """
            params = school_years + [last_student_id, last_school_year, batch_size]

            try:
                cursor.execute(query, params)
                batch = cursor.fetchall()
            except mysql.connector.Error as query_error:
                logging.error(f"Query failed: {query_error}")
                break

            if not batch:
                logging.info(f"Completed processing after {loop_count} batches")
                break

            insert_query = """
                INSERT INTO load_data (
                    branch, student_id, school_year, semester,
                    department, program, year_level, classified_as,
                    status, last_school_attended, gender, birth_date,
                    civil_status, address, birth_place
                ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """
            
            insert_values = [
                (
                    row['branch'],
                    row['student_id'],
                    row['school_year'],
                    row['semester'],
                    row['department'],
                    row['program'],
                    row['year_level'],
                    row['classified_as'],
                    row['status'],
                    row['last_school_attended'],
                    row['gender'],
                    row['birth_date'],
                    row['civil_status'],
                    row['address'],
                    row['birth_place']
                ) for row in batch
            ]

            try:
                cursor.executemany(insert_query, insert_values)
                conn.commit()
                inserted = cursor.rowcount
                total_inserted += inserted
                logging.info(f"Batch {loop_count}: Inserted {inserted} rows")
                last_row = batch[-1]
                last_student_id = last_row['student_id']
                last_school_year = last_row['school_year']

            except mysql.connector.Error as insert_error:
                conn.rollback()
                logging.error(f"Batch insert failed: {insert_error}")
                logging.debug(f"Failed batch: {insert_values[:1]}")
                continue

        if total_inserted == 0:
            response = {
                "status": "warning",
                "message": "No matching records found"
            }
            return jsonify(response), 200

        cursor.execute("""
            SELECT *
            FROM load_data
            WHERE 
                branch IS NULL OR branch = ''
                OR student_id IS NULL OR student_id = ''
                OR school_year IS NULL OR school_year = ''
                OR semester IS NULL OR semester = ''
                OR department IS NULL OR department = ''
                OR program IS NULL OR program = ''
                OR year_level IS NULL OR year_level = ''
                OR classified_as IS NULL OR classified_as = ''
                OR status IS NULL OR status = ''
                OR last_school_attended IS NULL OR last_school_attended = ''
                OR gender IS NULL OR gender = ''
                OR birth_date IS NULL OR birth_date = ''
                OR civil_status IS NULL OR civil_status = ''
                OR address IS NULL OR address = ''
                OR birth_place IS NULL OR birth_place = ''
                OR birth_date NOT REGEXP '^\\d{2}/\\d{2}/\\d{4}$'
                OR student_id NOT REGEXP '^[A-Za-z0-9]+$'
                OR school_year NOT REGEXP '^\\d{4}-\\d{4}$'
                OR gender NOT IN ('Male', 'Female', 'Unknown')
                OR civil_status NOT IN ('Single', 'Married', 'Divorced', 'Widowed', 'Unknown')
                OR (student_id, school_year) IN (
                    SELECT student_id, school_year
                    FROM load_data
                    GROUP BY student_id, school_year
                    HAVING COUNT(*) > 1
                );
        """)
        dirty_rows = cursor.fetchall()

        response = {
            "status": "success",
            "inserted_rows": total_inserted,
            "processed_years": school_years,
            "batches_processed": loop_count - 1,
            "dirty_records": dirty_rows,
            "message": "Dataset processed successfully"
        }

        return jsonify(response), 200

    except Exception as e:
        logging.error(f"CRITICAL ERROR: {traceback.format_exc()}")
        return jsonify({
            "status": "error",
            "message": f"Processing failed: {str(e)}"
        }), 500

    finally:
        if cursor:
            cursor.close()
        if conn and conn.is_connected():
            conn.close()
            logging.info("Database connection closed")
            

@app.route('/api/clean-data', methods=['POST'])
def clean_data():
    conn = None
    cursor = None
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("""
            UPDATE load_data 
            SET 
                last_school_attended = UPPER(TRIM(REGEXP_REPLACE(last_school_attended, ' +', ' '))),
                last_school_attended = COALESCE(NULLIF(last_school_attended, ''), 'UNKNOWN')
            WHERE last_school_attended IS NOT NULL;
        """)

        fields = [
            'branch', 'student_id', 'school_year', 'semester',
            'department', 'program', 'year_level', 'classified_as',
            'status', 'gender', 'civil_status', 'address', 'birth_place'
        ]
        
        for field in fields:
            cursor.execute(f"""
                UPDATE load_data 
                SET {field} = COALESCE(NULLIF({field}, ''), 'UNKNOWN')
                WHERE {field} IS NULL OR {field} = '';
            """)
        text_fields = fields + ['last_school_attended']
        for field in text_fields:
            cursor.execute(f"""
                UPDATE load_data 
                SET {field} = UPPER({field});
            """)
        cursor.execute("""
            DELETE FROM load_data 
            WHERE 
                student_id NOT REGEXP '^[A-Z0-9-]+$' OR
                school_year NOT REGEXP '^[0-9]{4}-[0-9]{4}$';
        """)
        deleted_count = cursor.rowcount
        cursor.execute("""
            SELECT *
            FROM load_data
            WHERE 
                branch IS NULL OR branch = ''
                OR student_id IS NULL OR student_id = ''
                OR school_year IS NULL OR school_year = ''
                OR semester IS NULL OR semester = ''
                OR department IS NULL OR department = ''
                OR program IS NULL OR program = ''
                OR year_level IS NULL OR year_level = ''
                OR classified_as IS NULL OR classified_as = ''
                OR status IS NULL OR status = ''
                OR last_school_attended IS NULL OR last_school_attended = ''
                OR gender IS NULL OR gender = ''
                OR birth_date IS NULL OR birth_date = ''
                OR civil_status IS NULL OR civil_status = ''
                OR address IS NULL OR address = ''
                OR birth_place IS NULL OR birth_place = '';
        """)
        remaining_dirty = cursor.fetchall()

        conn.commit()

        return jsonify({
            "status": "success",
            "cleaned_rows": cursor.rowcount - deleted_count,
            "remaining_dirty": len(remaining_dirty),
            "remaining_dirty_list": remaining_dirty,
            "message": "Data standardized to uppercase with UNKNOWN placeholders"
        }), 200

    except mysql.connector.Error as err:
        conn.rollback()
        app.logger.error(f"Clean error: {err}")
        return jsonify({"status": "error", "error": "Database cleaning failed"}), 500
    finally:
        if cursor: cursor.close()
        if conn: conn.close()

# ====================================== STAGE 2: TRAIN READY STAGE =======================================//


@app.route('/api/build-preprocessed-data', methods=['POST'])
def build_preprocessed_data():
    conn = None
    cursor = None
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("DROP TABLE IF EXISTS preprocessing_data")
        cursor.execute("""
            CREATE TABLE preprocessing_data (
                student_id VARCHAR(20),
                school_year VARCHAR(10),
                semester VARCHAR(10),
                department VARCHAR(50),
                status VARCHAR(20),
                gender VARCHAR(10),
                birth_date DATE,
                civil_status VARCHAR(20),
                start_year INT,
                end_year INT,
                age INT,
                enrolled_last_semester BOOLEAN
            )
        """)
        transform_query = """
            INSERT INTO preprocessing_data (
              student_id, school_year, semester, department, status, gender, 
              birth_date, civil_status, start_year, end_year, age
            )
            SELECT 
              student_id,
              school_year,
              semester,
              TRIM(department),
              status,
              gender,
              STR_TO_DATE(birth_date, '%m/%d/%Y'),
              civil_status,
              CAST(SUBSTRING_INDEX(school_year, '-', 1) AS UNSIGNED),
              CAST(SUBSTRING_INDEX(school_year, '-', -1) AS UNSIGNED),
              CAST(SUBSTRING_INDEX(school_year, '-', 1) AS SIGNED) - 
                YEAR(STR_TO_DATE(birth_date, '%m/%d/%Y'))
            FROM load_data
        """
        cursor.execute(transform_query)
        inserted_rows = cursor.rowcount
        cursor.execute("""
            UPDATE preprocessing_data p
            JOIN (
                SELECT 
                    student_id,
                    school_year,
                    semester,
                    LAG(status) OVER (
                        PARTITION BY student_id 
                        ORDER BY 
                            CAST(SUBSTRING_INDEX(school_year, '-', 1) AS UNSIGNED),
                            CASE semester
                                WHEN '1ST' THEN 1
                                WHEN '2ND' THEN 2
                                ELSE 3
                            END
                    ) AS prev_status
                FROM preprocessing_data
            ) AS prev_status_data
            ON p.student_id = prev_status_data.student_id
                AND p.school_year = prev_status_data.school_year
                AND p.semester = prev_status_data.semester
            SET p.enrolled_last_semester = (prev_status_data.prev_status = 'ENROLLED')
        """)
        updated_rows = cursor.rowcount

        conn.commit()

        return jsonify({
            "message": "Preprocessed data built successfully",
            "stats": {
                "total_inserted": inserted_rows,
                "total_updated": updated_rows,
                "invalid_birthdates": inserted_rows - cursor.rowcount  # Show failed conversions
            }
        }), 200

    except mysql.connector.Error as err:
        conn.rollback()
        return jsonify({"error": f"Database error: {err}"}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if cursor: cursor.close()
        if conn: conn.close()

@app.route('/api/build-final-preprocessed-data', methods=['POST'])
def build_final_preprocessed_data():
    conn = None
    cursor = None
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        def get_distinct_values(column):
            cursor.execute(f"SELECT DISTINCT {column} FROM preprocessing_data")
            return [row[0] for row in cursor.fetchall() if row[0] is not None]

        categories = {
            'departments': get_distinct_values('department'),
            'semesters': get_distinct_values('semester'),
            'genders': get_distinct_values('gender'),
            'civil_statuses': get_distinct_values('civil_status'),
            'statuses': get_distinct_values('status')
        }
        column_defs = [
            "student_id VARCHAR(20)",
            "age INT", 
            "start_year INT"
        ]
        
        def safe_col_name(prefix, value):
            return f"{prefix}_{str(value).replace(' ', '_').replace('-', '_').upper()}"
        for dept in categories['departments']:
            column_defs.append(f"{safe_col_name('department', dept)} BOOLEAN NOT NULL DEFAULT FALSE")
        for sem in categories['semesters']:
            column_defs.append(f"{safe_col_name('semester', sem)} BOOLEAN NOT NULL DEFAULT FALSE")
        for gender in categories['genders']:
            column_defs.append(f"{safe_col_name('gender', gender)} BOOLEAN NOT NULL DEFAULT FALSE")
        for status in categories['civil_statuses']:
            column_defs.append(f"{safe_col_name('civil_status', status)} BOOLEAN NOT NULL DEFAULT FALSE")
        for stat in categories['statuses']:
            column_defs.append(f"{safe_col_name('status', stat)} BOOLEAN NOT NULL DEFAULT FALSE")

        column_defs.append("enrolled_last_semester BOOLEAN NOT NULL DEFAULT FALSE")
        cursor.execute("DROP TABLE IF EXISTS final_preprocessed_data")
        create_table = f"""
            CREATE TABLE final_preprocessed_data (
                {', '.join(column_defs)}
            )
        """
        cursor.execute(create_table)

        select_cols = [
            "student_id",
            "COALESCE(age, 0) AS age", 
            "start_year"
        ]

        for dept in categories['departments']:
            safe_dept = dept.replace("'", "''")
            select_cols.append(
                f"CASE WHEN department = '{safe_dept}' THEN TRUE ELSE FALSE END AS {safe_col_name('department', dept)}"
            )
        for sem in categories['semesters']:
            safe_sem = sem.replace("'", "''")
            select_cols.append(
                f"CASE WHEN semester = '{safe_sem}' THEN TRUE ELSE FALSE END AS {safe_col_name('semester', sem)}"
            )
        for gender in categories['genders']:
            safe_gender = gender.replace("'", "''")
            select_cols.append(
                f"CASE WHEN gender = '{safe_gender}' THEN TRUE ELSE FALSE END AS {safe_col_name('gender', gender)}"
            )
        for status in categories['civil_statuses']:
            safe_status = status.replace("'", "''")
            select_cols.append(
                f"CASE WHEN civil_status = '{safe_status}' THEN TRUE ELSE FALSE END AS {safe_col_name('civil_status', status)}"
            )
        for stat in categories['statuses']:
            safe_stat = stat.replace("'", "''")
            select_cols.append(
                f"CASE WHEN status = '{safe_stat}' THEN TRUE ELSE FALSE END AS {safe_col_name('status', stat)}"
            )

        select_cols.append("COALESCE(enrolled_last_semester, FALSE) AS enrolled_last_semester")

        insert_query = f"""
            INSERT INTO final_preprocessed_data
            SELECT {', '.join(select_cols)}
            FROM preprocessing_data
        """
        cursor.execute(insert_query)
        inserted_rows = cursor.rowcount

        conn.commit()

        return jsonify({
            "message": "Final preprocessed data built successfully",
            "stats": {
                "total_records": inserted_rows,
                "categories": categories
            }
        }), 200

    except mysql.connector.Error as err:
        if conn:
            conn.rollback()
        return jsonify({"error": f"Database error: {err}"}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()

@app.route('/api/get-final-preprocessed-data', methods=['GET'])
def get_final_preprocessed_data():
    conn = None
    cursor = None
    try:
        page = request.args.get('page', 1, type=int)
        per_page = 10
        offset = (page - 1) * per_page
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT COUNT(*) AS total FROM final_preprocessed_data")
        total_count = cursor.fetchone()['total']
        total_pages = (total_count + per_page - 1) // per_page
        cursor.execute("SELECT * FROM final_preprocessed_data LIMIT %s OFFSET %s", (per_page, offset))
        data = cursor.fetchall()

        if data:
            for record in data:
                for key, value in record.items():
                    if isinstance(value, (bool, int)):
                        record[key] = int(value)

        return jsonify({
            "data": data,
            "pagination": {
                "current_page": page,
                "total_pages": total_pages,
                "total_items": total_count,
                "per_page": per_page
            }
        }), 200

    except mysql.connector.Error as err:
        return jsonify({"error": f"Database error: {err}"}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if cursor: cursor.close()
        if conn: conn.close()

@app.route('/api/search-final-preprocessed-data', methods=['GET'])
def search_final_preprocessed_data():
    search_term = request.args.get('search', '').strip().lower()
    page = request.args.get('page', 1, type=int)
    per_page = 10
    offset = (page - 1) * per_page

    conn = None
    cursor = None
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("""
            SELECT COLUMN_NAME 
            FROM INFORMATION_SCHEMA.COLUMNS 
            WHERE TABLE_NAME = 'final_preprocessed_data'
        """)
        columns = [row['COLUMN_NAME'] for row in cursor.fetchall()]
        search_pattern = f"%{search_term}%"
        conditions = [f"LOWER(`{col}`) LIKE %s" for col in columns]
        where_clause = " OR ".join(conditions) if conditions else "1=1"
        query = f"""
            SELECT * 
            FROM final_preprocessed_data 
            WHERE {where_clause}
            LIMIT %s OFFSET %s
        """
        params = [search_pattern] * len(columns) + [per_page, offset]
        cursor.execute(query, params)
        data = cursor.fetchall()
        for record in data:
            for key, value in record.items():
                if isinstance(value, bool):
                    record[key] = int(value)
        count_query = f"SELECT COUNT(*) AS total FROM final_preprocessed_data WHERE {where_clause}"
        cursor.execute(count_query, [search_pattern] * len(columns))
        total_count = cursor.fetchone()['total']
        total_pages = (total_count + per_page - 1) // per_page

        return jsonify({
            "data": data,
            "pagination": {
                "current_page": page,
                "total_pages": total_pages,
                "total_items": total_count,
                "per_page": per_page
            }
        }), 200

    except mysql.connector.Error as err:
        return jsonify({"error": f"Database error: {err}"}), 500
    finally:
        if cursor: cursor.close()
        if conn: conn.close()



# ================================== STAGE 3: TRAIN XGBOOST MODEL STAGE =================================
latest_predictions = []
latest_feature_importance = []
@app.route('/api/train-model', methods=['POST'])
def train_model():
    import time
    import xgboost as xgb
    import pandas as pd
    from sklearn.model_selection import train_test_split
    from sklearn.metrics import accuracy_score, roc_auc_score
    from sklearn.inspection import permutation_importance

    conn = None
    cursor = None
    try:
        start_time = time.time()

        data = request.json
        learning_rate = float(data.get('learning_rate', 0.1))
        max_depth = int(data.get('max_depth', 5))

        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute("SELECT * FROM final_preprocessed_data")
        rows = cursor.fetchall()

        if not rows:
            return jsonify({"error": "No data found"}), 400

        df = pd.DataFrame(rows)

        X = df.drop(columns=['student_id', 'status_ENROLLED'])
        y = df['status_ENROLLED']

        X_train, X_val, y_train, y_val = train_test_split(
            X, y, test_size=0.2, random_state=42, stratify=y
        )

        model = xgb.XGBClassifier(
            learning_rate=learning_rate,
            max_depth=max_depth,
            n_estimators=100,
            use_label_encoder=False,
            eval_metric='logloss'
        )
        model.fit(X_train, y_train)
        y_pred_proba = model.predict_proba(X_val)[:, 1]
        y_pred = (y_pred_proba >= 0.5).astype(int)

        accuracy = accuracy_score(y_val, y_pred)
        auc = roc_auc_score(y_val, y_pred_proba)
        training_time = time.time() - start_time
        insert_query = """
            INSERT INTO training_history (learning_rate, max_depth, accuracy, auc, training_time)
            VALUES (%s, %s, %s, %s, %s)
        """
        cursor.execute(insert_query, (learning_rate, max_depth, accuracy, auc, training_time))
        conn.commit()
        global latest_predictions
        val_student_ids = df.iloc[y_val.index]['student_id'].values
        latest_predictions = [
            {"student_id": sid, "probability": float(prob)}
            for sid, prob in zip(val_student_ids, y_pred_proba)
        ]
        feature_importance = model.feature_importances_
        global latest_feature_importance
        latest_feature_importance = [
            {"feature": feature, "importance": float(importance)}
            for feature, importance in zip(X.columns, feature_importance)
        ]

        return jsonify({
            "message": "Model trained",
            "metrics": {
                "accuracy": round(accuracy, 4),
                "auc": round(auc, 4),
                "training_time_seconds": round(training_time, 2)
            }
        }), 200

    except Exception as e:
        if conn: conn.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        if cursor: cursor.close()
        if conn: conn.close()
@app.route('/api/get-predictions', methods=['GET'])
def get_predictions():
    try:
        page = int(request.args.get('page', 1))
        page_size = int(request.args.get('page_size', 10))

        start = (page - 1) * page_size
        end = start + page_size

        predictions_page = latest_predictions[start:end]
        total_pages = (len(latest_predictions) + page_size - 1) // page_size

        return jsonify({
            "predictions": predictions_page,
            "current_page": page,
            "total_pages": total_pages
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500
@app.route('/api/get-feature-importance', methods=['GET'])
def get_feature_importance():
    try:
        return jsonify({
            "feature_importance": latest_feature_importance
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500
@app.route('/api/get-training-history', methods=['GET'])
def get_training_history():
    conn = None
    cursor = None
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute("""
            SELECT id, learning_rate, max_depth, accuracy, auc, training_time, created_at
            FROM training_history
            ORDER BY created_at DESC
            LIMIT 20
        """)
        history = cursor.fetchall()

        return jsonify({"history": history})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if cursor: cursor.close()
        if conn: conn.close()

@app.route('/api/clear-training-history', methods=['POST'])
def clear_training_history():
    conn = None
    cursor = None
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM training_history")
        conn.commit()
        return jsonify({"message": "Training history cleared"}), 200
    except Exception as e:
        if conn: conn.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        if cursor: cursor.close()
        if conn: conn.close()









# REPORTS PAGE ENDPOINTS =================================================================
@app.route('/api/enrollment-historical', methods=['GET'])
def get_enrollment_historical():
    conn = None
    cursor = None
    try:
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)
        offset = (page - 1) * per_page
        if page < 1 or per_page < 1:
            return jsonify({"error": "Invalid pagination parameters"}), 400

        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute('SELECT COUNT(*) AS total FROM en_historical_dl')
        total_count = cursor.fetchone()['total']
        total_pages = (total_count + per_page - 1) // per_page
        cursor.execute(
            '''SELECT branch, stud_id, last_name, year_level, 
                    department, school_year, semester, status 
             FROM en_historical_dl 
             LIMIT %s OFFSET %s''', 
            (per_page, offset)
        )
        data = cursor.fetchall()

        return jsonify({
            "data": data,
            "pagination": {
                "current_page": page,
                "total_pages": total_pages,
                "total_items": total_count,
                "per_page": per_page
            }
        })

    except mysql.connector.Error as err:
        logging.error(f"Database error: {err}")
        return jsonify({"error": "Database operation failed"}), 500
    except Exception as e:
        logging.error(f"Unexpected error: {e}")
        return jsonify({"error": "Server error"}), 500
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()

@app.route('/api/popularity-rankings', methods=['GET'])
def get_popularity_rankings():
    conn = None
    cursor = None
    try:
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)
        offset = (page - 1) * per_page
        if page < 1 or per_page < 1:
            return jsonify({"error": "Invalid pagination parameters"}), 400

        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute('SELECT COUNT(*) AS total FROM pop_rankings_dl')
        total_count = cursor.fetchone()['total']
        total_pages = (total_count + per_page - 1) // per_page

        cursor.execute(
            '''SELECT department, school_year, semester, 
                      prog_strand, stud_enrolled, rank, rank_percentage 
               FROM pop_rankings_dl 
               LIMIT %s OFFSET %s''',
            (per_page, offset)
        )
        data = cursor.fetchall()

        return jsonify({
            "data": data,
            "pagination": {
                "current_page": page,
                "total_pages": total_pages,
                "total_items": total_count,
                "per_page": per_page
            }
        })

    except mysql.connector.Error as err:
        logging.error(f"Database error: {err}")
        return jsonify({"error": "Database operation failed"}), 500
    except Exception as e:
        logging.error(f"Unexpected error: {e}")
        return jsonify({"error": "Server error"}), 500
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()

@app.route('/api/retention-rates', methods=['GET'])
def get_retention_rates():
    conn = None
    cursor = None
    try:
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)
        offset = (page - 1) * per_page
        if page < 1 or per_page < 1:
            return jsonify({"error": "Invalid pagination parameters"}), 400

        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute('SELECT COUNT(*) AS total FROM rd_rates_dl')
        total_count = cursor.fetchone()['total']
        total_pages = (total_count + per_page - 1) // per_page
        cursor.execute(
            '''SELECT school_year, semester, new_stud_count, 
                      alumni_stud_count, dropout_rate 
               FROM rd_rates_dl 
               LIMIT %s OFFSET %s''',
            (per_page, offset)
        )
        data = cursor.fetchall()

        return jsonify({
            "data": data,
            "pagination": {
                "current_page": page,
                "total_pages": total_pages,
                "total_items": total_count,
                "per_page": per_page
            }
        })

    except mysql.connector.Error as err:
        logging.error(f"Database error: {err}")
        return jsonify({"error": "Database operation failed"}), 500
    except Exception as e:
        logging.error(f"Unexpected error: {e}")
        return jsonify({"error": "Server error"}), 500
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()

@app.route('/api/feeder-schools', methods=['GET'])
def get_feeder_schools():
    conn = None
    cursor = None
    try:
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)
        offset = (page - 1) * per_page
        if page < 1 or per_page < 1:
            return jsonify({"error": "Invalid pagination parameters"}), 400

        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute('SELECT COUNT(*) AS total FROM fm_analysis_dl')
        total_count = cursor.fetchone()['total']
        total_pages = (total_count + per_page - 1) // per_page
        cursor.execute(
            '''SELECT school_year, feeder_school, total_stud, 
                      pop_prgstrnd, year_trend, trend_rate 
               FROM fm_analysis_dl 
               LIMIT %s OFFSET %s''',
            (per_page, offset)
        )
        data = cursor.fetchall()

        return jsonify({
            "data": data,
            "pagination": {
                "current_page": page,
                "total_pages": total_pages,
                "total_items": total_count,
                "per_page": per_page
            }
        })

    except mysql.connector.Error as err:
        logging.error(f"Database error: {err}")
        return jsonify({"error": "Database operation failed"}), 500
    except Exception as e:
        logging.error(f"Unexpected error: {e}")
        return jsonify({"error": "Server error"}), 500
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()




# SETTINGS PAGE ENDPOINTS =================================================================
@app.route('/get_param/<int:id>', methods=['GET'])
def get_shs(id):
    conn = None
    cursor = None
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute(
            "SELECT sd_ratio, dept_count, staff_count, pp_ratio, prog_count, prof_count, "
            "cs_ratio, regroom_count, regstud_count, ls_ratio, labroom_count, labstud_count "
            "FROM parameters WHERE id_pr = %s",
            (id,)
        )
        data = cursor.fetchone()

        if data:
            return jsonify({"status": "success", "data": data}), 200
        return jsonify({"status": "error", "message": "No data found"}), 404

    except mysql.connector.Error as err:
        logging.error(f"Database error: {err}")
        return jsonify({"status": "error", "message": "Database operation failed"}), 500

    except Exception as e:
        logging.error(f"Unexpected error: {str(e)}")
        return jsonify({"status": "error", "message": "Server error occurred"}), 500

    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()

@app.route('/update_param', methods=['POST'])
def update_param():
    conn = None
    cursor = None
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        data = request.get_json()
        param_id = data.get('id')
        def validate_int(value, field):
            if isinstance(value, (int, float)) or (isinstance(value, str) and value.isdigit()):
                return int(value)
            raise ValueError(f"Invalid value for {field}: {value}")
        fields = [
            validate_int(data.get('sd_ratio', 0), 'sd_ratio'),
            validate_int(data.get('dept_count', 0), 'dept_count'),
            validate_int(data.get('staff_count', 0), 'staff_count'),
            validate_int(data.get('pp_ratio', 0), 'pp_ratio'),
            validate_int(data.get('prog_count', 0), 'prog_count'),
            validate_int(data.get('prof_count', 0), 'prof_count'),
            validate_int(data.get('cs_ratio', 0), 'cs_ratio'),
            validate_int(data.get('regroom_count', 0), 'regroom_count'),
            validate_int(data.get('regstud_count', 0), 'regstud_count'),
            validate_int(data.get('ls_ratio', 0), 'ls_ratio'),
            validate_int(data.get('labroom_count', 0), 'labroom_count'),
            validate_int(data.get('labstud_count', 0), 'labstud_count'),
            param_id
        ]

        cursor.execute(
            """UPDATE parameters SET
                sd_ratio = %s, dept_count = %s, staff_count = %s,
                pp_ratio = %s, prog_count = %s, prof_count = %s,
                cs_ratio = %s, regroom_count = %s, regstud_count = %s,
                ls_ratio = %s, labroom_count = %s, labstud_count = %s
            WHERE id_pr = %s""",
            tuple(fields)
        )
        conn.commit()
        return jsonify({"status": "success", "message": "Parameters updated successfully!"}), 200

    except ValueError as ve:
        return jsonify({"status": "error", "message": str(ve)}), 400

    except mysql.connector.Error as err:
        conn.rollback()
        logging.error(f"Database error: {err}")
        return jsonify({"status": "error", "message": "Database operation failed"}), 500
    except Exception as e:
        if conn:
            conn.rollback()
        logging.error(f"Unexpected error: {str(e)}")
        return jsonify({"status": "error", "message": "Server error occurred"}), 500
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()

@app.route('/reset_param', methods=['POST'])
def reset_param():
    conn = None
    cursor = None
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        data = request.get_json()
        param_id = data.get('id')

        if param_id not in [1, 2]:
            return jsonify({"status": "error", "message": "Invalid parameter ID"}), 400
        cursor.execute(
            """UPDATE parameters SET
                sd_ratio = 0, dept_count = 0, staff_count = 0,
                pp_ratio = 0, prog_count = 0, prof_count = 0,
                cs_ratio = 0, regroom_count = 0, regstud_count = 0,
                ls_ratio = 0, labroom_count = 0, labstud_count = 0
            WHERE id_pr = %s""",
            (param_id,)
        )
        conn.commit()
        return jsonify({"status": "success", "message": f"Parameters reset successfully for ID {param_id}!"}), 200
    except mysql.connector.Error as err:
        if conn:
            conn.rollback()
        logging.error(f"Database error during reset: {err}")
        return jsonify({"status": "error", "message": "Database operation failed"}), 500
    except Exception as e:
        if conn:
            conn.rollback()
        logging.error(f"Unexpected reset error: {str(e)}")
        return jsonify({"status": "error", "message": "Server error during reset"}), 500
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()

if __name__ == '__main__':
    app.run(debug=False) 