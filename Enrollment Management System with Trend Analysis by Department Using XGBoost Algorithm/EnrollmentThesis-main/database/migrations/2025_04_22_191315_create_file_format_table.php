<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('file_format', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('file');
            $table->timestamps();
        });

        DB::table('file_format')->insert([
            [
                'title' => 'Subject',
                'file' => 'storage/format/Subject.xlsx',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Program',
                'file' => 'storage/format/Program.xlsx',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Grades',
                'file' => 'storage/format/Grades.xlsx',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('file_format');
    }
};
