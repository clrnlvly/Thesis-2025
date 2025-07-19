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
        Schema::create('grades', function (Blueprint $table) {
            $table->id();
            $table->string('sender_id', 50);
            $table->string('student_info_id', 50);
            $table->string('semester');
            $table->string('year_level', 50);
            $table->string('subject');
            $table->double('grade');
            $table->string('status');
            $table->foreign('student_info_id')->references('student_id')->on('student_info')->onDelete('cascade')->onUpdate('cascade');
            $table->softDeletes();
            $table->timestamps();
        });

        Schema::create('grade_edit_requests', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('grade_id'); 
            $table->string('requested_by');
            $table->integer('new_grade'); 
            $table->text('reason');
            $table->string('status')->default('pending');
            $table->timestamps();
        
            $table->foreign('grade_id')->references('id')->on('grades')->onDelete('cascade');
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('grades');
        Schema::dropIfExists('grade_edit_requests');
    }
};
