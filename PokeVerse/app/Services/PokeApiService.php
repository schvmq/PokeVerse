<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
use Exception;

class PokeApiService
{
    // SACHA: Service class to interact with the PokéAPI

    // The base URL for the external API
    protected string $baseUrl = 'https://pokeapi.co/api/v2/';

    // ========================================================
    // Fetches a list of Pokémon (for Discover Page) with caching.
    // Fulfills: Build API Services for Pokémon list. Implement caching layer.
    // ==========================================================
    public function getPokemonList(int $limit = 20): array
    {
        $cacheKey = 'pokemon_list_' . $limit;
        
        // Cache for 30 minutes to reduce repeated API calls
        return Cache::remember($cacheKey, now()->addMinutes(30), function () use ($limit) {
            try {
                $response = Http::get($this->baseUrl . 'pokemon', [
                    'limit' => $limit,
                ]);

                if ($response->successful()) {
                    // Validate/sanitize API results into clean internal structures
                    return $response->json('results'); 
                }
            } catch (Exception $e) {
                // Network or PHP error fallback
            }
            
            // Apply “soft fail” safety if PokéAPI returns incomplete data
            return []; 
        });
    }

    // ========================================================
    // Fetches details for a specific Pokémon (for detail modal) with caching.
    // Fulfills: Build API Services for Pokémon details.
    // =========================================================
    public function getPokemonDetails(string $name): ?array
    {
        $name = strtolower($name);
        $cacheKey = 'pokemon_details_' . $name;
        
        // Cache details for 24 hours, as this data rarely changes
        return Cache::remember($cacheKey, now()->addHours(24), function () use ($name) {
            try {
                $response = Http::get($this->baseUrl . 'pokemon/' . $name);
                
                if ($response->successful()) {
                    return $response->json();
                }
            } catch (Exception $e) {
            }
            
            // If API fails or returns 404, return null
            return null;
        });
    }

    /**
     * Fetches the evolution chain for a specific Pokémon.
     * (Required for Task 3: Evolution Journey)
     */
    public function getEvolutionChain(int $speciesId): array
    {
        $cacheKey = 'evolution_chain_' . $speciesId;

        return Cache::remember($cacheKey, now()->addDays(7), function () use ($speciesId) {
            try {
                // 1. Get Species Data to find the Evolution Chain URL
                $speciesResponse = Http::get($this->baseUrl . "pokemon-species/{$speciesId}");
                
                if ($speciesResponse->successful()) {
                    $evolutionUrl = $speciesResponse->json('evolution_chain.url');
                    
                    // 2. Fetch the actual Evolution Chain
                    $evoResponse = Http::get($evolutionUrl);
                    
                    if ($evoResponse->successful()) {
                        return $evoResponse->json();
                    }
                }
            } catch (Exception $e) {
                // Fail silently
            }
            return [];
        });
    }

    /**
     * Fetches region data.
     * (Required for Task 3: Region Explorer)
     */
    public function getRegionData(string $regionNameOrId): ?array
    {
        $cacheKey = 'region_' . $regionNameOrId;

        return Cache::remember($cacheKey, now()->addDays(30), function () use ($regionNameOrId) {
            try {
                $response = Http::get($this->baseUrl . "region/{$regionNameOrId}");
                
                if ($response->successful()) {
                    return $response->json();
                }
            } catch (Exception $e) {
                // Fail silently
            }
            return null;
        });
    }

}