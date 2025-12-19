import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Compass, FlaskConical, LogIn, LogOut, UserPlus } from 'lucide-react';
import { User } from '../App';
import professorImage from '../../images/new-professor.png';

interface NavigationProps {
  currentView: 'home' | 'journey' | 'lab';
  onViewChange: (view: 'home' | 'journey' | 'lab') => void;
  user: User | null;
  onLogin: () => void;
  onRegister: () => void;
  onLogout: () => void;
  capturedCount: number;
}

export function Navigation({
  currentView,
  onViewChange,
  user,
  onLogin,
  onRegister,
  onLogout,
  capturedCount,
}: NavigationProps) {
  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
          duration: 0.6
        }}
        className="fixed top-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-xl border-b border-slate-800 shadow-2xl"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              className="flex items-center gap-3 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              onClick={() => onViewChange('home')}
            >
              <motion.img
                src={professorImage}
                alt="Professor"
                className="w-12 h-12 drop-shadow-lg professor-glow"
              />
              <div>
                <h1 className="font-pokemon-title text-2xl text-white tracking-wider">POKEVERSE</h1>
                <p className="text-xs text-slate-400 font-pokemon-body">Professor's Field Log</p>
              </div>
            </motion.div>

            {/* Navigation + Auth */}
            <div className="flex items-center gap-4">
              {/* Navigation Buttons */}
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  onClick={() => onViewChange('journey')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg smooth-transition ${
                    currentView === 'journey'
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/50 shadow-lg shadow-blue-500/20'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Compass className="w-4 h-4" />
                  <span className="hidden sm:inline">The Journey</span>
                </motion.button>
                <motion.button
                  whileHover={user ? { scale: 1.05, y: -2 } : {}}
                  whileTap={user ? { scale: 0.95 } : {}}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  onClick={() => {
                    if (user) {
                      onViewChange('lab');
                    }
                  }}
                  disabled={!user}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg smooth-transition ${
                    currentView === 'lab' && user
                      ? 'bg-purple-500/20 text-purple-400 border border-purple-500/50 shadow-lg shadow-purple-500/20'
                      : user ? 'text-slate-400 hover:text-white hover:bg-slate-800'
                      : 'text-slate-600 opacity-50 cursor-not-allowed'
                  }`}
                  title={!user ? 'Login to access your collection' : ''}
                >
                  <FlaskConical className="w-4 h-4" />
                  <span className="hidden sm:inline">My Lab</span>
                  {user && capturedCount > 0 && (
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="bg-purple-500 text-white text-xs px-2 py-0.5 rounded-full"
                    >
                      {capturedCount}
                    </motion.span>
                  )}
                </motion.button>
              </div>

              {/* Auth Buttons */}
              <div className="flex items-center gap-3 border-l border-slate-700 pl-4">
                {user ? (
                  <>
                    <span className="hidden sm:inline text-slate-400 text-sm">
                      Prof. {user.name}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      onClick={onLogout}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 smooth-transition"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="hidden sm:inline">Logout</span>
                    </motion.button>
                  </>
                ) : (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      onClick={onLogin}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-slate-300 hover:bg-slate-800 smooth-transition"
                    >
                      <LogIn className="w-4 h-4" />
                      <span className="hidden sm:inline">Login</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      onClick={onRegister}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 smooth-transition shadow-lg shadow-blue-500/30"
                    >
                      <UserPlus className="w-4 h-4" />
                      <span className="hidden sm:inline">Register</span>
                    </motion.button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.nav>
    </>
  );
}