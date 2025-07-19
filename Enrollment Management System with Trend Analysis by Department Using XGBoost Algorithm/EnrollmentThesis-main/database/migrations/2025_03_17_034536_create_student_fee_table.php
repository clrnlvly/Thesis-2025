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
        Schema::create('payment_details', function (Blueprint $table) {
            $table->id();
            $table->string('student_info_id');
            $table->string('fee_type');
            $table->string('year_level');
            $table->string('semester'); 
            $table->unsignedBigInteger('fee_id'); 
            $table->double('amount');
            $table->foreign('student_info_id')->references('student_id')->on('student_info')->onDelete('cascade')->onUpdate('cascade');
            $table->softDeletes();
            $table->timestamps();
        });

        Schema::create('student_fees', function (Blueprint $table) {
            $table->id();
            $table->string('student_info_id');
            $table->string('year_level');
            $table->string('semester'); 
            $table->string('status'); 
            $table->double('total_amount'); 
            $table->double('amount_paid');
            $table->foreign('student_info_id')->references('student_id')->on('student_info')->onDelete('cascade')->onUpdate('cascade');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payment_details');
    }
};
