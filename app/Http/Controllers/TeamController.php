<?php

namespace App\Http\Controllers;

use App\Models\UserTeam;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Services\PokeApiService;

class TeamController extends Controller
{
    // The model needs a relationship defined to Auth::user() to make this work:
    // User::teams() returns $this->hasMany(UserTeam::class);

    public function index()
    {
        // R - Read: Fetch only the Pokémon owned by the current user
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $userTeam = $user->teams()->get();
        
        return Inertia::render('MyTeam/Index', [
            'userTeam' => $userTeam
        ]);
    }

    public function store(Request $request)
    {
        // C - Create: Validation and saving new team member
        $validated = $request->validate([
            'pokemon_api_id' => 'required|integer',
            'pokemon_name' => 'required|string|max:50',
            'nickname' => 'nullable|string|max:50',
            'notes' => 'nullable|string',
        ]);

        /** @var \App\Models\User $user */
        $user = Auth::user();
        $user->teams()->create($validated);
        
        return redirect()->route('team.index')->with('success', 'Pokémon added to your team!');
    }

    public function update(Request $request, UserTeam $team)
    {
        // Security check
        if ($team->user_id !== Auth::id()) {
            abort(403);
        }

        $validated = $request->validate([
            'nickname' => 'nullable|string|max:50',
            'notes' => 'nullable|string',
        ]);

        $team->update($validated); 

        return redirect()->route('team.index')->with('success', 'Field notes updated!');
    }

    public function destroy(UserTeam $team)
    {
        // D - Delete: Security check and deletion
        if ($team->user_id !== Auth::id()) {
            abort(403, 'Unauthorized action.'); 
        }
        
        $team->delete();
        return redirect()->route('team.index')->with('success', 'Released back into the wild!');
    }

    // Inject the Service (if you haven't already)
    protected $pokeApi;
    public function __construct(PokeApiService $pokeApi)
    {
        $this->pokeApi = $pokeApi;
    }

    /**
     * Show the form for editing the specified resource (Read API Data).
     */
    public function edit(UserTeam $team)
    {
        // 1. Security Check (Ensures user can only edit their own Pokémon)
        if ($team->user_id !== Auth::id()) {
            abort(403, 'Unauthorized action.'); 
        }

        // 2. Fetch required API data for the update form (Sacha's API role)
        $apiDetails = $this->pokeApi->getPokemonDetails($team->pokemon_name);

        return Inertia::render('MyTeam/Edit', [
            'teamMember' => $team,        // The current database record (Kirby's data)
            'apiDetails' => $apiDetails   // The live API data (Sacha's data)
        ]);
    }

    // Note: The public function update(Request $request, UserTeam $team) 
    // will be mostly handled by Kirby.
}