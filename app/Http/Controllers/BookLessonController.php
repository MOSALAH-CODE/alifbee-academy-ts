<?php
namespace App\Http\Controllers;
use Inertia\Inertia;
use App\Models\Lessons;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;

class BookLessonController extends Controller
{
    public function index($id)
    {
        $lessons = Lessons::where('tutor_id', $id)->get();

        $tutor = User::where('id', $id)->get(['id', 'name', 'email', 'profile_picture']);

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
            "tutorLessons" => $lessons,
            'tutor' => $tutor[0]
        ]);
    }

    public function show($lesson)
    {
        dd($lesson);
        // Process the selected slots as needed and pass them to the view
        return Inertia::render('Tutors/BookLesson/Show', [
            // 'selectedSlots' => $lesson, // Pass selected slots to the view
        ]);
    }

}
