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
  id: number;
  user_id: number;
  pokemon_id: number;
  pokemon_name: string;
  nickname?: string;
  field_notes?: string;
  captured_at: string;
  status: string;
  pokemon?: Pokemon;
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

  // Load user from localStorage and fetch their captured Pokemon
  useEffect(() => {
    const storedUser = localStorage.getItem('pokeverse_user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setCurrentView('journey');
      
      // Fetch user's captured Pokemon from API
      fetchCapturedPokemon(userData.id);
    }
  }, []);

  const fetchCapturedPokemon = async (userId: string) => {
    try {
      const response = await fetch('http://localhost:8000/api/pokemon', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('pokeverse_token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCapturedPokemon(data.data || []);
      }
    } catch (err) {
      console.error('Failed to fetch captured Pokemon:', err);
    }
  };

  const handleLogin = async (email: string, password: string, name?: string) => {
    try {
      const isRegister = !!name;
      const endpoint = isRegister ? 'http://localhost:8000/api/auth/register' : 'http://localhost:8000/api/auth/login';
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          ...(name && { name }),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const newUser: User = {
          id: data.user.id.toString(),
          email: data.user.email,
          name: data.user.name,
        };
        
        setUser(newUser);
        localStorage.setItem('pokeverse_user', JSON.stringify(newUser));
        localStorage.setItem('pokeverse_token', data.token);
        setShowAuthModal(false);
        
        // Show pokeball animation, then navigate to journey
        setShowPokeballAnimation(true);
        
        // Fetch user's captured Pokemon
        fetchCapturedPokemon(newUser.id);
      } else {
        alert(data.message || 'Authentication failed');
      }
    } catch (err) {
      console.error('Authentication error:', err);
      alert('Error connecting to server');
    }
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

  const handleCapture = async (pokemon: Pokemon) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    try {
      const token = localStorage.getItem('pokeverse_token');
      if (!token) {
        setShowAuthModal(true);
        return;
      }

      const response = await fetch('http://localhost:8000/api/pokemon', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pokemon_id: pokemon.id,
          pokemon_name: pokemon.name,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setCapturedPokemon([...capturedPokemon, data.data]);
        setCaptureConfirmation(pokemon);
        setTimeout(() => setCaptureConfirmation(null), 3000);
      } else {
        alert(data.message || 'Failed to capture Pokemon');
      }
    } catch (err) {
      console.error('Failed to capture Pokemon:', err);
      alert('Error capturing Pokemon');
    }
  };

  const handleRelease = async (captureId: string) => {
    try {
      const response = await fetch(`http://localhost:8000/api/pokemon/${captureId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('pokeverse_token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const updated = capturedPokemon.filter(c => c.id !== parseInt(captureId));
        setCapturedPokemon(updated);
      } else {
        alert('Failed to release Pokemon');
      }
    } catch (err) {
      console.error('Failed to release Pokemon:', err);
      alert('Error releasing Pokemon');
    }
  };

  const handleUpdate = async (captureId: string, updates: Partial<CapturedPokemon>) => {
    try {
      const response = await fetch(`http://localhost:8000/api/pokemon/${captureId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('pokeverse_token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      if (response.ok) {
        const data = await response.json();
        const updated = capturedPokemon.map(c =>
          c.id.toString() === captureId ? data.data : c
        );
        setCapturedPokemon(updated);
      } else {
        alert('Failed to update Pokemon');
      }
    } catch (err) {
      console.error('Failed to update Pokemon:', err);
      alert('Error updating Pokemon');
    }
  };

  const isCaptured = (pokemonId: number) => {
    return capturedPokemon.some(c => c.pokemon_id === pokemonId);
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
        ) : currentView === 'lab' && user ? (
          <MyLab
            key="lab"
            capturedPokemon={capturedPokemon}
            onPokemonClick={setSelectedPokemon}
            onRelease={handleRelease}
            onUpdate={handleUpdate}
          />
        ) : (
          // Redirect to home if trying to access lab without auth
          <HomePage 
            key="home" 
            onGetStarted={() => {
              setAuthMode('register');
              setShowAuthModal(true);
            }}
            onExploreJourney={() => setCurrentView('journey')}
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
            capturedData={capturedPokemon.find(c => c.pokemon_id === selectedPokemon.id)}
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