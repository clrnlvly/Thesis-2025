<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Student_Info;
use App\Models\Personal_Info;
use App\Models\Guardian;
use Illuminate\Database\Seeder;

class StudentInfoSeeder extends Seeder
{
    public function run()
    {
        // Create 10 users and their associated student info
        User::factory(10)->create()->each(function ($user) {
            // Create student info for each user and make sure the user_id is assigned correctly
            $studentInfo = Student_Info::factory()->create([
                'users_id' => $user->id,  // Associate the student info with the user
                'student_id' => $user->id,  // Make sure the student_id is the same as the user ID
            ]);

            // Now create the related personal info and guardian for the created student_info
            Personal_Info::factory()->create([
                'student_info_id' => $studentInfo->student_id,  // This references student_id in the student_info table
            ]);

            Guardian::factory()->create([
                'student_info_id' => $studentInfo->student_id,  // This references student_id in the student_info table
            ]);
        });
    }
}
