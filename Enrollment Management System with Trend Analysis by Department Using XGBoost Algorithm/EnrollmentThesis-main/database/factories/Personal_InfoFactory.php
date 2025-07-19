<?php

namespace Database\Factories;

use App\Models\Personal_Info;
use App\Models\Student_Info;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class Personal_InfoFactory extends Factory
{
    protected $model = Personal_Info::class;

    public function definition()
    {
        // Get a random Student_Info record (which has a user_id)
        $studentInfo = Student_Info::inRandomOrder()->first();  // Pick a random Student_Info

        // Get the User associated with this Student_Info
        $user = User::find($studentInfo->users_id);  // Find the User by users_id in Student_Info

        // Split the user's name into first, middle, and last names
        $names = explode(' ', $user->name);

        return [
            'student_info_id' => $studentInfo->student_id,  // Use student_id as foreign key in personal_info
            'first_name' => $names[0],  // First part of the user's name
            'middle_name' => isset($names[1]) ? $names[1] : null,  // If there's a middle name, assign it; otherwise, null
            'last_name' => isset($names[2]) ? $names[2] : (isset($names[1]) ? $names[1] : null),  // Last name could be second or third part
            'address' => $this->faker->address(),
            'birth_date' => $this->faker->date(),
            'birth_place' => $this->faker->city(),
            'civil_status' => $this->faker->randomElement(['Single', 'Married']),
            'gender' => $this->faker->randomElement(['Male', 'Female']),
            'religion' => $this->faker->optional()->word(),
        ];
    }
}
