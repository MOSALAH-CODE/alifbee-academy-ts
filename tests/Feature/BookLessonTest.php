<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;

use PHPUnit\Framework\Constraint\Constraint;


class BookLessonTest extends TestCase
{
    public function testStoreMethod()
    {
        // Arrange: Prepare the necessary data and environment
        $user = User::factory()->create();
        $tutor = User::factory()->create();

        $lessonData = [
            'user_id' => $user->id,
            'tutor_id' => $tutor->id,
            'credit_cost' => 10,
            'start_date' => now()->addHour(),
            'end_date' => now()->addHours(2),
            'status' => 1,
            'meet_id' => '12345',
            'password' => 'secret',
        ];

        // Act: Call the store method of the BookLessonController
        $response = $this->actingAs($user)
            ->post('/tutors/book-lesson/details/purchase', ['lesson' => $lessonData]);

        // Assert: Verify the expected outcome
        $response->assertStatus(200); // Assuming you return a 200 status in a successful case

        // Check if the lesson was created in the database
        $this->assertDatabaseHas('lessons', [
            'user_id' => $user->id,
            'tutor_id' => $tutor->id,
            'credit_cost' => 10,
            // Add more fields as needed
        ]);

        // Check if the user's balance was updated
        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'balance' => $user->balance - 10,
        ]);

        // You can add more assertions based on your specific logic and use case
    }
    public function testStringContainsSubstring()
    {
        $string = ' World!';
        $substring = 'Hello';

        $this->assertThat($string, new StringContainsSubstring($substring));
    }
}
