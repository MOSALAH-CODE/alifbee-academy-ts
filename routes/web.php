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
    $tutors = [];

    foreach ($lessons as $lesson) {
        $tutors[] = $lesson->tutor;
    }

    $lessonsQuery = $lessons;

    if (Request::has("status")) {
        $status = Request::input("status");
        $lessonsQuery = $lessonsQuery->where('status', $status); 
    }

    // dd($lessonsQuery);
    // $filteredLessons = $lessonsQuery;
    $filteredLessons = $lessonsQuery;


    return Inertia::render('Dashboard', [
        'lessons' => $filteredLessons,
        'lessons_status' => Request::only(["status"]),
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');



// Route::get('/dashboard', function () {
//     $lessons = Auth::user()->lessons;
//     $tutors = [];

//     foreach ($lessons as $lesson) {
//         $tutors[] = $lesson->tutor;
//     }

//     $status = Request::input("status", null);

//     $filteredLessons = [];
//     foreach ($lessons as $lesson) {
//         var_dump($lesson->status);
//         var_dump($status);
//         if ($lesson->status === $status) {
//             var_dump($lesson);
//             array_push($filteredLessons, $lesson);
//         }
//     }
//     dd($filteredLessons);
    
//     return Inertia::render('Dashboard', [
//         'lessons' => $filteredLessons,
//         'lessons_status' => Request::only(["status"]),
//     ]);
// })->middleware(['auth', 'verified'])->name('dashboard');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/tutors', [TutorsController::class, 'show'])->name('tutors');
    Route::get('/my-calendar', [CalendarController::class, 'show'])->name('calendar');
});

require __DIR__.'/auth.php';
