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
        Schema::create('documents', function (Blueprint $table) {
            $table->id();
            $table->string('student_info_id');
            $table->boolean('form_138A')->default(false);
            $table->boolean('form_137')->default(false);
            $table->boolean('good_moral')->default(false);
            $table->boolean('psa')->default(false);
            $table->boolean('pic_2x2')->default(false);
            $table->boolean('ctc_transferee')->default(false);
            $table->boolean('grade_transferee')->default(false);
            $table->boolean('f137_transferee')->default(false);
            $table->string('status', 50)->default('pending');

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
        Schema::dropIfExists('documents');
    }
};
