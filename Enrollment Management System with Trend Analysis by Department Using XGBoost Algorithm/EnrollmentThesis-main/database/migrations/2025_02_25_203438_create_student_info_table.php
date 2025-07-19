<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('student_info', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('users_id');
            $table->string('student_id', 50)->unique();
            $table->string('department', 50);
            $table->string('school_year', 50);
            $table->string('semester', 50);
            $table->string('branch', 50);
            $table->string('year_level', 50);
            $table->string('program', 255);
            $table->string('classified_as', 50);
            $table->text('last_school_attended')->nullable();
            $table->text('last_school_address')->nullable(); 
            $table->string('status', 50)->default('pending'); 
            $table->foreign('users_id')->references('id')->on('users')->onDelete('cascade')->onUpdate('cascade');

            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('personal_info', function (Blueprint $table) {
            $table->id();
            $table->string('student_info_id');
            $table->string('first_name', 255);
            $table->string('last_name',255);
            $table->string('middle_name',255)->nullable();
            $table->string('address', 255);
            $table->string('birth_date', 50);
            $table->string('birth_place', 255);
            $table->string('civil_status', 50);
            $table->string('gender', 50);
            $table->string('religion', 50)->nullable();

            $table->foreign('student_info_id')->references('student_id')->on('student_info')->onDelete('cascade')->onUpdate('cascade');
            
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('guardian', function (Blueprint $table) {
            $table->id();
            $table->string('student_info_id');
            $table->string('father_name',255)->nullable();
            $table->string('father_occupation',255)->nullable();
            $table->string('father_phone',50)->nullable();
            $table->string('mother_name',255)->nullable();
            $table->string('mother_occupation',255)->nullable();
            $table->string('mother_phone',50)->nullable();
            $table->string('guardian_name',255)->nullable();
            $table->string('guardian_relationship',255)->nullable();
            $table->string('guardian_phone',50)->nullable();
            
            $table->foreign('student_info_id')->references('student_id')->on('student_info')->onDelete('cascade')->onUpdate('cascade');
            
            $table->timestamps();
            $table->softDeletes();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('student_info');
        Schema::dropIfExists('personal_info');
        Schema::dropIfExists('guardian');
    }
};
