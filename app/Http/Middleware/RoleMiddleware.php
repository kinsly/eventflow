<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        if (!Auth::check()) {
            return redirect('/');
        }

        /** @var  App\Models\User */
        $user = Auth::user();
        
        if(empty($roles)){
            //Added to access user roles on welcome page. This will add roles to users model received on react side
            $user->hasAnyRole($roles);

            return $next($request);
        }

        if (!$user->hasAnyRole($roles)) {
            return redirect('/');
        }

        return $next($request);
    }
}
