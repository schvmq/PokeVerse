<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use App\Services\PokeApiService; 

class AppServiceProvider extends ServiceProvider
{
    // =======================================
    // Register any application services.
    // =======================================
    public function register(): void
    {
        // Registers PokeApiService as a singleton for automatic injection
        $this->app->singleton(PokeApiService::class, function ($app) {
            return new PokeApiService();
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
    }
}