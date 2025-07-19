<?php

namespace Database\Factories;

use App\Models\Guardian;
use App\Models\Student_Info;
use App\Models\StudentInfo;
use Illuminate\Database\Eloquent\Factories\Factory;

class GuardianFactory extends Factory
{
    protected $model = Guardian::class;

    public function definition()
    {
        // Get a random student_info to associate with the guardian info


        return [
            'student_info_id' => $this->faker->randomElement(Student_Info::pluck('student_id')->toArray()), 
            'father_name' => $this->faker->name(),
            'father_occupation' => $this->faker->jobTitle(),
            'father_phone' => $this->faker->phoneNumber(),
            'mother_name' => $this->faker->name(),
            'mother_occupation' => $this->faker->jobTitle(),
            'mother_phone' => $this->faker->phoneNumber(),
            'guardian_name' => $this->faker->name(),
            'guardian_relationship' => $this->faker->word(),
            'guardian_phone' => $this->faker->phoneNumber(),
        ];
    }
}
