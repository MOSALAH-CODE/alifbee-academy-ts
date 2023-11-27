<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Lessons>
 */
class LessonsFactory extends Factory
{


    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => fake()->numberBetween(7, 16),
            'tutor_id' => fake()->numberBetween(2, 6),
            'credit_cost' => 1,
            'start_date' => "2023-11-20 09:00:00",
            'end_date' => "2023-11-20 09:30:00",
            'status' => fake()->boolean(),
            'meet_id' => 'meet.zoom.com/oup-dxjr',
            'password' => '12345',
        ];
    }
}
