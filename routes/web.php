<?php

use App\Http\Controllers\PokedexController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\ProfileController;
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
    
    // Update: Update nicknames or field notes 
    Route::patch('/my-team/{team}', [TeamController::class, 'update'])->name('team.update');

    // Delete: Remove from Team (Destroy)
    Route::delete('/my-team/{team}', [TeamController::class, 'destroy'])->name('team.destroy'); 
    
    // User Profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

});

// --- 3. Authentication Routes ---

require __DIR__.'/auth.php';