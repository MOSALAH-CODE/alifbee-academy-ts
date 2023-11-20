<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Lessons;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $userId = auth()->id();
        $lessons = Lessons::where('user_id', $userId)->with('tutor')->get();

        $countLessons = $this->countLessons($lessons);
        $completedEduTimeFormatted = $this->calculateCompletedEduTime($lessons);

        $nextLesson = Lessons::where('user_id', $userId)
            ->where('status', true) // Fetch only upcoming lessons
            ->where('start_date', '>', now())
            ->with('tutor')
            ->orderBy('start_date', 'asc')
            ->first();

        return Inertia::render('Dashboard/index', [
            'countLessons' => $countLessons,
            'completedEduTime' => $completedEduTimeFormatted,
            'nextLesson' => $nextLesson,
        ]);
    }

    public function show(Request $request)
    {
        $statusRequest = $request->input('status');
        $showAll = $request->input('showAll');
        dd($showAll);

        $lessons = Lessons::where('user_id', Auth::user()->id)
            ->when($statusRequest === 'canceled', function ($query) {
                // Filter canceled lessons directly
                return $query->where('status', false);
            })
            ->when($statusRequest !== 'canceled', function ($query) use ($statusRequest) {
                // Filter upcoming or completed lessons based on date conditions
                return $query->where('status', true)
                    ->when($statusRequest === 'upcoming', function ($q) {
                        return $q->where('start_date', '>', now());
                    })
                    ->when($statusRequest === 'completed', function ($q) {
                        return $q->where('start_date', '<', now());
                    });
            })
            ->with('tutor')
            ->orderBy('start_date', 'asc')
            ->get();

        return response()->json(['lessons' => $lessons], 200);
    }

    public function cancelLesson(Request $request, $id)
    {
        $user = User::findOrFail(Auth::user()->id);
        $lesson = Lessons::findOrFail($id);

        // Check if the lesson belongs to the authenticated user
        if ($lesson->user_id !== $user->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $now = now();
        $end_date = $lesson->end_date;
        $start_date = $lesson->start_date;
        $timeDifferenceInHoursToStart = $now->diffInHours($start_date);
        $timeDifferenceInHoursToEnd = $now->diffInHours($end_date);
    
        // Check if the lesson has ended or is ongoing
        if ($timeDifferenceInHoursToEnd > 0 && $lesson->status) {
            // Lesson is ongoing
            $lesson->status = false; // Set status to canceled
            $lesson->save();

            // Check if the lesson is canceled before 24 hours of its start date
            if ($timeDifferenceInHoursToStart >= 24 ) {
                $user->balance += $lesson->credit_cost;
                $user->save();

                return response()->json(['message' => 'Lesson canceled, credit will be refunded'], 200);
            }
            
            return response()->json(['message' => 'Lesson canceled, credit will not be refunded'], 200);
        }
    
        return response()->json(['message' => 'Lesson cancellation failed. It may be a late cancellation, or the lesson has already been canceled or has ended.'], 400);
    }
    
    private function countLessons($lessons)
    {
        $countLessons = [
            'upcoming' => 0,
            'completed' => 0,
            'canceled' => 0,
        ];

        foreach ($lessons as $lesson) {
            if ($lesson->status) {
                // Check if the lesson's start date is in the future (upcoming) or in the past (completed)
                if (now() < $lesson->start_date) {
                    $countLessons['upcoming']++;
                } else {
                    $countLessons['completed']++;
                }
            } else if (!$lesson->status) {
                $countLessons['canceled']++;
            }
        }

        return $countLessons;
    }

    private function calculateCompletedEduTime($lessons)
    {
    
        $completedEduTimeInMinutes = 0;

        foreach ($lessons as $lesson) {
            if ($lesson->status) { 
                $startDate = new \DateTime($lesson->start_date);
                $endDate = new \DateTime($lesson->end_date);
                $dateInterval = $startDate->diff($endDate);
                if ($startDate < now()) { // If the lesson end date is in the past, consider it as completed
                    $completedEduTimeInMinutes += ($dateInterval->m * 30 * 24 * 60) + ($dateInterval->d * 24 * 60) + ($dateInterval->h * 60) + $dateInterval->i;
                }
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
