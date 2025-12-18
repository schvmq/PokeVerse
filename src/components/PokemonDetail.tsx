import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Plus, Check, Volume2, Ruler, Weight } from 'lucide-react';
import { Pokemon, User, CapturedPokemon } from '../App';

interface PokemonDetailProps {
  pokemon: Pokemon;
  onClose: () => void;
  onCapture: (pokemon: Pokemon) => void;
  isCaptured: boolean;
  user: User | null;
  capturedData?: CapturedPokemon;
  onUpdate?: (captureId: string, updates: Partial<CapturedPokemon>) => void;
}

const TYPE_COLORS: { [key: string]: string } = {
  normal: 'bg-gray-400',
  fire: 'bg-red-500',
  water: 'bg-blue-500',
  electric: 'bg-yellow-400',
  grass: 'bg-green-500',
  ice: 'bg-cyan-300',
  fighting: 'bg-orange-700',
  poison: 'bg-purple-500',
  ground: 'bg-yellow-700',
  flying: 'bg-indigo-400',
  psychic: 'bg-pink-500',
  bug: 'bg-lime-500',
  rock: 'bg-yellow-800',
  ghost: 'bg-purple-700',
  dragon: 'bg-indigo-600',
  dark: 'bg-gray-800',
  steel: 'bg-gray-500',
  fairy: 'bg-pink-300',
};

const STAT_COLORS: { [key: string]: string } = {
  hp: 'bg-red-500',
  attack: 'bg-orange-500',
  defense: 'bg-yellow-500',
  'special-attack': 'bg-blue-500',
  'special-defense': 'bg-green-500',
  speed: 'bg-pink-500',
};

export function PokemonDetail({
  pokemon,
  onClose,
  onCapture,
  isCaptured,
  user,
  capturedData,
}: PokemonDetailProps) {
  const primaryType = pokemon.types[0].type.name;
  const imageUrl = pokemon.sprites.other.home?.front_default ||
                   pokemon.sprites.other['official-artwork']?.front_default ||
                   pokemon.sprites.front_default;

  const playSound = () => {
    if (pokemon.cries?.latest) {
      const audio = new Audio(pokemon.cries.latest);
      audio.volume = 0.3;
      audio.play();
    }
  };

  const maxStat = Math.max(...pokemon.stats.map(s => s.base_stat));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-slate-900 to-slate-950 rounded-3xl shadow-2xl border border-slate-700"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-slate-800/80 hover:bg-slate-700 rounded-full text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header Section */}
        <div className="relative p-8 bg-gradient-to-br from-purple-900/30 to-blue-900/30 border-b border-slate-700">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            {/* Pokemon Image */}
            <div className="relative">
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-64 h-64 flex items-center justify-center"
              >
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={pokemon.name}
                    className="w-full h-full object-contain drop-shadow-2xl"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-800/50 rounded-lg flex items-center justify-center">
                    <span className="text-slate-500">No image available</span>
                  </div>
                )}
              </motion.div>
              
              {pokemon.cries?.latest && (
                <button
                  onClick={playSound}
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 p-3 bg-purple-500 hover:bg-purple-600 rounded-full text-white shadow-lg shadow-purple-500/50 transition-colors"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="text-slate-400 text-lg mb-2">
                #{pokemon.id.toString().padStart(3, '0')}
              </div>
              <h2 className="text-5xl text-white capitalize mb-4">{pokemon.name}</h2>
              
              {capturedData?.nickname && (
                <div className="text-xl text-purple-400 mb-4">
                  Nickname: {capturedData.nickname}
                </div>
              )}

              <div className="flex gap-3 mb-6 justify-center md:justify-start flex-wrap">
                {pokemon.types.map(({ type }) => (
                  <span
                    key={type.name}
                    className={`${TYPE_COLORS[type.name]} text-white px-4 py-2 rounded-full shadow-lg`}
                  >
                    {type.name}
                  </span>
                ))}
              </div>

              <div className="flex gap-6 mb-6 justify-center md:justify-start">
                <div className="flex items-center gap-2 text-slate-300">
                  <Ruler className="w-5 h-5 text-blue-400" />
                  <span>{(pokemon.height / 10).toFixed(1)}m</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Weight className="w-5 h-5 text-green-400" />
                  <span>{(pokemon.weight / 10).toFixed(1)}kg</span>
                </div>
              </div>

              {!isCaptured && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onCapture(pokemon)}
                  className="flex items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 rounded-full text-white shadow-lg shadow-red-500/50 transition-colors mx-auto md:mx-0"
                >
                  <Plus className="w-5 h-5" />
                  Capture Pokémon
                </motion.button>
              )}

              {isCaptured && (
                <div className="flex items-center gap-2 px-6 py-3 bg-green-500/20 border border-green-500 rounded-full text-green-400 mx-auto md:mx-0 w-fit">
                  <Check className="w-5 h-5" />
                  In Your Collection
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="p-8">
          <h3 className="text-2xl text-white mb-6">Base Stats</h3>
          <div className="space-y-4">
            {pokemon.stats.map((stat) => {
              const percentage = (stat.base_stat / maxStat) * 100;
              const statName = stat.stat.name
                .split('-')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');

              return (
                <div key={stat.stat.name}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-300 capitalize">{statName}</span>
                    <span className="text-white">{stat.base_stat}</span>
                  </div>
                  <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className={`h-full ${STAT_COLORS[stat.stat.name] || 'bg-slate-600'} rounded-full`}
                    ></motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Abilities Section */}
        <div className="px-8 pb-8">
          <h3 className="text-2xl text-white mb-4">Abilities</h3>
          <div className="flex gap-3 flex-wrap">
            {pokemon.abilities.map(({ ability }) => (
              <div
                key={ability.name}
                className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 capitalize"
              >
                {ability.name.replace('-', ' ')}
              </div>
            ))}
          </div>
        </div>

        {/* Field Notes Section */}
        {capturedData?.fieldNotes && (
          <div className="px-8 pb-8">
            <h3 className="text-2xl text-white mb-4">Field Notes</h3>
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
              <p className="text-slate-300 italic">{capturedData.fieldNotes}</p>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
