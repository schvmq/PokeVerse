<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CapturedPokemon extends Model
{
    protected $fillable = [
        'user_id',
        'pokemon_id',
        'pokemon_name',
        'nickname',
        'field_notes',
        'status',
        'captured_at',
    ];

    protected $casts = [
        'captured_at' => 'datetime',
    ];

    /**
     * Get the user that owns this captured pokemon.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
