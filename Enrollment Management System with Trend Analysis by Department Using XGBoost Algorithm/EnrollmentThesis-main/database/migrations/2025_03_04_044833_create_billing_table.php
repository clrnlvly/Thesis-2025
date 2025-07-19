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
        Schema::create('billing_type', function (Blueprint $table) {
            $table->id();
            $table->string('type')->nullable();
            $table->text('program_name')->nullable();
            $table->text('no_unit')->nullable();
            $table->double('amount')->nullable();
            $table->string('title')->nullable();
            $table->text('description')->nullable();
            $table->string('discount_title')->nullable();
            $table->double('discount_amount')->nullable();
            $table->double('total_amount')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });

        Schema::create('payment_verification', function (Blueprint $table) {
            $table->id();
            $table->string('student_info_id');
            $table->string('name');
            $table->string('email');
            $table->string('purpose');
            $table->string('semester');
            $table->string('reference');
            $table->double('amount');
            $table->string('payment_receipt');
            $table->string('year_level');
            $table->string('program');
            $table->string('status', 50)->default('pending');

            $table->foreign('student_info_id')->references('student_id')->on('student_info')->onDelete('cascade')->onUpdate('cascade');
           
            $table->softDeletes();
            $table->timestamps();
        });

        Schema::create('shs_billing', function (Blueprint $table) {
            $table->id();
            $table->string('program_code');
            $table->text('year_level');
            $table->text('payment_type');
            $table->double('down_payment')->nullable();
            $table->double('prelim')->nullable();
            $table->double('midterm')->nullable();
            $table->double('finals')->nullable();
            $table->double('total_amount')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });

        Schema::create('college_billing', function (Blueprint $table) {
            $table->id();
            $table->string('program_code');
            $table->string('year_level')->nullable();
            $table->string('payment_type')->nullable();
            $table->double('down_payment')->nullable();
            $table->double('prelim')->nullable();
            $table->double('midterm')->nullable();
            $table->double('finals')->nullable();
            $table->integer('no_unit')->nullable();
            $table->double('per_unit')->nullable();
            $table->double('total_amount')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });

        Schema::create('other_billing', function (Blueprint $table) {
            $table->id();
            $table->string('payment_type')->nullable();
            $table->string('name')->nullable();
            $table->double('amount')->nullable();
            $table->text('description')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('billing_type');
        Schema::dropIfExists('payment_verification');
        Schema::dropIfExists('shs_billing');
        Schema::dropIfExists('college_billing');
        Schema::dropIfExists('other_billing');
    }
};
