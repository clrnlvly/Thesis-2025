<?php

namespace Database\Factories;

use App\Models\Student_Info;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class Student_InfoFactory extends Factory
{
    protected $model = Student_Info::class;

    public function definition()
    {
         // Create a user first, so we can assign it to the student_info
         $user = User::factory()->create();

         // Determine the department, and assign the corresponding year level options and program
         $department = $this->faker->randomElement(['SHS', 'College']);
         
         $yearLevels = [];
         $programs = [];
         
         if ($department === 'SHS') {
             $yearLevels = ['Grade 11', 'Grade 12'];
             $programs = ['STEM'];  // SHS students are assigned the STEM program
         } elseif ($department === 'College') {
             $yearLevels = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
             $programs = ['Computer Science', 'Information System'];  // College students are assigned Computer Science or Information System
         }
 
         return [
             'users_id' => $user->id,  // Assign the user to the student_info
             'student_id' => $user->id,  // Use the user id as the student_id
             'department' => $department,
             'school_year' => $this->faker->year(),
             'semester' => $this->faker->randomElement(['Fall', 'Spring', 'Summer']),
             'branch' => $this->faker->word(),
             'year_level' => $this->faker->randomElement($yearLevels),  // Assign the appropriate year level
             'program' => $this->faker->randomElement($programs),  // Assign the program based on department
             'classified_as' => $this->faker->randomElement(['old student', 'new student']),
             'last_school_attended' => $this->faker->sentence(),
             'last_school_address' => $this->faker->address(),
         ];
    }
}
