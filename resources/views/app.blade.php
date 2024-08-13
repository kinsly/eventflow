<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        {{-- <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" /> --}}
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" rel="stylesheet" />
        <link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet'>

        <link href="{{asset('css/custom.css')}}" rel="stylesheet" />

        <!-- Scripts -->
        @routes(nonce: Vite::cspNonce())
        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/Pages/{$page['component']}.tsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased" style="max-width: 1000px; margin: auto">
        @inertia
    </body>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/js/fontawesome.min.js"/>
</html>
