<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $lessons = auth()->user()->lessons->load('tutor');

        $countLessons = $this->countLessons($lessons);
        $completedEduTimeFormatted = $this->calculateCompletedEduTime($lessons);

        return Inertia::render('Dashboard/index', [
            'lessons' => $lessons,
            'countLessons' => $countLessons,
            'completedEduTime' => $completedEduTimeFormatted,
            'lessons_status' => $request->only(["status"]),
        ]);
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

        return sprintf('%dd %dh %dmin', $days, $hours, $minutes);
    }

    private function formatTime($completedEduTimeInMinutes)
    {
        $days = floor($completedEduTimeInMinutes / (24 * 60));
        $hours = floor(($completedEduTimeInMinutes % (24 * 60)) / 60);
        $minutes = $completedEduTimeInMinutes % 60;

        return [$days, $hours, $minutes];
    }
}
