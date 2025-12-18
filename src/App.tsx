import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HomePage } from './components/HomePage';
import { TheJourney } from './components/TheJourney';
import { MyLab } from './components/MyLab';
import { PokemonDetail } from './components/PokemonDetail';
import { AuthModal } from './components/AuthModal';
import { Navigation } from './components/Navigation';
import { CaptureConfirmation } from './components/CaptureConfirmation';
import { PokeballAnimation } from './components/PokeballAnimation';

export interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    other: {
      'official-artwork': {
        front_default: string;
      };
      home: {
        front_default: string;
      };
      dream_world?: {
        front_default: string;
      };
    };
  };
  types: Array<{
    type: {
      name: string;
    };
  }>;
  stats: Array<{
    base_stat: number;
    stat: {
      name: string;
    };
  }>;
  height: number;
  weight: number;
  abilities: Array<{
    ability: {
      name: string;
    };
  }>;
  cries?: {
    latest?: string;
    legacy?: string;
  };
}

export interface CapturedPokemon {
  id: string;
  pokemonId: number;
  pokemon: Pokemon;
  nickname?: string;
  fieldNotes?: string;
  capturedAt: string;
  status: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'journey' | 'lab'>('home');
  const [user, setUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [capturedPokemon, setCapturedPokemon] = useState<CapturedPokemon[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [captureConfirmation, setCaptureConfirmation] = useState<Pokemon | null>(null);
  const [showPokeballAnimation, setShowPokeballAnimation] = useState(false);

  // Load user and captured Pokémon from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('pokeverse_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setCurrentView('journey'); // If user exists, start at journey
    }
    const storedCaptured = localStorage.getItem('pokeverse_captured');
    if (storedCaptured) {
      setCapturedPokemon(JSON.parse(storedCaptured));
    }
  }, []);

  const handleLogin = (email: string, password: string, name?: string) => {
    const newUser: User = {
      id: Date.now().toString(),
      email,
      name: name || email.split('@')[0],
    };
    setUser(newUser);
    localStorage.setItem('pokeverse_user', JSON.stringify(newUser));
    setShowAuthModal(false);
    
    // Show pokeball animation, then navigate to journey
    setShowPokeballAnimation(true);
  };

  const handleAnimationComplete = () => {
    setShowPokeballAnimation(false);
    setCurrentView('journey');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('pokeverse_user');
    setCurrentView('home');
  };

  const handleCapture = (pokemon: Pokemon) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    const newCapture: CapturedPokemon = {
      id: Date.now().toString(),
      pokemonId: pokemon.id,
      pokemon,
      capturedAt: new Date().toISOString(),
      status: 'Healthy',
    };

    const updated = [...capturedPokemon, newCapture];
    setCapturedPokemon(updated);
    localStorage.setItem('pokeverse_captured', JSON.stringify(updated));
    setCaptureConfirmation(pokemon);
    setTimeout(() => setCaptureConfirmation(null), 3000);
  };

  const handleRelease = (captureId: string) => {
    const updated = capturedPokemon.filter(c => c.id !== captureId);
    setCapturedPokemon(updated);
    localStorage.setItem('pokeverse_captured', JSON.stringify(updated));
  };

  const handleUpdate = (captureId: string, updates: Partial<CapturedPokemon>) => {
    const updated = capturedPokemon.map(c =>
      c.id === captureId ? { ...c, ...updates } : c
    );
    setCapturedPokemon(updated);
    localStorage.setItem('pokeverse_captured', JSON.stringify(updated));
  };

  const isCaptured = (pokemonId: number) => {
    return capturedPokemon.some(c => c.pokemonId === pokemonId);
  };

  return (
    <div className="min-h-screen bg-slate-950 font-pokemon-body">
      <Navigation
        currentView={currentView}
        onViewChange={setCurrentView}
        user={user}
        onLogin={() => {
          setAuthMode('login');
          setShowAuthModal(true);
        }}
        onRegister={() => {
          setAuthMode('register');
          setShowAuthModal(true);
        }}
        onLogout={handleLogout}
        capturedCount={capturedPokemon.length}
      />

      <AnimatePresence mode="wait">
        {currentView === 'home' ? (
          <HomePage 
            key="home" 
            onGetStarted={() => {
              setAuthMode('register');
              setShowAuthModal(true);
            }}
            onExploreJourney={() => setCurrentView('journey')}
          />
        ) : currentView === 'journey' ? (
          <TheJourney
            key="journey"
            onPokemonClick={setSelectedPokemon}
            onCapture={handleCapture}
            isCaptured={isCaptured}
            user={user}
          />
        ) : (
          <MyLab
            key="lab"
            capturedPokemon={capturedPokemon}
            onPokemonClick={setSelectedPokemon}
            onRelease={handleRelease}
            onUpdate={handleUpdate}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedPokemon && (
          <PokemonDetail
            pokemon={selectedPokemon}
            onClose={() => setSelectedPokemon(null)}
            onCapture={handleCapture}
            isCaptured={isCaptured(selectedPokemon.id)}
            user={user}
            capturedData={capturedPokemon.find(c => c.pokemonId === selectedPokemon.id)}
            onUpdate={handleUpdate}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showAuthModal && (
          <AuthModal
            mode={authMode}
            onClose={() => setShowAuthModal(false)}
            onSubmit={handleLogin}
            onToggleMode={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {captureConfirmation && (
          <CaptureConfirmation pokemon={captureConfirmation} />
        )}
      </AnimatePresence>

      <PokeballAnimation
        show={showPokeballAnimation}
        onComplete={handleAnimationComplete}
      />
    </div>
  );
}