<?php

use App\Http\Controllers\CalendarController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TutorsController;
use App\Models\Lessons;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use SebastianBergmann\Timer\Timer;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Home', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
})->name('home');

Route::get('/dashboard', function () {
    $user = Auth::user();
    $lessons = $user->lessons;

    $countLessons = [
        'upcoming' => 0,
        'completed' => 0,
        'canceled' => 0,
    ];

    $completedEduTimeInMinutes = 0;

    foreach ($lessons as $lesson) {
        switch ($lesson->status) {
            case 'upcoming':
                $countLessons['upcoming']++;
                break;
            case 'completed':{
                $countLessons['completed']++;
                $startDate = new DateTime($lesson->start_date);
                $endDate = new DateTime($lesson->end_date);
                $dateInterval = $startDate->diff($endDate);
                $completedEduTimeInMinutes += ( $dateInterval->m * 30 * 24 * 60 ) + ( $dateInterval->d * 24 * 60 ) + ( $dateInterval->h * 60 ) + $dateInterval->i;
                break;
            }
            case 'canceled':
                $countLessons['canceled']++;
                break;
        }
    }
    
    $days = floor($completedEduTimeInMinutes / (24 * 60));
    $hours = floor(($completedEduTimeInMinutes % (24 * 60)) / 60);
    $minutes = $completedEduTimeInMinutes % 60;

    // Format the output
    $completedEduTimeFormatted = '';
    if ($days > 0) {
        $completedEduTimeFormatted .= $days . 'd';
    }
    
    if ($hours > 0) {
        if (!empty($completedEduTimeFormatted)) {
            $completedEduTimeFormatted .= ' ';
        }
        $completedEduTimeFormatted .= $hours . 'h';
    }
    
    if ($minutes > 0 || empty($completedEduTimeFormatted)) {
        if (!empty($completedEduTimeFormatted)) {
            $completedEduTimeFormatted .= ' ';
        }
        $completedEduTimeFormatted .= $minutes . 'min';
    }
    
    $lessons->pluck('tutor');

    $lessonsQuery = $lessons;

    if (Request::has("status")) {
        $status = Request::input("status");
        $lessonsQuery = $lessonsQuery->where('status', $status); 
    }

    $filteredLessons = $lessonsQuery;

    return Inertia::render('Dashboard/index', [
        'lessons' => $filteredLessons,
        'countLessons' => $countLessons,
        'completedEduTime' => $completedEduTimeFormatted,
        'lessons_status' => Request::only(["status"]),
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/tutors', [TutorsController::class, 'show'])->name('tutors');
    Route::get('/my-calendar', [CalendarController::class, 'show'])->name('calendar');
});

require __DIR__.'/auth.php';
