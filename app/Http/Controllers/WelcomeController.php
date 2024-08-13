<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;


class WelcomeController extends Controller
{
    public function index():Response
    {
        
    
        
        /**
         * Adding available user roles to users model pass to front end react
         */
        if(Auth::check()){
            /** @var App/Models/User*/
            $user = Auth::user();
            $user->hasAnyRole();
        }
        
        return Inertia::render('Welcome', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
        ]);
    }
}
