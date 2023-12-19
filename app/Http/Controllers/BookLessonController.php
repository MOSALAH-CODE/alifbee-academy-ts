<?php
namespace App\Http\Controllers;
use Inertia\Inertia;
use App\Models\Lessons;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;


class BookLessonController extends Controller
{
    public function index($id)
    {
        $lessons = Lessons::where('tutor_id', $id)->get();

        $tutor = User::where('id', $id)
        ->select(['id', 'name', 'email', 'profile_picture'])
        ->first(); 

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
            'tutor' => $tutor
        ]);
    }
    
    public function create()
    {

        return Inertia::render('Tutors/BookLesson/Create');
    }

    public function store()
    {
        $lessonData = Request::only(['lesson']);

        // Extract lesson data
        $lessonDetails = $lessonData['lesson'];

        $start_date = Carbon::parse($lessonDetails['start_date']);
        $end_date = Carbon::parse($lessonDetails['end_date']);

        $start_date->setTimezone(config('app.timezone'));
        $end_date->setTimezone(config('app.timezone'));

        // Check for existing lessons at the proposed start time for the same tutor
        $conflictingLesson = Lessons::where('tutor_id', $lessonDetails['tutor_id'])
            ->where('start_date', $start_date)
            ->exists();


        if ($conflictingLesson) {
            return Inertia::render('Tutors/BookLesson/Store', [
                'error' => 'A lesson already exists at this time for the same tutor',
            ]);
        }

        // Get the user based on the user_id
        $user = User::find($lessonDetails['user_id']);

        if ($user->id !== Auth::user()->id){
            return Inertia::render('Tutors/BookLesson/Store', [
                'error' => 'Unauthorized',
            ]); 
        }

        // Check if the user's balance is enough to cover the credit_cost
        if ($user->balance < $lessonDetails['credit_cost']) {
            return Inertia::render('Tutors/BookLesson/Store', [
                'error' => 'Insufficient balance to purchase the lesson',
            ]);
        }

        // Start a database transaction
        DB::beginTransaction();

        try {
            // Create a new lesson instance with the received data
            $lesson = Lessons::create([
                'user_id' => $lessonDetails['user_id'],
                'tutor_id' => $lessonDetails['tutor_id'],
                'credit_cost' => $lessonDetails['credit_cost'],
                'start_date' => $start_date,
                'end_date' => $end_date,
                'status' => 1,
                'meet_id' => $lessonDetails['meet_id'],
                'password' => $lessonDetails['password'],
            ]);

            // Subtract the credit cost from the user's balance
            $user->balance -= $lessonDetails['credit_cost'];
            $user->save();

            // Commit the transaction
            DB::commit();

            // Load the associated tutor
            $lesson->load('tutor');

            return Inertia::render('Tutors/BookLesson/Store', [
                'lesson' => $lesson,
            ]);
        } catch (\Exception $e) {
            // Rollback the transaction if an exception occurred
            DB::rollback();

            // Handle the exception
            return Inertia::render('Tutors/BookLesson/Store', [
                'error' => 'Error creating the lesson: ' . $e->getMessage(),
            ]);
        }
    }  
}
