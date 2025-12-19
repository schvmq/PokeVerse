<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PokemonController;

Route::middleware(\App\Http\Middleware\HandleCors::class)->group(function () {
    Route::post('/auth/register', [AuthController::class, 'register']);
    Route::post('/auth/login', [AuthController::class, 'login']);

    // Protected Pokemon routes (require authentication)
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/pokemon', [PokemonController::class, 'index']);
        Route::post('/pokemon', [PokemonController::class, 'store']);
        Route::put('/pokemon/{id}', [PokemonController::class, 'update']);
        Route::delete('/pokemon/{id}', [PokemonController::class, 'destroy']);
    });
});
