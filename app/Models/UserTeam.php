<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\User;

class UserTeam extends Model
{
    use HasFactory;

    protected $fillable = [
        'pokemon_api_id',
        'pokemon_name',
        'nickname',
        'notes',
        'user_id', // Make sure this is included for mass assignment!
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