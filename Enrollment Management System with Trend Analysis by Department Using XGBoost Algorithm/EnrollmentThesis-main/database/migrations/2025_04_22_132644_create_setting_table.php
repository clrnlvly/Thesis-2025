<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // ADMIN
        Schema::create('sidebar_sections', function (Blueprint $table) {
            $table->id();
            $table->string('user_type');
            $table->string('title');
            $table->boolean('is_displayed')->default(false);
            $table->timestamps();
        });

        Schema::create('sidebar_sub_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('sidebar_section_id')->constrained('sidebar_sections')->onDelete('cascade');
            $table->string('title');
            $table->string('route')->nullable();
            $table->boolean('is_displayed')->default(false);
            $table->timestamps();
        });

        // STUDENT
        Schema::create('sidebar_sections_student', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->boolean('is_displayed')->default(false);
            $table->timestamps();
        });
    
        Schema::create('sidebar_sub_items_student', function (Blueprint $table) {
            $table->id();
            $table->foreignId('sidebar_section_id')->constrained('sidebar_sections_student')->onDelete('cascade');
            $table->string('title');
            $table->string('route');
            $table->boolean('is_displayed')->default(false);
            $table->timestamps();
        });

        // PROFESSOR
        
        Schema::create('sidebar_sections_professor', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->boolean('is_displayed')->default(false);
            $table->timestamps();
        });

        Schema::create('sidebar_sub_items_professor', function (Blueprint $table) {
            $table->id();
            $table->foreignId('sidebar_section_id')->constrained('sidebar_sections_professor')->onDelete('cascade');
            $table->string('title');
            $table->string('route');  // Exact route for the professor role
            $table->boolean('is_displayed')->default(false);
            $table->timestamps();
        });

        $sections = [
            [
                'title' => 'Dashboard',
                'items' => [
                    ['title' => 'Home', 'route' => 'dashboard'],
                    ['title' => 'Enrollment', 'route' => 'admin.dashboard.enrollment'],
                    ['title' => 'Billing', 'route' => 'admin.dashboard.billing'],
                    ['title' => 'Trend Analysis', 'route' => '#'],
                    ['title' => 'Audit Trail', 'route' => 'admin.dashboard.audit-trail'],
                ],
            ],
            [
                'title' => 'Enrollment',
                'items' => [
                    ['title' => 'Application', 'route' => 'admin.application'],
                    ['title' => 'Documents', 'route' => 'admin.documents'],
                    ['title' => 'Course Selection', 'route' => 'admin.course.selection'],
                    ['title' => 'Evaluation', 'route' => 'admin.evaluation'],
                    ['title' => 'Enrollment Confirmation', 'route' => 'enrollment.final.step'],
                    ['title' => 'Enrolled Student', 'route' => 'enrolled.student']
                ],
            ],
            [
                'title' => 'Curriculum Management',
                'items' => [
                    ['title' => 'Program', 'route' => 'admin.program'],
                    ['title' => 'Subject', 'route' => 'admin.subject'],
                    ['title' => 'Curriculum', 'route' => 'admin.curriculum'],
                    ['title' => 'Section', 'route' => 'admin.section'],
                ],
            ],
            [
                'title' => 'Billing',
                'items' => [
                    ['title' => 'Setup', 'route' => 'admin.billing'],
                    ['title' => 'Fee Selection', 'route' => 'admin.assign-fee.index'],
                    ['title' => 'Payment', 'route' => 'admin.payment'],
                    ['title' => 'Payment List', 'route' => 'admin.payment.list'],
                ],
            ],
            [
                'title' => 'Grades',
                'items' => [
                    ['title' => 'Upload Grades', 'route' => 'upload.grades'],
                    ['title' => 'Submitted Grades', 'route' => 'index.submitted.grade.admin'],
                    ['title' => 'Grade Change Requests', 'route' => 'index.change.grade.admin'],
                ],
            ],
            [
                'title' => 'Settings',
                'items' => [
                    ['title' => 'General', 'route' => 'admin.setting.general'],
                    ['title' => 'Display', 'route' => 'index.display'],
                    ['title' => 'User Management', 'route' => 'admin.user.management'],
                    ['title' => 'Account', 'route' => 'profile.edit'],
                    ['title' => 'Help', 'route' => 'admin.help'],
                ],
            ],
        ];

        // STUDENT DEFAULT SIDEBAR DATA
        $studentSections = [
            [
                'title' => 'General',
                'items' => [
                    ['title' => 'Home', 'route' => 'dashboard'],
                    ['title' => 'Schedule', 'route' => 'student.schedule'],
                    ['title' => 'Subjects', 'route' => 'student.subject'],
                    ['title' => 'Personal Information', 'route' => 'student.personal.info'],
                ],
            ],
            [
                'title' => 'Enrollment',
                'items' => [
                    ['title' => 'Enrollment', 'route' => 'student.enrollment'],
                    ['title' => 'Documents', 'route' => 'student.documents'],
                    ['title' => 'Grades', 'route' => 'student.grades'],
                    ['title' => 'Evaluation', 'route' => 'student.evaluation'],
                ],
            ],
            [
                'title' => 'Payment',
                'items' => [
                    ['title' => 'Payment Plan', 'route' => 'student.payment.plan'],
                    ['title' => 'Payment History', 'route' => 'student.payment.transaction'],
                    ['title' => 'Payment Form', 'route' => 'student.payment.form'],
                ],
            ],
        ];

         // PROFESSOR DEFAULT SIDEBAR DATA
         $professorSections = [
            [
                'title' => 'General',
                'items' => [
                    ['title' => 'Home', 'route' => 'dashboard'],
                    ['title' => 'Schedule', 'route' => 'professor.schedule'],
                    ['title' => 'Subjects', 'route' => 'professor.subject'],
                ],
            ],
            [
                'title' => 'Grades',
                'items' => [
                    ['title' => 'Upload Grades', 'route' => 'upload.grades'],
                    ['title' => 'Submitted Grades', 'route' => 'index.submitted.grade.professor'],
                ],
            ],
        ];

        // User types
        $userTypes = ['super admin', 'accounting', 'registrar'];

        foreach ($userTypes as $userType) {
            foreach ($sections as $section) {
                $sectionId = DB::table('sidebar_sections')->insertGetId([
                    'user_type' => $userType,
                    'title' => $section['title'],
                    'is_displayed' => true,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);

                foreach ($section['items'] as $item) {
                    DB::table('sidebar_sub_items')->insert([
                        'sidebar_section_id' => $sectionId,
                        'title' => $item['title'],
                        'route' => $item['route'],
                        'is_displayed' => true,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                }
            }
        }

        // Insert Student Sidebar Sections
        foreach ($studentSections as $section) {
            $sectionId = DB::table('sidebar_sections_student')->insertGetId([
                'title' => $section['title'],
                'is_displayed' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            foreach ($section['items'] as $item) {
                DB::table('sidebar_sub_items_student')->insert([
                    'sidebar_section_id' => $sectionId,
                    'title' => $item['title'],
                    'route' => $item['route'],
                    'is_displayed' => true,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }

        // Insert Professor Sidebar Sections
        foreach ($professorSections as $section) {
            $sectionId = DB::table('sidebar_sections_professor')->insertGetId([
                'title' => $section['title'],
                'is_displayed' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            foreach ($section['items'] as $item) {
                DB::table('sidebar_sub_items_professor')->insert([
                    'sidebar_section_id' => $sectionId,
                    'title' => $item['title'],
                    'route' => $item['route'],
                    'is_displayed' => true,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    
    }

    public function down(): void
    {
        Schema::dropIfExists('sidebar_sub_items');
        Schema::dropIfExists('sidebar_sections');
        Schema::dropIfExists('sidebar_sub_items_student');
        Schema::dropIfExists('sidebar_sections_student');
        Schema::dropIfExists('sidebar_sub_items_professor');
        Schema::dropIfExists('sidebar_sections_professor');
    }
};
