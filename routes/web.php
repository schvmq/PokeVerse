<?php

use App\Http\Controllers\PokedexController;
use App\Http\Controllers\TeamController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// --- 1. Imports and Unprotected/Public Routes ---

// Default Home Route / Discover Page - Fetches the initial list
// This replaces the old Inertia::render('Welcome') block.
Route::get('/', [PokedexController::class, 'index'])->name('pokedex.index'); 

// Details Page - Fetches specific Pokémon data
Route::get('/pokemon/{name}', [PokedexController::class, 'show'])->name('pokedex.show'); 


// --- 2. Protected Routes (Requires Login/Auth Middleware - Task 10) ---

Route::middleware(['auth', 'verified'])->group(function () {
    
    // Read: My Team Index (using TeamController)
    Route::get('/my-team', [TeamController::class, 'index'])->name('team.index');
    
    // Create: Add to Team (Store)
    Route::post('/my-team', [TeamController::class, 'store'])->name('team.store');
    
    // Delete: Remove from Team (Destroy)
    Route::delete('/my-team/{team}', [TeamController::class, 'destroy'])->name('team.destroy'); 
    
    Route::get('/profile', fn() => Inertia::render('Profile/Edit'))->name('profile.edit');
});

// --- 3. Authentication Routes ---

require __DIR__.'/auth.php';