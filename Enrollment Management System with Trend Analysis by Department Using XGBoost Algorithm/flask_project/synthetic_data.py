import pandas as pd
from faker import Faker
import numpy as np
from datetime import datetime
import random

fake = Faker('en_PH')
np.random.seed(42)
random.seed(42)

cabuyao_barangays = ["Mamatid", "Sala", "Banaybanay", "Pulo", "Marinig"]
laguna_towns = ["Cabuyao", "Calamba", "Santa Rosa", "Biñan", "San Pedro"]
ph_provinces = ["Laguna", "Cavite", "Batangas", "Quezon", "Rizal"]

college_programs_4years = ["BSCS", "BSIS", "BSCRIM", "BSTM", "BTVTED", "BSENTREP"]
college_programs_2years = ["ACT"]
shs_programs = ["HE", "HUMSS", "ICT", "ABM", "STEM", "IA"]
status = ["onhold", "approved", "cancelled", "enrolled", "completed", "dropped", "failed", "transferred", "LOA", "deferred", "suspended", "dismissed"]
branch_college = ["Main"]
branch_shs = ["Main", "Uno"]
department = ["SHS", "College"]
academic_years = [f"{year}-{year+1}" for year in range(2019, 2025)]
semester_per_year = ["1st", "2nd"]
id_pattern = ["C00-0000"]
year_level_college_4years = ["1st year", "2nd year", "3rd year", "4th year"]
year_level_college_2years = ["1st year", "2nd year"]
year_level_shs = ["grade 11", "grade 12"]
classified_as = ["new student", "old student"]
ph_religions = [
    "Roman Catholic", 
    "Islam", 
    "Iglesia ni Cristo",
    "Evangelical",
    "Aglipayan",
    "Seventh-day Adventist",
    "Bible Baptist",
    "United Church of Christ",
    "Jehovah's Witnesses",
    "None"
]

college_4year_dist = {"BSCS":0.1, "BSIS":0.05, "BSCRIM":0.3, "BSTM":0.15, "BTVTED":0.15, "BSENTREP":0.25}
shs_dist = {"HE":0.1, "HUMSS":0.2, "ICT":0.2, "ABM":0.2, "STEM":0.2, "IA":0.1}


def generate_ph_phone():
    return f"09{fake.numerify('#########')}" 

def generate_student_id(index):
    return f"C00-{index:04d}"

def select_department():
    return np.random.choice(department, p=[0.5, 0.5])

def select_program(dept):
    if dept == "SHS":
        return np.random.choice(list(shs_dist.keys()), p=list(shs_dist.values()))
    else:
        if np.random.rand() < 0.9:
            return np.random.choice(list(college_4year_dist.keys()), p=list(college_4year_dist.values()))
        return "ACT"

def get_next_year(current_year):
    start, end = map(int, current_year.split('-'))
    return f"{start+1}-{end+1}"

def determine_year_level(program, sem_count, dept):
    if dept == "SHS":
        return "grade 11" if sem_count < 2 else "grade 12"
    else:
        if program == "ACT":
            return "1st year" if sem_count < 2 else "2nd year"
        return f"{min((sem_count//2)+1,4)}th year" if sem_count//2 >=3 else ["1st year","2nd year","3rd year","4th year"][sem_count//2]

def generate_enrollment(student_id, dept, program):
    enrollments = []
    start_year = np.random.choice(academic_years[:4])
    current_year = start_year
    current_sem = "1st"
    sem_count = 0
    max_sem = 4 if dept == "SHS" else (4 if program == "ACT" else 8)
    
    while sem_count < max_sem:
        # Determine status
        if sem_count == max_sem-1:
            status_val = np.random.choice(["completed", "dropped"], p=[0.8,0.2])
        else:
            status_val = np.random.choice(status, p=[0.1,0.1,0.05,0.5,0.1,0.05,0.05,0.02,0.01,0.01,0.005,0.005])
        
            enrollments.append({
            "student_id": student_id,
            "users_id": student_id,
            "department": dept,
            "school_year": current_year,
            "semester": current_sem,
            "branch": np.random.choice(branch_college if dept=="College" else branch_shs),
            "year_level": determine_year_level(program, sem_count, dept),
            "program": program,
            "classified_as": "new student" if sem_count==0 else "old student",
            "last_school_attended": fake.company() if sem_count==0 else "",
            "last_school_address": fake.address() if sem_count==0 else "",
            "status": status_val,
            "created_at": datetime.now(),
            "updated_at": datetime.now(),
            "deleted_at": None
        })
        
        if status_val in ["dropped", "failed", "cancelled"]:
            break

        current_sem = "2nd" if current_sem == "1st" else "1st"
        if current_sem == "1st":
            current_year = get_next_year(current_year)
        sem_count += 1
        
    return enrollments


num_students = 2000
student_info = []
personal_info = []
guardian_info = []

for idx in range(1, num_students+1):
    student_id = generate_student_id(idx)
    dept = select_department()
    program = select_program(dept)

    gender = np.random.choice(["Male","Female"])
    personal_info.append({
        "student_info_id": student_id,
        "first_name": fake.first_name_male() if gender=="Male" else fake.first_name_female(),
        "last_name": fake.last_name(),
        "middle_name": fake.first_name() if np.random.rand() <0.5 else "",
        "address": f"{np.random.choice(cabuyao_barangays)}, {np.random.choice(laguna_towns)}, {np.random.choice(ph_provinces)}",
        "birth_date": fake.date_of_birth(minimum_age=15, maximum_age=25),
        "birth_place": f"{np.random.choice(laguna_towns)}, {np.random.choice(ph_provinces)}", 
        "civil_status": np.random.choice(["Single", "Married"], p=[0.95,0.05]),
        "gender": gender,
        "religion": np.random.choice(ph_religions),
        "created_at": datetime.now(),
        "updated_at": datetime.now(),
        "deleted_at": None
    })
    
 
    has_parents = np.random.rand() <0.7
    guardian_info.append({
        "student_info_id": student_id,
        "father_name": fake.name_male() if has_parents else None,
        "father_occupation": fake.job() if has_parents else None,
        "father_phone": generate_ph_phone() if has_parents else None,
        "mother_name": fake.name_female() if has_parents else None,
        "mother_occupation": fake.job() if has_parents else None,
        "mother_phone": generate_ph_phone() if has_parents else None,
        "guardian_name": None if has_parents else fake.name(),
        "guardian_relationship": None if has_parents else np.random.choice(["Aunt","Uncle","Grandparent"]),
        "guardian_phone": generate_ph_phone() if not has_parents else None,
        "created_at": datetime.now(),
        "updated_at": datetime.now(),
        "deleted_at": None
    })
    

    student_info.extend(generate_enrollment(student_id, dept, program))

df_student = pd.DataFrame(student_info)
df_personal = pd.DataFrame(personal_info)
df_guardian = pd.DataFrame(guardian_info)

df_student.to_csv('student_info.csv', index=False)
df_personal.to_csv('personal_info.csv', index=False)
df_guardian.to_csv('guardian_info.csv', index=False)