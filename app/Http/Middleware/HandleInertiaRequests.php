<?php

namespace App\Http\Middleware;

use Illuminate\Support\Facades\Session;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {        
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'flash' => [
                'success_message' => fn () => $request->session()->get('success')
            ],
            'session' => [
                'selected_business' => fn () => $request->session()->get('selected_business', null),
                'selected_year' => fn () => (int)$request->session()->get('selected_year', date('Y')),
            ]
        ];
    }
}
