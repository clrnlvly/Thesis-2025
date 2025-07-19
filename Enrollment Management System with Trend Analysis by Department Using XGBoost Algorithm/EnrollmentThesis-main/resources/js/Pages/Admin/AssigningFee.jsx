import Layout from "@/components/layout";
import { useState } from "react";
import { router, useForm } from "@inertiajs/react";

import {
    DialogDescription,
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Edit } from "lucide-react";
import BadgeSuccess from "@/components/BadgeSuccess";
import BadgeWarning from "@/components/BadgeWarning";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import SchoolFeeDetails from "./Admission/SchoolFeeDetails";
import SearchFilter from "@/components/SearchFilter";
import FilterDropdown from "@/components/FilterDropdown";
import RowPerPage from "@/components/RowPerPage";
import useDebouncedSearch from "@/components/utils/useDebounceSearch";
import Pagination from "@/components/Pagination";
import NoData from "@/components/no-data";

export default function AssignFee({
    student,
    college_fee = [],
    other_fee = [],
    subjects = [],
    student_subjects = [],
    filters,
}) {
    const {
        data,
        setData,
        post,
        errors,
        delete: onDelete,
    } = useForm({
        id: "",
        student_info_id: "",
        payment_details_id: "",
        status: "",
        amount_paid: "",
    });

    const studentData = student.data.map((students) => ({
        // student info
        id: students.id,
        users_id: students.users_id,
        student_id: students.student_id,
        department: students.department,
        school_year: students.school_year,
        semester: students.semester,
        branch: students.branch,
        year_level: students.year_level,
        program: students.program,
        classified_as: students.classified_as,
        last_school_attended: students.last_school_attended,
        last_school_address: students.last_school_address,
        email: students.users.email,
        status: students.status,
        // personal info
        first_name: students.personal_info.first_name,
        last_name: students.personal_info.last_name,
        middle_name: students.personal_info.middle_name,
        address: students.personal_info.address,
        birth_date: students.personal_info.birth_date,
        birth_place: students.personal_info.birth_place,
        civil_status: students.personal_info.civil_status,
        gender: students.personal_info.gender,
        religion: students.personal_info.religion,

        // payment
        payment_status: students.payment_verification.status,
        payment_verification_name: students.payment_verification.name,
        payment_verification_email: students.payment_verification.email,
        payment_purpose: students.payment_verification.purpose,
        payment_semester: students.payment_verification.semester,
        payment_reference: students.payment_verification.reference,
        payment_amount: students.payment_verification.amount,
        payment_receipt: students.payment_verification.payment_receipt,
        payment_created_at: students.payment_verification.created_at,
    }));

    const subject = subjects.map((subject) => ({
        id: subject.id,
        code: subject.code,
        unit: subject.unit,
    }));

    const student_subject = student_subjects
        .filter(
            (studentSubject) =>
                subjects.some(
                    (subject) => subject.code === studentSubject.subject_code
                ) && data.student_id === studentSubject.student_info_id
        )
        .map((studentSubject) => {
            // Find the matching subject from the subjects array
            const subjectInfo = subjects.find(
                (subject) => subject.code === studentSubject.subject_code
            );

            return {
                student_info_id: studentSubject.student_info_id,
                subject_code: studentSubject.subject_code,
                subject_status: studentSubject.status,
                unit: subjectInfo ? subjectInfo.unit : null,
            };
        });

    const subject_unit = subjects
        .filter((subject) => subject.code === student_subject.subject_code)
        .map((subject) => ({
            id: subject.id,
            code: subject.code,
            unit: subject.unit,
        }));

    const totalUnits = student_subjects.reduce((total, subject) => {
        return total + subject.unit;
    }, 0);

    const [itemId, setItemId] = useState(null);
    const [add, setAdd] = useState(false);
    const [del, setDel] = useState(false);
    const [create, setCreate] = useState(false);
    const [selectedSubjects, setSelectedSubjects] = useState([]);

    const handleEdit = (student) => {
        student = studentData.find((s) => s.id === student.id);
        console.log("Student ", student);
        setItemId(student);
        console.log("Item ID ", itemId);
        setData({
            id: student.id,
            email: student.email,
            users_id: student.users_id,
            student_id: student.student_id,
            department: student.department,
            year_level: student.year_level,
            semester: student.semester,
            school_year: student.school_year,
            branch: student.branch,
            program: student.program,
            classified_as: student.classified_as,
            last_school_attended: student.last_school_attended,
            last_school_address: student.last_school_address,
            status: student.status,

            name:
                student.first_name +
                " " +
                student.middle_name +
                " " +
                student.last_name,
        });

        setAdd(true);
    };

    const filterData = {
        Department: ["1st Semester", "2nd Semester"],
        Year: [
            "Grade 11",
            "Grade 12",
            "1st Year",
            "2nd Year",
            "3rd Year",
            "4th Year",
        ],
    };

    const [search, setSearch] = useState(filters?.search || "");
    const [dataFilter, setDataFilter] = useState("All");
    const [perPage, setPerPage] = useState(filters?.per_page || 10);

    const { triggerSearch } = useDebouncedSearch({
        routeName: "admin.assign-fee.index",
        filterKey: "filter",
        filterValue: dataFilter,
        perPage,
    });

    const handleSearchChange = (val) => {
        setSearch(val);
        triggerSearch(val);
    };

    const year = sessionStorage.getItem("selectedYear");

    const handleFilterChange = (filterValue) => {
        setDataFilter(filterValue);
        router.get(
            route("admin.assign-fee.index"),
            {
                search: "",
                filter: filterValue === "All" ? "" : filterValue,
                per_page: perPage,
                year,
            },
            {
                preserveState: true,
                replace: true,
            }
        );
    };

    const clearAllFilters = () => {
        const year = sessionStorage.getItem("selectedYear");
        setSearch("");
        setDataFilter("All");

        router.get(
            route("admin.assign-fee.index"),
            {
                search: "",
                filter: "",
                per_page: perPage,
                year: year || "",
            },
            {
                preserveState: true,
                replace: true,
            }
        );
    };

    return (
        <Layout>
            <div className="flex items-end justify-between mb-7">
                <h1 className="text-2xl font-bold">Fees Selection</h1>
            </div>
            <div className="flex justify-between mb-3">
                <div className="flex items-center gap-2">
                    <SearchFilter
                        searchValue={search}
                        onSearchChange={handleSearchChange}
                        onSearchSubmit={triggerSearch}
                        onClearFilters={clearAllFilters}
                        showClearButton={search || dataFilter !== "All"}
                    />
                    <FilterDropdown
                        currentFilter={dataFilter}
                        filterData={filterData}
                        onFilterChange={handleFilterChange}
                    />
                </div>
            </div>
            <div className="border rounded-sm px-4 min-h-96">
                <Table>
                    <TableHeader>
                        <TableRow className="table-fixed">
                            <TableHead className="w-1/12 text-center">
                                Name
                            </TableHead>
                            <TableHead className="w-1/12 text-center">
                                Year Level
                            </TableHead>
                            <TableHead className="w-1/12 text-center">
                                Program
                            </TableHead>
                            <TableHead className="w-1/12 text-center">
                                Semester
                            </TableHead>
                            <TableHead className="w-1/12 text-center">
                                No. of Units
                            </TableHead>

                            <TableHead className="w-1/12 text-center"></TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {studentData.length > 0 ? (
                            studentData.map((student) => {
                                const totalUnits = student_subject
                                    .filter(
                                        (subject) =>
                                            subject.student_info_id ===
                                            student.student_id
                                    )
                                    .reduce(
                                        (sum, subject) =>
                                            sum + (subject.unit || 0),
                                        0
                                    );

                                return (
                                    <TableRow
                                        key={student.id}
                                        className="table-fixed"
                                    >
                                        <TableCell className="w-1/12 font-medium text-center">
                                            {student.first_name +
                                                " " +
                                                student.middle_name +
                                                " " +
                                                student.last_name}
                                        </TableCell>
                                        <TableCell className="w-1/12 font-medium text-center">
                                            {student.year_level}
                                        </TableCell>
                                        <TableCell className="w-1/12 font-medium text-center">
                                            {student.program}
                                        </TableCell>
                                        <TableCell className="w-1/12 font-medium text-center">
                                            {student.semester}
                                        </TableCell>
                                        <TableCell className="w-1/12 font-medium text-center">
                                            {totalUnits}
                                        </TableCell>
                                        <TableCell className="w-1/12 font-medium text-center">
                                            <div className="flex justify-center">
                                                <Edit
                                                    className="h-5 text-primary cursor-pointer"
                                                    onClick={() =>
                                                        handleEdit(student)
                                                    }
                                                />
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={6}
                                    className="text-center py-4 pt-20"
                                >
                                    <NoData />
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                {add && (
                    <Dialog open={add} onOpenChange={(open) => setAdd(open)}>
                        <DialogContent className="max-w-4xl h-[600px]">
                            <DialogHeader>
                                <Label>
                                    <span>{data.name}</span>
                                </Label>
                                <Label>
                                    <span>
                                        {data.year_level} {data.program}
                                    </span>
                                </Label>
                                <h1>Select Fee</h1>
                                <ScrollArea className="h-[500px]">
                                    <SchoolFeeDetails
                                        student={itemId}
                                        college_fee={college_fee}
                                        other_fee={other_fee}
                                        setAdd={setAdd}
                                    />
                                </ScrollArea>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                )}
            </div>
            <div className="flex justify-between pt-2">
                <RowPerPage
                    filters={filters}
                    routeName={"admin.assign-fee.index"}
                    dataFilter={dataFilter}
                />
                <Pagination links={student.links} />
            </div>
        </Layout>
    );
}
