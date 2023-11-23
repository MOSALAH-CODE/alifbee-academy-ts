<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\User;


class TutorsController extends Controller
{
    
    public function index()
    {
        // Retrieve all users with the "tutor" role
        $tutors = User::role('Tutor')->get();

        return Inertia::render('Tutors/Index', [
            'tutors' => $tutors,
        ]);
    }

    public function show($id)
    {
        // Retrieve a single user with the "Tutor" role by their ID
        $tutor = User::role('Tutor')->findOrFail($id);

        return Inertia::render('Tutors/Show', [
            'tutor' => $tutor,
        ]);
    }
}