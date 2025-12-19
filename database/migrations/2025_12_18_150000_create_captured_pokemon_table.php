<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('captured_pokemon', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->integer('pokemon_id')->unsigned(); // PokeAPI ID
            $table->string('pokemon_name'); // Pokemon name for reference
            $table->string('nickname')->nullable();
            $table->text('field_notes')->nullable();
            $table->enum('status', ['Healthy', 'Injured', 'Tired', 'Training'])->default('Healthy');
            $table->timestamp('captured_at');
            $table->timestamps();

            // Index for fast lookups
            $table->index('user_id');
            $table->index('pokemon_id');
            $table->unique(['user_id', 'pokemon_id']); // One instance of each pokemon per user
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('captured_pokemon');
    }
};
