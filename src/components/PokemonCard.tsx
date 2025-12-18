import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Pokemon, User } from '../App';
import { Check, Plus, Volume2 } from 'lucide-react';

interface PokemonCardProps {
  pokemon: Pokemon;
  onClick: (pokemon: Pokemon) => void;
  onCapture: () => void;
  isCaptured: boolean;
  user: User | null;
  biome?: string;
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

const TYPE_GRADIENTS: { [key: string]: string } = {
  normal: 'from-gray-400/20 to-gray-500/20',
  fire: 'from-red-500/20 to-orange-600/20',
  water: 'from-blue-500/20 to-cyan-600/20',
  electric: 'from-yellow-400/20 to-yellow-500/20',
  grass: 'from-green-500/20 to-emerald-600/20',
  ice: 'from-cyan-300/20 to-blue-400/20',
  fighting: 'from-orange-700/20 to-red-700/20',
  poison: 'from-purple-500/20 to-purple-700/20',
  ground: 'from-yellow-700/20 to-yellow-900/20',
  flying: 'from-indigo-400/20 to-blue-500/20',
  psychic: 'from-pink-500/20 to-purple-500/20',
  bug: 'from-lime-500/20 to-green-600/20',
  rock: 'from-yellow-800/20 to-gray-700/20',
  ghost: 'from-purple-700/20 to-indigo-900/20',
  dragon: 'from-indigo-600/20 to-purple-700/20',
  dark: 'from-gray-800/20 to-black/20',
  steel: 'from-gray-500/20 to-gray-600/20',
  fairy: 'from-pink-300/20 to-pink-500/20',
};

const BIOME_GLOWS: { [key: string]: { color: string; shadow: string } } = {
  forest: {
    color: 'rgba(34, 197, 94, 0.4)',
    shadow: '0 0 30px rgba(34, 197, 94, 0.6), 0 0 60px rgba(34, 197, 94, 0.3), inset 0 0 20px rgba(34, 197, 94, 0.1)'
  },
  cave: {
    color: 'rgba(147, 51, 234, 0.4)',
    shadow: '0 0 30px rgba(147, 51, 234, 0.6), 0 0 60px rgba(147, 51, 234, 0.3), inset 0 0 20px rgba(147, 51, 234, 0.1)'
  },
  sea: {
    color: 'rgba(6, 182, 212, 0.4)',
    shadow: '0 0 30px rgba(6, 182, 212, 0.6), 0 0 60px rgba(6, 182, 212, 0.3), inset 0 0 20px rgba(6, 182, 212, 0.1)'
  }
};

export function PokemonCard({ pokemon, onClick, onCapture, isCaptured, user, biome }: PokemonCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const primaryType = pokemon.types[0].type.name;
  const gradient = TYPE_GRADIENTS[primaryType] || TYPE_GRADIENTS.normal;

  const playSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (pokemon.cries?.latest) {
      const audio = new Audio(pokemon.cries.latest);
      audio.volume = 0.3;
      audio.play();
    }
  };

  const handleCapture = (e: React.MouseEvent) => {
    e.stopPropagation();
    onCapture();
  };

  const imageUrl = pokemon.sprites.other.home?.front_default ||
                   pokemon.sprites.other['official-artwork']?.front_default ||
                   pokemon.sprites.front_default;

  // Get biome glow effect
  const biomeGlow = biome && BIOME_GLOWS[biome] ? BIOME_GLOWS[biome] : null;

  return (
    <motion.div
      whileHover={{ 
        scale: 1.05,
        rotateY: 5,
        z: 50
      }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Biome Glow Ring */}
      {biomeGlow && (
        <motion.div
          className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle, ${biomeGlow.color} 0%, transparent 70%)`,
          }}
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}

      <div
        onClick={() => onClick(pokemon)}
        className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-2xl p-6 cursor-pointer overflow-hidden border border-white/10 shadow-2xl glass-card-hover"
        style={{
          boxShadow: biomeGlow 
            ? `${biomeGlow.shadow}, 0 10px 40px ${TYPE_COLORS[primaryType]}33, 0 0 0 1px ${TYPE_COLORS[primaryType]}22`
            : `0 10px 40px ${TYPE_COLORS[primaryType]}33, 0 0 0 1px ${TYPE_COLORS[primaryType]}22`,
        }}
      >
        {/* Glass effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
        
        {/* Captured badge */}
        {isCaptured && (
          <div className="absolute top-3 right-3 z-10 bg-green-500 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1 shadow-lg font-pokemon-body">
            <Check className="w-3 h-3" />
            Captured
          </div>
        )}

        {/* Pokemon Image */}
        <div className="relative pt-8 pb-4 px-4">
          <div className="relative w-full aspect-square flex items-center justify-center">
            {imageUrl ? (
              <motion.img
                src={imageUrl}
                alt={pokemon.name}
                className="w-full h-full object-contain drop-shadow-2xl"
                animate={{
                  y: isHovered ? [-5, 0, -5] : 0,
                }}
                transition={{
                  duration: 2,
                  repeat: isHovered ? Infinity : 0,
                  ease: "easeInOut",
                }}
              />
            ) : (
              <div className="w-full h-full bg-slate-800/50 rounded-lg flex items-center justify-center">
                <span className="text-slate-500">No image</span>
              </div>
            )}
          </div>

          {/* Sound button */}
          {pokemon.cries?.latest && (
            <button
              onClick={playSound}
              className="absolute top-2 left-2 p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors"
            >
              <Volume2 className="w-4 h-4 text-white" />
            </button>
          )}
        </div>

        {/* Info Section */}
        <div className="relative bg-slate-950/60 backdrop-blur-sm p-4 border-t border-white/10">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <div className="text-slate-400 text-sm">#{pokemon.id.toString().padStart(3, '0')}</div>
              <h3 className="text-xl text-white capitalize">{pokemon.name}</h3>
            </div>
            
            {!isCaptured && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleCapture}
                className="p-2 bg-red-500 hover:bg-red-600 rounded-full text-white shadow-lg shadow-red-500/50 transition-colors"
                title={user ? 'Capture' : 'Login to capture'}
              >
                <Plus className="w-5 h-5" />
              </motion.button>
            )}
          </div>

          <div className="flex gap-2 flex-wrap">
            {pokemon.types.map(({ type }) => (
              <span
                key={type.name}
                className={`${TYPE_COLORS[type.name]} text-white text-xs px-3 py-1 rounded-full shadow-lg`}
              >
                {type.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}