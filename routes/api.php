<?php

use App\Http\Controllers\API\ArticleController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\CompanyController; 
use App\Http\Controllers\API\UserController; 
use Illuminate\Support\Facades\Route;
   

Route::controller(AuthController::class)->group(function(){
    Route::post('register', 'register');
    Route::post('login', 'login');
});
         
Route::middleware('auth:sanctum')->group( function () {
    Route::apiResource('companies', CompanyController::class);
    Route::apiResource('articles', ArticleController::class);
    Route::get('/users/profile', [UserController::class, 'profile']);
    Route::apiResource('users', UserController::class);
});

