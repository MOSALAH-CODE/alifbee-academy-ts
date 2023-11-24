<?php
namespace App\Http\Controllers;
use Inertia\Inertia;
use App\Models\Lessons;
use Illuminate\Support\Facades\Auth;

class BookLessonController extends Controller
{
    public function create($id)
    {
        $lessons = Lessons::where('tutor_id', $id)->get();

        // Get the authenticated user's ID
        $authUserId = Auth::id();

        // Determine the status of each lesson
        foreach ($lessons as $lesson) {
            if ($lesson->user_id === null) {
                if ($lesson->status === 1 && now() <= $lesson->start_date) {
                    $lesson->status = 'available';
                } elseif ($lesson->status === 0 || now() > $lesson->start_date) {
                    $lesson->status = 'not-available';
                }
            } elseif ($lesson->user_id === $authUserId) {
                $lesson->status = 'booked-by-you';
            } else {
                $lesson->status = 'booked';
            }
        }

        return Inertia::render('Tutors/BookLesson/Index', [
            "tutorLessons" => $lessons
        ]);
    }
}
