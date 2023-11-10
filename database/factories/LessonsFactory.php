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
        $status = $this->faker->randomElement(['upcoming', 'completed', 'canceled']);

        return [
            'user_id' => fake()->numberBetween(7, 16),
            'tutor_id' => fake()->numberBetween(2, 6),
            'start_date' => now(),
            'end_date' => now()->addHours(1),
            'status' => $status,
            'meet_id' => 'meet.zoom.com/oup-dxjr',
            'password' => '12345',
            'credit_cost' => 1,
        ];
    }
}
