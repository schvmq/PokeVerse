import React from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { Pokemon } from '../App';
import professorImage from 'figma:asset/c18cec7d918feb53a71c6f712e03977391b87907.png';

interface CaptureConfirmationProps {
  pokemon: Pokemon;
}

export function CaptureConfirmation({ pokemon }: CaptureConfirmationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="fixed top-24 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-2xl shadow-2xl shadow-green-500/50 flex items-center gap-4 border border-green-400">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="w-12 h-12 bg-white rounded-full flex items-center justify-center"
        >
          <Check className="w-6 h-6 text-green-500" />
        </motion.div>
        
        <div className="font-pokemon-body">
          <div className="text-sm opacity-90">Pokémon Captured!</div>
          <div className="capitalize">{pokemon.name} added to your collection</div>
        </div>

        <motion.img
          src={professorImage}
          alt="Professor"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
          }}
          className="w-10 h-10 ml-4 animate-shake professor-glow"
        />
      </div>
    </motion.div>
  );
}