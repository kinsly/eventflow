<?php

use App\Http\Controllers\BackupController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\WelcomeController;
use App\Http\Controllers\BusinessController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\UserRolesController;
use App\Http\Middleware\SecurityHeadersMiddleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Inertia\Inertia;

Route::get('/',[WelcomeController::class, 'index'])->name('welcome');   

/**Show notice to user - please verify email */ 
Route::get('/email/verify', function () {
    return Inertia::render('Auth/VerifyEmail',[]);
    // view('auth.verify-email');
})->middleware('auth')->name('verification.notice');

/** When user click on verification link on the mail comes to here for verification 
 * All the verifcations are db updates are handle by EmailVerificationRequest
*/
Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
    $request->fulfill();
    return redirect()->route('welcome')->with('success', 'Email Verified');
});
//->middleware(['auth', 'signed'])->name('verification.verify');

/**Allow user to get another verification mail if previous mail get lost or deleted */
Route::post('/email/verification-notification', function (Request $request) {
    $request->user()->sendEmailVerificationNotification();
 
    return back()->with('message', 'Verification link sent!');
})->middleware(['auth', 'throttle:6,1'])->name('verification.send');

Route::patch('/profile/change-email', [ProfileController::class, 'updateEmail'])->middleware('auth')->name('profile.email.update');

Route::group(['middleware' => ['auth', 'role:Super Admin']],function () {
    Route::get('/user-roles', [UserRolesController::class,'index'])->name('userRoles.index');
    Route::post('/user-roles', [UserRolesController::class,'store'])->name('userRoles.store');
    Route::delete('/user-roles', [UserRolesController::class,'destroy'])->name('userRoles.delete');

    /**backups */
    Route::get('/backups',[BackupController::class,'index'])->name('backups');
    Route::get('/backups/download/{fileName}',[BackupController::class,'download'])
            ->withoutMiddleware([SecurityHeadersMiddleware::class])->name('backups.download');

    Route::delete('/backups/delete',[BackupController::class,'delete'])->name('backups.delete');

});


// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::group(['middleware' => ['auth','verified', 'role:Admin|Super Admin|Free User']],function () {

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');   

    
    Route::get('/events/store/{business_id?}', [EventController::class,'addTask'])->name('events.add');
    Route::post('/events/store', [EventController::class,'storeTask'])->name('events.store');
    
    
    Route::get('/events/show/{event_id}', [EventController::class,'showEvent'])->name('events.show');
    Route::get('/events/edit/{event_id}', [EventController::class,'editEvent'])->name('events.edit');
    Route::put('/events/edit/{event_id}', [EventController::class,'updateEvent'])->name('events.update');
    Route::delete('/events/delete/{event_id}', [EventController::class,'deleteEvent'])->name('events.delete');
    Route::post('/events/complete/{event_id}', [EventController::class,'completeEvent'])->name('events.complete');
    Route::post('/events/undo-complete/{event_id}', [EventController::class,'undoCompleteEvent'])->name('events.undoComplete');
    Route::delete('/events/payment', [EventController::class,'removePayment'])->name('events.removePayment');
    
    Route::get('/events/{year}/{business_id?}', [EventController::class,'index'])->name('events');

    Route::get('/business',[BusinessController::class,'index'])->name('business.index');
    Route::post('/business',[BusinessController::class,'store'])->name('business.store');
    Route::put('/business/{id}',[BusinessController::class,'update'])->name('business.update');
    Route::delete('/business/{id}',[BusinessController::class,'delete'])->name('business.delete');

    
});

require __DIR__.'/auth.php';
