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
        Schema::create('section', function (Blueprint $table) {
            $table->id();
            $table->string('name', 255)->index();
            $table->string('program_code');
            $table->string('semester', 50);
            $table->string('year_level', 50);
            $table->foreign('program_code')->references('code')->on('programs')->onDelete('cascade')->onUpdate('cascade');
            $table->softDeletes();
            $table->timestamps();
        });

        Schema::create('schedule', function (Blueprint $table) {
            $table->id();
            $table->string('section_name', 255);
            $table->string('subject_code', 50);
            $table->string('prof_name', 255)->nullable();
            $table->string('monday',255)->nullable();
            $table->string('tuesday',255)->nullable();
            $table->string('wednesday',255)->nullable();
            $table->string('thursday',255)->nullable();
            $table->string('friday',255)->nullable();
            $table->string('saturday',255)->nullable();
            $table->foreign('section_name')->references('name')->on('section')->onDelete('cascade')->onUpdate('cascade');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('section');
        Schema::dropIfExists('schedule');
    }
};
