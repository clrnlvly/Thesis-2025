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
        Schema::create('audit_trail_enrollment', function (Blueprint $table) {
            $table->id();
            $table->string('description',255);
            $table->string('user', 255);
            $table->timestamps();
        });
        Schema::create('audit_trail_curriculum', function (Blueprint $table) {
            $table->id();
            $table->string('description',255);
            $table->string('user', 255);
            $table->timestamps();
        });
        Schema::create('audit_trail_billing', function (Blueprint $table) {
            $table->id();
            $table->string('description',255);
            $table->string('user', 255);
            $table->timestamps();
        });
        Schema::create('audit_trail_student', function (Blueprint $table) {
            $table->id();
            $table->string('description',255);
            $table->string('user', 255);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('audit_trail_enrollment');
        Schema::dropIfExists('audit_trail_curriculum');
        Schema::dropIfExists('audit_trail_billing');
        Schema::dropIfExists('audit_trail_student');
    }
};
