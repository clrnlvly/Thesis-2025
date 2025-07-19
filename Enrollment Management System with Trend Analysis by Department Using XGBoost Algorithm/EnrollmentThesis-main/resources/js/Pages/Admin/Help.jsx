import Layout from "@/components/layout";
import React from "react";

export default function Help() {
    return (
        <Layout>
            {" "}
            <div className="flex items-end justify-between mb-7">
                {" "}
                <h1 className="text-2xl font-bold">Help</h1>{" "}
            </div>
            <div className="flow-root p-4 mt-4 shadow rounded-md">
                <dl className="-my-3 divide-y divide-gray-200 text-sm">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-3">
                        {/* System Functions */}
                        <div>
                            <dt className="font-medium text-gray-900 mb-2">
                                System Functions
                            </dt>
                            <div className="space-y-6 text-gray-700">
                                <div>
                                    <h3 className="font-medium text-gray-900">
                                        📊 Dashboard Section
                                    </h3>
                                    <ul className="list-disc list-inside space-y-1 mt-1">
                                        <li>
                                            <strong>Home:</strong> Overview of
                                            system status and activity.
                                        </li>
                                        <li>
                                            <strong>Enrollment:</strong> Access
                                            all enrollment-related features.
                                        </li>
                                        <li>
                                            <strong>Billing:</strong> Overview
                                            of financial operations.
                                        </li>
                                        <li>
                                            <strong>Trend Analysis:</strong>{" "}
                                            View data trends and insights.
                                        </li>
                                        <li>
                                            <strong>Audit Trail:</strong> Track
                                            user activities and changes.
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="font-medium text-gray-900">
                                        📝 Enrollment Section
                                    </h3>
                                    <ul className="list-disc list-inside space-y-1 mt-1">
                                        <li>
                                            <strong>Application:</strong> Manage
                                            student applications.
                                        </li>
                                        <li>
                                            <strong>Documents:</strong> Verify
                                            student-submitted documents.
                                        </li>
                                        <li>
                                            <strong>Course Selection:</strong>{" "}
                                            Assign subjects to students.
                                        </li>
                                        <li>
                                            <strong>Evaluation:</strong> Review
                                            student academic standing.
                                        </li>
                                        <li>
                                            <strong>
                                                Enrollment Confirmation:
                                            </strong>{" "}
                                            Finalize student enrollment (section
                                            & ID).
                                        </li>
                                        <li>
                                            <strong>Enrolled Student:</strong>{" "}
                                            Student enrolled record.
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="font-medium text-gray-900">
                                        🎓 Curriculum Management Section
                                    </h3>
                                    <ul className="list-disc list-inside space-y-1 mt-1">
                                        <li>
                                            <strong>Program:</strong> Manage
                                            academic programs.
                                        </li>
                                        <li>
                                            <strong>Subject:</strong> Manage
                                            subjects/courses.
                                        </li>
                                        <li>
                                            <strong>Curriculum:</strong>{" "}
                                            Organize and assign subject
                                            structures.
                                        </li>
                                        <li>
                                            <strong>Section:</strong> Create and
                                            manage class sections.
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="font-medium text-gray-900">
                                        💳 Billing Section
                                    </h3>
                                    <ul className="list-disc list-inside space-y-1 mt-1">
                                        <li>
                                            <strong>Setup:</strong> Configure
                                            billing settings and templates.
                                        </li>
                                        <li>
                                            <strong>Fee Selection:</strong>{" "}
                                            Select applicable fees per student.
                                        </li>
                                        <li>
                                            <strong>Payment:</strong>
                                            Review student payments.
                                        </li>
                                        <li>
                                            <strong>Payment List:</strong>
                                            Record and review student payments
                                            status.
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="font-medium text-gray-900">
                                        🧾 Grades Section
                                    </h3>
                                    <ul className="list-disc list-inside space-y-1 mt-1">
                                        <li>
                                            <strong>Upload Grades:</strong>{" "}
                                            Submit student grades.
                                        </li>
                                        <li>
                                            <strong>Submitted Grades:</strong>{" "}
                                            Review and manage submitted grades.
                                        </li>
                                        <li>
                                            <strong>
                                                Grade Change Request:
                                            </strong>{" "}
                                            View and process grade revision
                                            requests.
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="font-medium text-gray-900">
                                        ⚙️ Settings Section
                                    </h3>
                                    <ul className="list-disc list-inside space-y-1 mt-1">
                                        <li>
                                            <strong>General:</strong> Basic
                                            system configurations.
                                        </li>
                                        <li>
                                            <strong>Display:</strong> Configure
                                            sidebar items visible to users based
                                            on their roles.
                                        </li>
                                        <li>
                                            <strong>User Management:</strong>{" "}
                                            Manage user accounts and roles.
                                        </li>
                                        <li>
                                            <strong>Account:</strong> Update
                                            your profile and credentials.
                                        </li>
                                        <li>
                                            <strong>Help:</strong> Access this
                                            guide and support materials.
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Enrollment Process */}
                        <div>
                            <dt className="font-medium text-gray-900 mb-2">
                                Enrollment Process
                            </dt>
                            <ol className="list-decimal list-inside space-y-4 text-gray-700">
                                <li>
                                    <strong>Setup Phase:</strong> Go to the
                                    Settings and Curriculum sections to:
                                    <ul className="list-disc list-inside ml-5 mt-1 space-y-1">
                                        <li>Set the Academic Year.</li>
                                        <li>
                                            Configure Student ID Format under
                                            General Settings.
                                        </li>
                                        <li>
                                            Create and assign Programs and
                                            Subjects under Curriculum
                                            Management.
                                        </li>
                                        <li>
                                            Configure Billing under Billing →
                                            Setup.
                                        </li>
                                        <li>
                                            Create Sections under Curriculum
                                            Management → Section.
                                        </li>
                                    </ul>
                                </li>

                                <li>
                                    <strong>
                                        Application & Document Review:
                                    </strong>{" "}
                                    Navigate to{" "}
                                    <em>Enrollment → Application</em> to:
                                    <ul className="list-disc list-inside ml-5 mt-1 space-y-1">
                                        <li>
                                            Review submitted student
                                            applications.
                                        </li>
                                        <li>
                                            Approve or reject pending
                                            applications.
                                        </li>
                                    </ul>
                                    Then, go to <em>Enrollment → Documents</em>{" "}
                                    to:
                                    <ul className="list-disc list-inside ml-5 mt-1 space-y-1">
                                        <li>
                                            Check and validate uploaded student
                                            documents (e.g., birth certificate,
                                            report card).
                                        </li>
                                        <li>
                                            Mark each document as
                                            complete/incomplete as necessary.
                                        </li>
                                    </ul>
                                </li>

                                <li>
                                    <strong>Billing & Payment:</strong> Go to{" "}
                                    <em>Billing → Payment</em> to:
                                    <ul className="list-disc list-inside ml-5 mt-1 space-y-1">
                                        <li>Confirm student payment status.</li>
                                        <li>
                                            Record payment receipts or upload
                                            proof of payment if applicable.
                                        </li>
                                        <li>
                                            Ensure that students have paid any
                                            minimum required fees to proceed
                                            with enrollment.
                                        </li>
                                    </ul>
                                </li>

                                <li>
                                    <strong>Course & Fee Selection:</strong>
                                    <ul className="list-disc list-inside ml-5 mt-1 space-y-1">
                                        <li>
                                            Go to{" "}
                                            <em>
                                                Enrollment → Course Selection
                                            </em>{" "}
                                            to assign subjects based on the
                                            student's program, year level, and
                                            period.
                                        </li>
                                        <li>
                                            Ensure all required core and
                                            elective subjects are properly
                                            selected.
                                        </li>
                                        <li>
                                            Then go to{" "}
                                            <em>Billing → Fee Selection</em> to
                                            assign applicable fees (e.g., lab
                                            fees, miscellaneous fees) based on
                                            course load or status.
                                        </li>
                                    </ul>
                                </li>

                                <li>
                                    <strong>Enrollment Confirmation:</strong>{" "}
                                    Navigate to{" "}
                                    <em>
                                        Enrollment → Enrollment Confirmation
                                    </em>{" "}
                                    to:
                                    <ul className="list-disc list-inside ml-5 mt-1 space-y-1">
                                        <li>
                                            Finalize the student's enrollment
                                            record.
                                        </li>
                                        <li>
                                            Select the appropriate Section based
                                            on course availability.
                                        </li>
                                        <li>
                                            Generate and assign the official
                                            Student ID number.
                                        </li>
                                        <li>
                                            Confirm the student as officially
                                            enrolled in the system.
                                        </li>
                                    </ul>
                                </li>
                            </ol>
                        </div>
                    </div>

                    {/* Evaluation and Enrollment Process */}
                    <div className="py-3">
                        <dt className="font-medium text-gray-900 mb-2">
                            Evaluation and Enrollment Process for Students
                        </dt>
                        <div className="text-gray-700">
                            <p className="mb-4">
                                For students to enroll for the next term, they
                                must complete the following process:
                            </p>
                            <ol className="list-decimal list-inside space-y-4">
                                <li>
                                    <strong>Clearance Status:</strong>
                                    <ul className="list-disc list-inside ml-5 mt-1 space-y-1">
                                        <li>
                                            Students must have a "Cleared"
                                            status before enrollment can be
                                            opened to them
                                        </li>
                                        <li>
                                            This status is verified through the
                                            Evaluation system
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <strong>Enrollment Sidebar Access:</strong>
                                    <ul className="list-disc list-inside ml-5 mt-1 space-y-1">
                                        <li>
                                            Once cleared, the enrollment option
                                            will appear in the student's sidebar
                                        </li>
                                        <li>
                                            If the sidebar is open (accessible),
                                            students can click the enrollment
                                            button
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <strong>Admission Process:</strong>
                                    <ul className="list-disc list-inside ml-5 mt-1 space-y-1">
                                        <li>
                                            Clicking the enrollment button will
                                            automatically process their
                                            admission for the next term
                                        </li>
                                        <li>
                                            The system will guide them through
                                            the required steps
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <strong>Payment:</strong>
                                    <ul className="list-disc list-inside ml-5 mt-1 space-y-1">
                                        <li>
                                            Students must pay the required
                                            amount for the next term
                                        </li>
                                        <li>
                                            Payment confirmation is required to
                                            proceed
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <strong>Course Assignment:</strong>
                                    <ul className="list-disc list-inside ml-5 mt-1 space-y-1">
                                        <li>
                                            The system will assign the
                                            appropriate courses based on the
                                            student's program and progress
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <strong>Course/Subject Assignment:</strong>
                                    <ul className="list-disc list-inside ml-5 mt-1 space-y-1">
                                        <li>
                                            Finally, specific subjects will be
                                            assigned to complete the enrollment
                                            process
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <strong>Fee Assignment:</strong>
                                    <ul className="list-disc list-inside ml-5 mt-1 space-y-1">
                                        <li>
                                            Applicable fees will be assigned
                                            based on the selected courses
                                        </li>
                                    </ul>
                                </li>
                               
                            </ol>
                           
                        </div>
                    </div>
                </dl>
            </div>
        </Layout>
    );
}
