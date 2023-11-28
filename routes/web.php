<?php

use App\Http\Controllers\BookLessonController;
use App\Http\Controllers\CalendarController;
use App\Http\Controllers\DashboardController;
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



Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['verified'])
    ->name('dashboard');
    Route::get('/api/dashboard/lessons', [DashboardController::class, 'show'])
        ->middleware(['verified']);
    Route::delete('/api/lessons/{id}/cancel', [DashboardController::class, 'cancelLesson'])
        ->middleware(['verified']);

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/tutors', [TutorsController::class, 'index'])->name('tutors');
    Route::get('/tutors/{id}', [TutorsController::class, 'show'])->name('tutors.show');
    Route::get('/tutors/book-lesson/{id}', [BookLessonController::class, 'index'])->name('bookLesson');

    Route::get('/tutors/book-lesson/details{lesson}', [BookLessonController::class, 'show'])->name('bookLesson.details');
    Route::get('/my-calendar', [CalendarController::class, 'show'])->name('calendar');
});

require __DIR__.'/auth.php';
