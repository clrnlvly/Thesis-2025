import Layout from "@/components/layout";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { router, useForm } from "@inertiajs/react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import {
    Table,
    TableBody,
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
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { getFormattedDateTime } from "@/components/utils/formatDateTime";
import SearchFilter from "@/components/SearchFilter";
import FilterDropdown from "@/components/FilterDropdown";
import useDebouncedSearch from "@/components/utils/useDebounceSearch";
import RowPerPage from "@/components/RowPerPage";
import Pagination from "@/components/Pagination";
import NoData from "@/components/no-data";

export default function AssignCourse({ student = [], subjects = [], filters }) {
    // Student data processing
    const studentData = student.data.map((student) => ({
        id: student.id,
        student_id: student.student_id,
        program: student.program,
        semester: student.semester,
        year_level: student.year_level,
        first_name: student.personal_info?.first_name || "",
        middle_name: student.personal_info?.middle_name || "",
        last_name: student.personal_info?.last_name || "",
        status: student.status,
        doc_status: student.documents?.status,
        payment_status: student.payment_verification?.[0]?.status || "pending",
    }));

    const { data, setData, post } = useForm({
        id: "",
        student_id: "",
        program: "",
        semester: "",
        year_level: "",
        subjects: [],
    });

    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentStudent, setCurrentStudent] = useState(null);

    const getFilteredSubjects = () => {
        if (!data.year_level) return subjects || [];
        return (subjects || []).filter(
            (subject) =>
                subject.year_level === data.year_level &&
                subject.deleted_at === null
        );
    };

    const handleSubjectToggle = (subject) => {
        setSelectedSubjects((prev) => {
            const isSelected = prev.some((s) => s.id === subject.id);
            const updated = isSelected
                ? prev.filter((s) => s.id !== subject.id)
                : [...prev, subject];

            setData(
                "subjects",
                updated.map((s) => ({
                    subject_code: s.code,
                    status: "enrolled",
                }))
            );

            return updated;
        });
    };

    const handleSubmit = () => {
        const payload = {
            student_id: data.student_id,
            selectedSubjects: selectedSubjects.map((subject) => ({
                code: subject.code,
            })),
        };

        post(route("admin.course-section.add"), payload, {
            onSuccess: () => {
                toast.success("Courses assigned successfully", {
                    description: (
                        <span className="text-gray-900">
                            {getFormattedDateTime()}
                        </span>
                    ),
                });
                setIsDialogOpen(false);
                setSelectedSubjects([]);
            },
            onError: (errors) => {
                toast.error("Failed to assign courses", {
                    description: Object.values(errors).join("\n"),
                });
            },
        });
    };

    const handleEdit = (student) => {
        setCurrentStudent(student);
        setData({
            id: student.id,
            student_id: student.student_id,
            program: student.program,
            semester: student.semester,
            year_level: student.year_level,
            subjects: [],
        });

        const filteredSubjects = subjects.filter(
            (subject) =>
                subject.year_level === student.year_level &&
                subject.period === student.semester
        );

        const autoSelectedSubjects = filteredSubjects.map((subject) => ({
            id: subject.id,
            code: subject.code,
            name: subject.name,
        }));

        setSelectedSubjects(autoSelectedSubjects);
        setData(
            "subjects",
            autoSelectedSubjects.map((s) => ({
                subject_code: s.code,
                status: "enrolled",
            }))
        );
        setIsDialogOpen(true);
    };

    useEffect(() => {
        if (selectedSubjects.length > 0) {
            setData(
                "subjects",
                selectedSubjects.map((s) => ({
                    subject_code: s.code,
                    status: "enrolled",
                }))
            );
        }
    }, [selectedSubjects, setData]);

    const SubjectTableSection = ({ category }) => {
        const filteredSubjects = getFilteredSubjects().filter(
            (subject) => subject.category === category
        );

        return (
            <div className="border rounded-md p-3 mb-4">
                <h3 className="font-medium text-md mb-3">
                    {category} Subjects
                </h3>
                {filteredSubjects.length > 0 ? (
                    <ScrollArea className="h-[100px]">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {filteredSubjects.map((subject) => (
                                <div
                                    key={subject.id}
                                    className="border rounded-md p-4"
                                >
                                    <div className="flex items-center">
                                        <Checkbox
                                            checked={selectedSubjects.some(
                                                (s) => s.id === subject.id
                                            )}
                                            onCheckedChange={() =>
                                                handleSubjectToggle(subject)
                                            }
                                            className="mr-3"
                                        />
                                        <div>
                                            <h4 className="font-medium text-sm">
                                                {subject.name}
                                            </h4>
                                            <p className="text-sm text-gray-600">
                                                Code: {subject.code} | Units:{" "}
                                                {subject.unit} | {subject.lec}L/
                                                {subject.lab}LAB
                                            </p>
                                            {subject.prerequisites && (
                                                <p className="text-xs text-gray-500 mt-1">
                                                    Prerequisites:{" "}
                                                    {subject.prerequisites}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                ) : (
                    <p className="text-gray-500 py-4">
                        No {category.toLowerCase()} subjects available
                    </p>
                )}
                <div className="text-xs text-gray-500 mt-2">
                    Showing {filteredSubjects.length} {category.toLowerCase()}{" "}
                    subjects
                </div>
            </div>
        );
    };

    const filterData = {
        Year: [
            "Grade 11",
            "Grade 12",
            "1st Year",
            "2nd Year",
            "3rd Year",
            "4th Year",
        ],
        Classified_As: ["1st Semester", "2nd Semester"],
    };

    const [search, setSearch] = useState(filters?.search || "");
    const [dataFilter, setDataFilter] = useState("All");
    const [perPage, setPerPage] = useState(filters?.per_page || 10);

    const { triggerSearch } = useDebouncedSearch({
        routeName: "admin.course.selection",
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
            route("admin.course.selection"),
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
            route("admin.course.selection"),
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
                <h1 className="text-2xl font-bold">Course Assignment</h1>
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

            <div className="border rounded-lg overflow-hidden min-h-96">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-center">
                                Student
                            </TableHead>
                            <TableHead className="text-center">
                                Program
                            </TableHead>
                            <TableHead className="text-center">
                                Year Level
                            </TableHead>
                            <TableHead className="text-center">
                                Semester
                            </TableHead>
                            <TableHead className="text-center">
                                Admission
                            </TableHead>
                            <TableHead className="text-center">
                                Documents
                            </TableHead>
                            <TableHead className="text-center">
                                Payment
                            </TableHead>
                            <TableHead className="text-center">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {studentData.length > 0 ? (
                            studentData.map((student) => (
                                <TableRow key={student.id}>
                                    <TableCell className="text-center">
                                        {student.first_name}{" "}
                                        {student.middle_name}{" "}
                                        {student.last_name}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {student.program}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {student.year_level}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {student.semester}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {student.status === "approved" ? (
                                            <BadgeSuccess>
                                                {student.status}
                                            </BadgeSuccess>
                                        ) : (
                                            <BadgeWarning>
                                                {student.status}
                                            </BadgeWarning>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {student.doc_status === "approved" ? (
                                            <BadgeSuccess>
                                                {student.doc_status}
                                            </BadgeSuccess>
                                        ) : (
                                            <BadgeWarning>
                                                {student.doc_status}
                                            </BadgeWarning>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {student.payment_status ===
                                        "approved" ? (
                                            <BadgeSuccess>
                                                {student.payment_status}
                                            </BadgeSuccess>
                                        ) : (
                                            <BadgeWarning>
                                                {student.payment_status}
                                            </BadgeWarning>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleEdit(student)}
                                        >
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={8}
                                    className="text-center py-4 pt-20"
                                >
                                    <NoData />
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex justify-between pt-2">
                <RowPerPage
                    filters={filters}
                    routeName={"admin.course.selection"}
                    dataFilter={dataFilter}
                />
                <Pagination links={student.links} />
            </div>

            {/* Course Selection Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-5xl h-[600px]">
                    <DialogHeader>
                        <h2 className="text-xl font-bold">
                            Assign Courses to {currentStudent?.first_name}{" "}
                            {currentStudent?.last_name}
                        </h2>
                        <div className="grid grid-cols-3 gap-4 mb-4">
                            <div>
                                <Label>Program</Label>
                                <p className="font-medium">{data.program}</p>
                            </div>
                            <div>
                                <Label>Year Level</Label>
                                <p className="font-medium">{data.year_level}</p>
                            </div>
                            <div>
                                <Label>Semester</Label>
                                <p className="font-medium">{data.semester}</p>
                            </div>
                        </div>
                    </DialogHeader>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2 space-y-4">
                            <SubjectTableSection category="Major Subject" />
                            <SubjectTableSection category="Minor Subject" />
                        </div>

                        <div className="border rounded-lg p-4">
                            <h3 className="font-bold text-lg mb-4">
                                Selected Courses
                            </h3>
                            {selectedSubjects.length > 0 ? (
                                <ScrollArea className="h-[50vh] pr-4">
                                    <div className="space-y-3">
                                        {selectedSubjects.map((subject) => (
                                            <div
                                                key={subject.id}
                                                className="border rounded p-3"
                                            >
                                                <p className="font-medium">
                                                    {subject.name}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    {subject.code}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {subject.lec} Lecture Hours
                                                    | {subject.lab} Lab Hours
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </ScrollArea>
                            ) : (
                                <p className="text-gray-500 py-8 text-center">
                                    No courses selected yet
                                </p>
                            )}
                            <div className="mt-4">
                                <Button
                                    className="w-full"
                                    onClick={handleSubmit}
                                    disabled={selectedSubjects.length === 0}
                                >
                                    Assign {selectedSubjects.length} Courses
                                </Button>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </Layout>
    );
}
