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

        foreach ($lessons as $lesson) {
            if ($lesson->status === 1){
                if ($lesson->user_id === $authUserId) {
                    $lesson->status = 'Booked by you';
                } elseif ($lesson->user_id !== $authUserId) {
                    $lesson->status = 'Booked';
                }
            } elseif ($lesson->status === 0){
                if (now() < $lesson->start_date){
                    $lesson->status = 'Available';
                } elseif (now() > $lesson->start_date){
                    $lesson->status = 'Not available';
                }
            }            
        }

        return Inertia::render('Tutors/BookLesson/Index', [
            "tutorLessons" => $lessons
        ]);
    }
}
