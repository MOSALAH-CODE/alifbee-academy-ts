<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class CalendarController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function show()
    {
        return Inertia::render('Calendar');
    }
}
