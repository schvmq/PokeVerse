import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PokeballAnimationProps {
  show: boolean;
  onComplete: () => void;
}

export function PokeballAnimation({ show, onComplete }: PokeballAnimationProps) {
  const [stage, setStage] = useState<'appearing' | 'shaking' | 'opening' | 'complete'>('appearing');

  useEffect(() => {
    if (!show) return;

    // Reset stage when animation starts
    setStage('appearing');

    // Appearing stage
    const appearTimer = setTimeout(() => {
      setStage('shaking');
    }, 800);

    // Shaking stage
    const shakingTimer = setTimeout(() => {
      setStage('opening');
    }, 2300);

    // Opening stage
    const openingTimer = setTimeout(() => {
      setStage('complete');
    }, 3800);

    // Complete - trigger callback
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 4500);

    return () => {
      clearTimeout(appearTimer);
      clearTimeout(shakingTimer);
      clearTimeout(openingTimer);
      clearTimeout(completeTimer);
    };
  }, [show, onComplete]);

  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950"
      >
        {/* Radial Gradient Background */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle at center, #1e293b 0%, #0f172a 50%, #000000 100%)',
              'radial-gradient(circle at center, #dc2626 0%, #991b1b 50%, #000000 100%)',
              'radial-gradient(circle at center, #fbbf24 0%, #f59e0b 50%, #dc2626 100%)',
            ]
          }}
          transition={{ duration: 3, times: [0, 0.5, 1] }}
        />

        {/* Particle Effects */}
        {stage === 'opening' && (
          <>
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                initial={{
                  x: '50vw',
                  y: '50vh',
                  scale: 0,
                }}
                animate={{
                  x: `${50 + (Math.random() - 0.5) * 100}vw`,
                  y: `${50 + (Math.random() - 0.5) * 100}vh`,
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1.5,
                  delay: Math.random() * 0.5,
                  ease: "easeOut",
                }}
              />
            ))}
          </>
        )}

        {/* Pokeball Container */}
        <div className="relative w-64 h-64 flex items-center justify-center">
          {/* Glow Effect */}
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={
              stage === 'shaking' || stage === 'opening'
                ? {
                    boxShadow: [
                      '0 0 0px rgba(239, 68, 68, 0)',
                      '0 0 60px rgba(239, 68, 68, 0.8)',
                      '0 0 0px rgba(239, 68, 68, 0)',
                    ],
                  }
                : {}
            }
            transition={{
              duration: 0.8,
              repeat: stage === 'shaking' ? 2 : 0,
            }}
          />

          {/* Pokeball Bottom Half */}
          <motion.div
            className="absolute w-64 h-32 bottom-0 left-0 bg-gradient-to-b from-white to-gray-200 rounded-b-full border-4 border-slate-900"
            style={{ transformOrigin: 'top center' }}
            animate={
              stage === 'appearing'
                ? { scale: [0, 1], rotate: [0, 360] }
                : stage === 'shaking'
                ? {
                    rotate: [0, -10],
                    x: [0, -5],
                  }
                : stage === 'opening'
                ? { rotateX: [0, -120], y: [0, 30], opacity: [1, 0] }
                : {}
            }
            transition={
              stage === 'appearing'
                ? { duration: 0.8, type: "spring", stiffness: 200 }
                : stage === 'shaking'
                ? { duration: 0.6, repeat: 2 }
                : { duration: 0.8, ease: "easeOut" }
            }
          />

          {/* Pokeball Top Half */}
          <motion.div
            className="absolute w-64 h-32 top-0 left-0 bg-gradient-to-b from-red-600 to-red-500 rounded-t-full border-4 border-slate-900"
            style={{ transformOrigin: 'bottom center' }}
            animate={
              stage === 'appearing'
                ? { scale: [0, 1], rotate: [0, -360] }
                : stage === 'shaking'
                ? {
                    rotate: [0, 10],
                    x: [0, 5],
                  }
                : stage === 'opening'
                ? { rotateX: [0, 120], y: [0, -30], opacity: [1, 0] }
                : {}
            }
            transition={
              stage === 'appearing'
                ? { duration: 0.8, type: "spring", stiffness: 200 }
                : stage === 'shaking'
                ? { duration: 0.6, repeat: 2 }
                : { duration: 0.8, ease: "easeOut" }
            }
          />

          {/* Center Band */}
          <motion.div
            className="absolute w-64 h-8 bg-slate-900 top-1/2 -translate-y-1/2 left-0 z-10"
            animate={
              stage === 'shaking'
                ? {
                    x: [0, -2, 2, -2, 2, 0],
                  }
                : stage === 'opening'
                ? { scale: [1, 0], opacity: [1, 0] }
                : {}
            }
            transition={
              stage === 'shaking'
                ? { duration: 0.6, repeat: 2 }
                : { duration: 0.8 }
            }
          />

          {/* Center Button */}
          <motion.div
            className="absolute w-16 h-16 bg-white rounded-full border-4 border-slate-900 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center"
            animate={
              stage === 'appearing'
                ? { scale: [0, 1] }
                : stage === 'shaking'
                ? {
                    rotate: [0, -10],
                  }
                : stage === 'opening'
                ? {
                    scale: [1, 0],
                    opacity: [1, 0],
                  }
                : {}
            }
            transition={
              stage === 'appearing'
                ? { duration: 0.8, delay: 0.4, type: "spring" }
                : stage === 'shaking'
                ? { duration: 0.6, repeat: 2 }
                : { duration: 0.8 }
            }
          >
            <div className="w-8 h-8 bg-slate-200 rounded-full"></div>
          </motion.div>

          {/* Light Burst Effect */}
          {stage === 'opening' && (
            <motion.div
              className="absolute inset-0 bg-white rounded-full"
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 4, opacity: 0 }}
              transition={{ duration: 1 }}
            />
          )}
        </div>

        {/* Welcome Text */}
        {stage === 'opening' && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="absolute bottom-20 text-center"
          >
            <p className="font-pokemon-title text-4xl text-white text-shadow-glow">
              WELCOME PROFESSOR!
            </p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="font-pokemon-body text-xl text-slate-300 mt-4"
            >
              Preparing your research station...
            </motion.p>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}