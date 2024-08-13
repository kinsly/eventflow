<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote')->hourly();

Schedule::command('backup:clean')->daily()->at('01:00')->onFailure(function () {
    
 })
 ->onSuccess(function () {
    
 });
 
 Schedule::command('backup:run')->daily()->at('01:30')->onFailure(function () {
   
 })
 ->onSuccess(function () {
    
 });