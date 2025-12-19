<?php

namespace App\Http\Controllers;

use App\Services\PokeApiService;
use Inertia\Inertia;
use Illuminate\Http\Request;

class PokedexController extends Controller
{
    protected $pokeApi;

    // Inject the Service automatically
    public function __construct(PokeApiService $pokeApi)
    {
        $this->pokeApi = $pokeApi;
    }

    public function index()
    {
        // Send data to the Frontend (Inertia)
        return Inertia::render('Pokedex/Index', [
        'landPokemon' => $this->pokeApi->getHabitatData('grassland'),
        'waterPokemon' => $this->pokeApi->getHabitatData('waters-edge'),
        'cavePokemon' => $this->pokeApi->getHabitatData('cave'),        ]);
    }

    public function show($name)
    {
        $details = $this->pokeApi->getPokemonDetails($name);
        
        return Inertia::render('Pokedex/Detail', [
            'pokemon' => $details
        ]);
    }
}