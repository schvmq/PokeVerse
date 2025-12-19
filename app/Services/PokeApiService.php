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
                $response = Http::get($this->baseUrl . 'pokemon', ['limit' => $limit]);
                if ($response->successful()) {
                    // Validate/sanitize API results into clean internal structures
                    return $response->json('results'); 
                }
            } catch (Exception $e) {
                // Network or PHP error fallback
            } 
            return []; 
        });
    }

    // ========================================================
    // Fetches details for a specific Pokémon (for detail modal) with caching.
    // Fulfills: Build API Services for Pokémon details.
    // =========================================================
    public function getPokemonStoryData(string $name): ?array
    {
        $name = strtolower($name);
        return Cache::remember("story_{$name}", now()->addHours(24), function () use ($name) {
            try {
                // Fetch species data specifically for the "Flavor Text" (Pokedex entry story)
                $response = Http::get($this->baseUrl . "pokemon-species/{$name}");
                if ($response->successful()) {
                    $data = $response->json();
                    // Grab only the English flavor text for the narrative
                    $description = collect($data['flavor_text_entries'])
                        ->where('language.name', 'en')
                        ->first()['flavor_text'] ?? 'No field notes available.';
                    
                    return [
                        'description' => str_replace(["\n", "\f"], ' ', $description),
                        'habitat' => $data['habitat']['name'] ?? 'unknown',
                        'is_legendary' => $data['is_legendary']
                    ];
                }
            } catch (Exception $e) { }
            return null;
        });
    }

    // =========================================================
    // Fetches basic details (stats/sprites) for the CRUD "User's Chapter".
    // =========================================================
    public function getPokemonDetails(string $name): ?array
    {
        $name = strtolower($name);
        $cacheKey = 'pokemon_details_' . $name;
        
        return Cache::remember($cacheKey, now()->addHours(24), function () use ($name) {
            try {
                $response = Http::get($this->baseUrl . 'pokemon/' . $name);
                if ($response->successful()) {
                    return $response->json();
                }
            } catch (Exception $e) { }
            return null;
        });
    }

    
    // =========================================================
    // Fetches the evolution chain for a specific Pokémon.
    // =========================================================
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

    // =========================================================
    // Fetches region data.
    // =========================================================
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

    //
    //
    //
    public function getHabitatData(string $habitat): array
    {
        // Cache heavily (7 days)
        return Cache::remember("habitat_{$habitat}", now()->addDays(7), function () use ($habitat) {
            
            // 1. Fetch the list of ALL species in this habitat
            $response = Http::get($this->baseUrl . "pokemon-habitat/{$habitat}");
        
            if ($response->successful()) {
                $allPokemon = collect($response->json('pokemon_species'));
            
                // 2. Pick 6 random ones
                // We use 'min' to avoid errors if a habitat has fewer than 6 pokemon
                $randomPicks = $allPokemon->random(min(6, $allPokemon->count()));
            
                // 3. CRITICAL STEP: Fetch the DETAILS (Images) for these 6 pokemon
                // We loop through the names and reuse your existing getPokemonDetails method
                return $randomPicks->map(function ($species) {
                    return $this->getPokemonDetails($species['name']);
                })->filter()->values()->all(); // filter() removes any nulls if an API call fails
            }
        
            return [];
        });
    }


}