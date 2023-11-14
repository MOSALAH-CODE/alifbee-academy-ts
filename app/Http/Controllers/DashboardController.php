<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\Lessons;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class DashboardController extends Controller
{
    // public function __invoke(Request $request)
    // {
    //     // var_dump(Auth::user());
        
    //     $lessons = Lessons::filteredLessonsByStatus($request->only(['status']), 8)
    //                      ->with('tutor')
    //                      ->get();

    //     return response()->json(['lessons' => $lessons], 200);
    // }
    

    public function index()
    {
        $userId = auth()->id();
        $lessons = Lessons::where('user_id', $userId)->with('tutor')->get();


        $countLessons = $this->countLessons($lessons);
        $completedEduTimeFormatted = $this->calculateCompletedEduTime($lessons);
        
        $nextLesson = Lessons::where('user_id', $userId)
        ->where('status', 'upcoming')
        ->with('tutor')
        ->orderBy('start_date', 'asc')
        ->get()->first();

        return Inertia::render('Dashboard/index', [
            'countLessons' => $countLessons,
            'completedEduTime' => $completedEduTimeFormatted,
            'nextLesson' => $nextLesson,
        ]);
    }

    public function show(Request $request)
    {        
        $lessons = Lessons::filteredLessonsByStatus($request->only(['status']), Auth::user()->id)
                         ->with('tutor')
                         ->get();

        return response()->json(['lessons' => $lessons], 200);
    }
    
    private function countLessons($lessons)
    {
        $countLessons = [
            'upcoming' => 0,
            'completed' => 0,
            'canceled' => 0,
        ];

        foreach ($lessons as $lesson) {
            switch ($lesson->status) {
                case 'upcoming':
                    $countLessons['upcoming']++;
                    break;
                case 'completed':
                    $countLessons['completed']++;
                    break;
                case 'canceled':
                    $countLessons['canceled']++;
                    break;
            }
        }

        return $countLessons;
    }

    private function calculateCompletedEduTime($lessons)
    {
    
        $completedEduTimeInMinutes = 0;

        foreach ($lessons as $lesson) {
            if ($lesson->status === 'completed') {
                $startDate = new \DateTime($lesson->start_date);
                $endDate = new \DateTime($lesson->end_date);
                $dateInterval = $startDate->diff($endDate);
                $completedEduTimeInMinutes += ($dateInterval->m * 30 * 24 * 60) + ($dateInterval->d * 24 * 60) + ($dateInterval->h * 60) + $dateInterval->i;
            }
        }

        [$days, $hours, $minutes] = $this->formatTime($completedEduTimeInMinutes);

        return sprintf('%s%s%s',
        $days > 0 ? $days . 'd ' : '',
        $hours > 0 ? $hours . 'h ' : '',
        $minutes > 0 ? $minutes . 'min' : ''
        );
    }

    private function formatTime($completedEduTimeInMinutes)
    {
        $days = floor($completedEduTimeInMinutes / (24 * 60));
        $hours = floor(($completedEduTimeInMinutes % (24 * 60)) / 60);
        $minutes = $completedEduTimeInMinutes % 60;

        return [$days, $hours, $minutes];
    }
}
