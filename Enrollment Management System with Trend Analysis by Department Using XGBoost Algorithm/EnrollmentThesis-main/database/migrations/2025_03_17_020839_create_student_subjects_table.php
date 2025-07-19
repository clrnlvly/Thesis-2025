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
        Schema::create('student_subjects', function (Blueprint $table) {
            $table->id();
            $table->string('student_info_id');
            $table->string('subject_code');
            $table->string('status', 50);
            $table->string('remarks', 50)->nullable();
            $table->foreign('student_info_id')->references('student_id')->on('student_info')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('subject_code')->references('code')->on('subjects')->onDelete('cascade')->onUpdate('cascade');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('student_subjects');
    }
};
