import React from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { Pokemon } from '../App';
import pokeballRealistic from '../../images/pokeball-realistic.png';

interface CaptureConfirmationProps {
  pokemon: Pokemon;
}

export function CaptureConfirmation({ pokemon }: CaptureConfirmationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="fixed top-20 right-6 z-50"
    >
      <div className="bg-emerald-400 text-emerald-950 px-6 py-4 rounded-2xl shadow-xl shadow-emerald-800/30 flex items-center gap-4 border border-emerald-500">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="w-12 h-12 bg-white rounded-full flex items-center justify-center"
        >
          <Check className="w-6 h-6 text-green-500" />
        </motion.div>
        
        <div className="font-pokemon-body">
          <div className="text-sm text-emerald-950/80">Pokémon Captured!</div>
          <div className="capitalize text-emerald-950">{pokemon.name} added to your collection</div>
        </div>

        <motion.img
          src={pokeballRealistic}
          alt="Poké Ball"
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