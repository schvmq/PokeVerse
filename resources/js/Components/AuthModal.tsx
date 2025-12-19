import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, User as UserIcon, Mail, Lock, ChevronRight } from 'lucide-react';
import pokeballRealistic from '../../images/pokeball-realistic.png';

interface AuthModalProps {
  mode: 'login' | 'register';
  onClose: () => void;
  onSubmit: (email: string, password: string, name?: string) => void;
  onToggleMode: () => void;
  error?: string | null;
  isLoading?: boolean;
}

export function AuthModal({ 
  mode, 
  onClose, 
  onSubmit, 
  onToggleMode,
  error,
  isLoading 
}: AuthModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [step, setStep] = useState<'initial' | 'form'>('initial');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password, name || undefined);
  };

  // ✅ UPDATED: Removed standard hover:bg-gradient classes to allow for smooth opacity transition
  const buttonBaseClass = "relative w-full py-4 bg-slate-900 rounded-2xl text-white font-bold shadow-lg shadow-red-900/20 transition-all duration-500 overflow-hidden border border-red-500/30 hover:border-red-500/50 hover:shadow-red-600/50 hover:scale-[1.02] tracking-wider text-sm font-pokemon-body group";

  // ✅ NEW: Reusable Fade-In Layer Component
  const SlowFadeGradient = () => (
    <div className="absolute inset-0 bg-gradient-to-r from-red-300 via-red-600 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out" />
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md"
      onClick={onClose}
    >
      <div className={`absolute w-[600px] h-[600px] bg-gradient-to-tr from-red-300/20 to-red-500/20 rounded-full blur-[150px] opacity-40 pointer-events-none translate-y-20`} />

      <motion.div
        initial={{ scale: 0.9, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 30, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md bg-slate-950 backdrop-blur-xl rounded-[2.5rem] border border-red-500/30 overflow-hidden shadow-[0_20px_60px_-15px_rgba(220,38,38,0.5)]"
      >
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-400/50 to-transparent" />

        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-10 p-2 text-slate-400 hover:text-white bg-slate-900/50 hover:bg-red-900/80 rounded-full transition-all border border-slate-800 hover:border-red-500/50"
        >
          <X className="w-5 h-5" />
        </button>

        <AnimatePresence mode="wait">
          {step === 'initial' ? (
            <motion.div 
              key="initial"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              className="p-8 pt-12 text-center relative flex flex-col h-full justify-between"
            >
              <div>
                <div className="relative w-40 h-40 mx-auto mb-8">
                   <div className="absolute inset-0 bg-red-600/20 blur-3xl rounded-full animate-pulse-slow"></div>
                   <motion.img 
                      src={pokeballRealistic} 
                      alt="Poké Ball" 
                      className="w-full h-full object-contain drop-shadow-[0_10px_20px_rgba(220,38,38,0.3)]"
                      animate={{ rotate: 360 }}
                      transition={{ 
                          duration: 8, 
                          repeat: Infinity, 
                          ease: "linear" 
                      }}
                   />
                </div>

                <h2 className="font-pokemon-title text-3xl text-white mb-4 tracking-wide drop-shadow-md">
                  {mode === 'login' ? 'WELCOME BACK!' : 'BEGIN YOUR JOURNEY'}
                </h2>
                <p className="text-slate-400 mb-10 font-pokemon-body text-sm leading-relaxed px-4">
                  {mode === 'login'
                    ? 'Login to access your research collection'
                    : 'Create an account to start capturing Pokémon'}
                </p>
              </div>

              <div>
                <button
                  onClick={() => setStep('form')}
                  className={buttonBaseClass}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                     🎮 Open Poké Ball
                  </span>
                  {/* ✅ Replaced shimmer with Slow Fade Gradient */}
                  <SlowFadeGradient />
                </button>

                <button
                  onClick={onToggleMode}
                  className="w-full mt-6 text-sm text-slate-500 hover:text-white transition-colors font-medium flex items-center justify-center gap-1 group"
                >
                  {mode === 'login' ? "Don't have an account? Register" : 'Already have an account? Login'}
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="form"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              className="p-8 pt-10"
            >
              <div className="text-center mb-6">
                <div className="relative w-24 h-24 mx-auto mb-4">
                    <div className="absolute inset-0 bg-red-600/20 blur-2xl rounded-full animate-pulse-slow"></div>
                    <motion.img 
                        src={pokeballRealistic} 
                        alt="Poké Ball" 
                        className="w-full h-full object-contain drop-shadow-[0_5px_15px_rgba(220,38,38,0.3)]"
                        animate={{ rotate: 360 }}
                        transition={{ 
                            duration: 8, 
                            repeat: Infinity, 
                            ease: "linear" 
                        }}
                    />
                </div>
                <h2 className="text-2xl font-bold text-white tracking-wide uppercase font-pokemon-title">
                  {mode === 'login' ? 'Auth Required' : 'Registration'}
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {mode === 'register' && (
                  <div className="group">
                    <label className="block text-slate-400 text-xs uppercase font-bold tracking-wider mb-2 ml-3">Professor Name</label>
                    <div className="relative">
                      <UserIcon className="absolute left-4 top-4 w-5 h-5 text-slate-500 group-focus-within:text-red-500 transition-colors" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-slate-900 border border-slate-800 rounded-2xl text-white placeholder-slate-600 focus:outline-none focus:border-red-500/80 focus:ring-2 focus:ring-red-500/20 transition-all"
                        placeholder="e.g. Oak"
                        required
                      />
                    </div>
                  </div>
                )}

                <div className="group">
                  <label className="block text-slate-400 text-xs uppercase font-bold tracking-wider mb-2 ml-3">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-4 w-5 h-5 text-slate-500 group-focus-within:text-red-500 transition-colors" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-slate-900 border border-slate-800 rounded-2xl text-white placeholder-slate-600 focus:outline-none focus:border-red-500/80 focus:ring-2 focus:ring-red-500/20 transition-all"
                      placeholder="name@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="group">
                  <label className="block text-slate-400 text-xs uppercase font-bold tracking-wider mb-2 ml-3">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-4 w-5 h-5 text-slate-500 group-focus-within:text-red-500 transition-colors" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-slate-900 border border-slate-800 rounded-2xl text-white placeholder-slate-600 focus:outline-none focus:border-red-500/80 focus:ring-2 focus:ring-red-500/20 transition-all"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>

                <AnimatePresence>
                  {error && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0, marginTop: 0, scale: 0.95 }}
                      animate={{ opacity: 1, height: 'auto', marginTop: 10, scale: 1 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0, scale: 0.95 }}
                      className="overflow-hidden"
                    >
                        <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-2xl flex items-start gap-3 shadow-[inset_0_0_10px_rgba(239,68,68,0.1)]">
                            <div className="w-2 h-2 mt-1.5 rounded-full bg-red-500 animate-pulse shrink-0" />
                            <p className="text-red-200 text-sm font-medium leading-tight">{error}</p>
                        </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="pt-2 space-y-4">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`${buttonBaseClass} disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                        <span className="relative z-10 flex items-center justify-center gap-3">
                            {isLoading ? (
                                <>
                                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Loading...
                                </>
                            ) : (mode === 'login' ? 'Login' : 'Create Account')}
                        </span>
                         {/* ✅ Replaced shimmer with Slow Fade Gradient */}
                         <SlowFadeGradient />
                    </button>

                    <div className="grid grid-cols-2 gap-4">
                        <button
                          type="button"
                          onClick={() => setStep('initial')}
                          className={buttonBaseClass}
                        >
                          <span className="relative z-10">Back</span>
                          {/* ✅ Replaced shimmer with Slow Fade Gradient */}
                          <SlowFadeGradient />
                        </button>
                        
                        <button
                          type="button"
                          onClick={onToggleMode}
                          className={buttonBaseClass}
                        >
                          <span className="relative z-10">{mode === 'login' ? 'Register' : 'Login'}</span>
                          {/* ✅ Replaced shimmer with Slow Fade Gradient */}
                          <SlowFadeGradient />
                        </button>
                    </div>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}