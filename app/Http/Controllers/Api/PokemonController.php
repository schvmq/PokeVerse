<?php

namespace App\Http\Controllers\Api;

use App\Models\CapturedPokemon;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class PokemonController
{
    /**
     * Get all captured Pokemon for the authenticated user
     */
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();
        
        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $pokemon = CapturedPokemon::where('user_id', $user->id)->get();

        return response()->json([
            'success' => true,
            'data' => $pokemon,
        ], 200);
    }

    /**
     * Capture a Pokemon (create a new entry)
     */
    public function store(Request $request): JsonResponse
    {
        $user = $request->user();
        
        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $validated = $request->validate([
            'pokemon_id' => 'required|integer',
            'pokemon_name' => 'required|string',
            'nickname' => 'nullable|string',
            'field_notes' => 'nullable|string',
        ]);

        // Check if user already has this Pokemon
        $existing = CapturedPokemon::where('user_id', $user->id)
            ->where('pokemon_id', $validated['pokemon_id'])
            ->first();

        if ($existing) {
            return response()->json([
                'success' => false,
                'message' => 'You already have this Pokemon!',
            ], 422);
        }

        $capture = CapturedPokemon::create([
            'user_id' => $user->id,
            'pokemon_id' => $validated['pokemon_id'],
            'pokemon_name' => $validated['pokemon_name'],
            'nickname' => $validated['nickname'] ?? null,
            'field_notes' => $validated['field_notes'] ?? null,
            'status' => 'Healthy',
            'captured_at' => now(),
        ]);

        return response()->json([
            'success' => true,
            'data' => $capture,
            'message' => 'Pokemon captured!',
        ], 201);
    }

    /**
     * Update a captured Pokemon
     */
    public function update(Request $request, $id): JsonResponse
    {
        $user = $request->user();
        
        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $capture = CapturedPokemon::findOrFail($id);

        // Ensure user owns this Pokemon
        if ($capture->user_id !== $user->id) {
            return response()->json(['error' => 'Forbidden'], 403);
        }

        $validated = $request->validate([
            'nickname' => 'nullable|string',
            'field_notes' => 'nullable|string',
            'status' => 'nullable|in:Healthy,Injured,Tired,Training',
        ]);

        $capture->update($validated);

        return response()->json([
            'success' => true,
            'data' => $capture,
        ], 200);
    }

    /**
     * Release (delete) a captured Pokemon
     */
    public function destroy(Request $request, $id): JsonResponse
    {
        $user = $request->user();
        
        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $capture = CapturedPokemon::findOrFail($id);

        // Ensure user owns this Pokemon
        if ($capture->user_id !== $user->id) {
            return response()->json(['error' => 'Forbidden'], 403);
        }

        $capture->delete();

        return response()->json([
            'success' => true,
            'message' => 'Pokemon released!',
        ], 200);
    }
}
