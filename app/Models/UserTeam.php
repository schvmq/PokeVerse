<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\User;

class UserTeam extends Model
{
    use HasFactory;

    protected $table = 'captured_pokemon';

    protected $fillable = [
        'pokemon_id',
        'pokemon_name',
        'nickname',
        'field_notes',
        'status',
        'captured_at',
        'user_id',
    ];

    protected $casts = [
        'captured_at' => 'datetime',
    ];

    /**
     * Define the inverse relationship to the User model.
     * A UserTeam belongs to one User.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}