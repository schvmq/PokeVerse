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
        // Fetch data using your Service
        $pokemons = $this->pokeApi->getPokemonList(20);

        // Send data to the Frontend (Inertia)
        // Note: 'Pokedex/Index' is the React component Corey will build later
        return Inertia::render('Pokedex/Index', [
            'pokemons' => $pokemons
        ]);
    }

    public function show($name)
    {
        $details = $this->pokeApi->getPokemonDetails($name);
        
        return Inertia::render('Pokedex/Detail', [
            'pokemon' => $details
        ]);
    }
}