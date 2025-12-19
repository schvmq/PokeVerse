import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X } from 'lucide-react';
import professorImage from 'figma:asset/c18cec7d918feb53a71c6f712e03977391b87907.png';

interface AuthModalProps {
  mode: 'login' | 'register';
  onClose: () => void;
  onSubmit: (email: string, password: string, name?: string) => void;
  onToggleMode: () => void;
}

export function AuthModal({ mode, onClose, onSubmit, onToggleMode }: AuthModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [step, setStep] = useState<'initial' | 'form'>('initial');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password, name || undefined);
  };

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
        className="relative w-full max-w-md bg-gradient-to-br from-slate-900 to-slate-950 rounded-3xl shadow-2xl border border-slate-700 overflow-hidden"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-slate-800/80 hover:bg-slate-700 rounded-full text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'initial' ? (
          <div className="p-8 text-center">
            {/* Pokéball Animation */}
            <motion.div
              className="relative w-32 h-32 mx-auto mb-8"
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <img 
                src={professorImage} 
                alt="Professor" 
                className="w-full h-full object-contain pokeball-shadow animate-pulse-glow"
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-red-500/30 to-transparent rounded-full blur-xl"
                animate={{
                  scale: [1, 1.3],
                  opacity: [0.3, 0.6],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  direction: "alternate",
                }}
              />
            </motion.div>

            <h2 className="font-pokemon-title text-3xl text-white mb-4 tracking-wide">
              {mode === 'login' ? 'WELCOME BACK!' : 'BEGIN YOUR JOURNEY'}
            </h2>
            <p className="text-slate-400 mb-8 font-pokemon-body">
              {mode === 'login'
                ? 'Login to access your research collection'
                : 'Create an account to start capturing Pokémon'}
            </p>

            <button
              onClick={() => setStep('form')}
              className="w-full py-4 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 rounded-full text-white shadow-lg shadow-red-500/50 transition-all transform hover:scale-105 font-pokemon-body"
            >
              🎮 Open Poké Ball
            </button>

            <button
              onClick={onToggleMode}
              className="w-full mt-4 text-slate-400 hover:text-white transition-colors font-pokemon-body"
            >
              {mode === 'login' ? "Don't have an account? Register" : 'Already have an account? Login'}
            </button>
          </div>
        ) : (
          <div className="p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg shadow-red-500/50">
                <div className="w-8 h-8 bg-white rounded-full"></div>
              </div>
              <h2 className="text-2xl text-white">
                {mode === 'login' ? 'Login' : 'Register'}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm">
                  {error}
                </div>
              )}
              {mode === 'register' && (
                <div>
                  <label className="block text-slate-400 text-sm mb-2">Professor Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50"
                    placeholder="Oak, Elm, Birch..."
                    required
                  />
                </div>
              )}

              <div>
                <label className="block text-slate-400 text-sm mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50"
                  placeholder="professor@pokeverse.com"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-400 text-sm mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50"
                  placeholder="••••••••"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 rounded-lg text-white shadow-lg shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Loading...' : (mode === 'login' ? 'Login' : 'Create Account')}
              </button>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setStep('initial')}
                  className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 rounded-lg text-white transition-colors"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={onToggleMode}
                  className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 rounded-lg text-white transition-colors"
                >
                  {mode === 'login' ? 'Register' : 'Login'}
                </button>
              </div>
            </form>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}