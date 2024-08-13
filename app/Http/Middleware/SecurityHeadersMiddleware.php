<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\View;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Vite;

/**
 * This was added by kinsly(me)
 * Pass all security headers
 * https://securityheaders.com/?q=https%3A%2F%2Ftasko.zmenia.com%2F&followRedirects=on
 */
class SecurityHeadersMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        Vite::useCspNonce();
        /** @var Request */
        $response = $next($request);

        // Share the nonce with the view
        View()->share('cspNonce', Vite::cspNonce());

        //Comment out security headers because login with incorrect details cause error. Fix it later
        return $response->withHeaders([
            // 'Content-Security-Policy' => "script-src 'self' 'nonce-" . Vite::cspNonce() . "';frame-ancestors 'none';",
            // 'X-Frame-Options' => 'SAMEORIGIN',
            // 'X-Content-Type-Options' => 'nosniff',
            // 'Strict-Transport-Security'=> 'max-age=31536000; includeSubDomains; preload',
            // 'X-XSS-Protection' => '1; mode=block',
            // 'Referrer-Policy' => 'no-referrer',
            // 'Permissions-Policy' => 'geolocation=(), microphone=(), camera=()'

        ]);

        // Enable CSP nonce usage
        // Vite::useCspNonce();

        // // Get the nonce for the current request
        // $nonce = Vite::cspNonce();

        //  /** @var Request */
        // $response = $next($request);

        // // Add CSP header
        // return $response->withHeaders([
        //     'Content-Security-Policy' => "script-src 'self' 'nonce-{$nonce}'; object-src 'none'; base-uri 'self'; frame-src 'none'"
        // ]);

        // $response = $next($request);
        // Vite::useCspNonce();

        // // Add security headers
        // $response->headers->set('X-Frame-Options', 'SAMEORIGIN'); // Clickjacking protection
        // $response->headers->set('Content-Security-Policy', "script-src 'nonce-".Vite::cspNonce()."'"); // CSP including frame-ancestors
        // $response->headers->set('X-Content-Type-Options', 'nosniff'); // Prevent MIME type sniffing
        // $response->headers->set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload'); // HSTS

        // // Additional headers to improve security
        // $response->headers->set('X-XSS-Protection', '1; mode=block'); // XSS protection
        // $response->headers->set('Referrer-Policy', 'no-referrer'); // Referrer policy
        // $response->headers->set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()'); // Permissions policy

        // return $response;

    }
}
