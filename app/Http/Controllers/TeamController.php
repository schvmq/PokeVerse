<?php

namespace App\Http\Controllers;

use App\Models\UserTeam;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

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

    public function destroy(UserTeam $team)
    {
        // D - Delete: Security check and deletion
        if ($team->user_id !== Auth::id()) {
            abort(403, 'Unauthorized action.'); 
        }
        
        $team->delete();
        
        return redirect()->route('team.index')->with('success', 'Pokémon removed from your team.');
    }
}