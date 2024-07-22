<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('{any}', function () {
    return view('welcome'); // Ensure this view exists and points to your SPA entry point
})->where('any', '.*');