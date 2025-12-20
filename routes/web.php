<?php

use App\Http\Controllers\PokedexController;
use App\Http\Controllers\TeamController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// --- 1. Home Route - Redirect based on auth status ---
Route::get('/', function () {
    return view('app');
})->name('home');

// --- 2. Public Routes (No Auth Required) ---

// Discover/Pokedex Page - Pokedex controller
Route::get('/discover', [PokedexController::class, 'index'])->name('pokedex.index');
Route::get('/pokedex/evolution', function () { return Inertia::render('Pokedex/Evolution'); })->name('pokedex.evolution');
Route::get('/pokedex/regions', function () { return Inertia::render('Pokedex/Regions'); })->name('pokedex.regions');

// Details Page - Fetches specific Pokémon data
Route::get('/pokemon/{name}', [PokedexController::class, 'show'])->name('pokedex.show'); 

// --- 3. Protected Routes (Requires Login/Auth Middleware) ---

Route::middleware(['auth', 'verified'])->group(function () {
    
    // Dashboard Route - Main user hub
    Route::get('/dashboard', fn() => Inertia::render('Dashboard'))->name('dashboard');
    
    // My Team Section
    Route::get('/my-team', [TeamController::class, 'index'])->name('team.index');
    Route::post('/my-team', [TeamController::class, 'store'])->name('team.store');
    Route::delete('/my-team/{team}', [TeamController::class, 'destroy'])->name('team.destroy'); 
    
    // Profile
    Route::get('/profile', fn() => Inertia::render('Profile/Edit'))->name('profile.edit');
    Route::patch('/profile', fn() => response()->json(['message' => 'Profile updated']))->name('profile.update');
    Route::delete('/profile', fn() => response()->json(['message' => 'Profile deleted']))->name('profile.destroy');
});

// --- 4. Authentication Routes ---

require __DIR__.'/auth.php';