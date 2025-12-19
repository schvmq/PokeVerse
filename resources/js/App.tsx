import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HomePage } from './Components/HomePage';
import { TheJourney } from './Components/TheJourney';
import { MyLab } from './Components/MyLab';
import { PokemonDetail } from './Components/PokemonDetail';
import { AuthModal } from './Components/AuthModal';
import { Navigation } from './Components/Navigation';
import { CaptureConfirmation } from './Components/CaptureConfirmation';
import { PokeballAnimation } from './Components/PokeballAnimation';
import { Notification } from './Components/Notification';

// ... (Your Interfaces for Pokemon, CapturedPokemon, User remain exactly the same) ...
// For brevity, I am keeping the interfaces implied. If you copy this, keep your interfaces at the top!

export interface Pokemon {
    id: number;
    name: string;
    sprites: {
        front_default: string;
        other: {
            'official-artwork': { front_default: string; };
            home: { front_default: string; };
            dream_world?: { front_default: string; };
        };
    };
    types: Array<{ type: { name: string; }; }>;
    stats: Array<{ base_stat: number; stat: { name: string; }; }>;
    height: number;
    weight: number;
    abilities: Array<{ ability: { name: string; }; }>;
    cries?: { latest?: string; legacy?: string; };
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

  // ✅ NEW: Auth specific state
  const [authError, setAuthError] = useState<string | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  // Notification State
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error' | 'info';
  } | null>(null);

  const showNotification = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setNotification({ message, type });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  useEffect(() => {
    const storedUser = localStorage.getItem('pokeverse_user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setCurrentView('journey');
      fetchCapturedPokemon(userData.id);
    }
  }, []);

  const fetchCapturedPokemon = async (userId: string) => {
    try {
      const response = await fetch('/api/pokemon', {
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
    // ✅ Clear previous errors and start loading
    setAuthError(null);
    setIsAuthLoading(true);

    try {
      const isRegister = !!name;
      const endpoint = isRegister ? '/api/auth/register' : '/api/auth/login';
      
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
        setAuthError(null); // Clear error on success
        
        showNotification(`Welcome back, ${newUser.name}!`, 'success');
        setShowPokeballAnimation(true);
        fetchCapturedPokemon(newUser.id);
      } else {
        // ✅ Send error to MODAL, not global notification
        setAuthError(data.message || 'Authentication failed. Please check your credentials.');
      }
    } catch (err) {
      console.error('Authentication error:', err);
      // ✅ Send error to MODAL
      setAuthError('Unable to connect to server. Please try again.');
    } finally {
      // ✅ Stop loading
      setIsAuthLoading(false);
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
    showNotification('Logged out successfully', 'info');
  };

  // ... (handleCapture, handleRelease, handleUpdate, isCaptured remain exactly the same as previous) ...
  // Keeping them brief here to focus on the Auth changes. 
  // IMPORTANT: When you paste this, make sure to keep your existing functions for these!
  
  const handleCapture = async (pokemon: Pokemon) => {
    if (!user) { setShowAuthModal(true); return; }
    try {
      const token = localStorage.getItem('pokeverse_token');
      if (!token) { setShowAuthModal(true); return; }
      const response = await fetch('/api/pokemon', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ pokemon_id: pokemon.id, pokemon_name: pokemon.name }),
      });
      const data = await response.json();
      if (response.ok) {
        setCapturedPokemon([...capturedPokemon, data.data]);
        
        
        setCaptureConfirmation(pokemon);
        setTimeout(() => setCaptureConfirmation(null), 3000);
      } else { showNotification(data.message, 'error'); }
    } catch (err) { showNotification('Error capturing Pokemon', 'error'); }
  };

  const handleRelease = async (captureId: string) => {
      if (!user) { setShowAuthModal(true); return; }
      const token = localStorage.getItem('pokeverse_token');
      if (!token) { setShowAuthModal(true); return; }

      try {
        const response = await fetch(`/api/pokemon/${captureId}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` },
        });
        const data = await response.json();

        if (response.ok) {
          setCapturedPokemon(prev => prev.filter(c => c.id !== Number(captureId)));
          showNotification('Pokémon released', 'success');
        } else {
          showNotification(data.message || 'Failed to release Pokémon', 'error');
        }
      } catch (err) {
        showNotification('Error releasing Pokémon', 'error');
      }
  };

  const handleUpdate = async (captureId: string, updates: Partial<CapturedPokemon>) => {
      if (!user) { setShowAuthModal(true); return; }
      const token = localStorage.getItem('pokeverse_token');
      if (!token) { setShowAuthModal(true); return; }

      try {
        const response = await fetch(`/api/pokemon/${captureId}`, {
          method: 'PUT',
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updates),
        });
        const data = await response.json();

        if (response.ok) {
          setCapturedPokemon(prev =>
            prev.map(c => c.id === Number(captureId) ? data.data : c)
          );
          showNotification('Changes saved', 'success');
        } else {
          showNotification(data.message || 'Failed to save changes', 'error');
        }
      } catch (err) {
        showNotification('Error updating Pokémon', 'error');
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
          setAuthError(null); // Clear error when opening
          setShowAuthModal(true);
        }}
        onRegister={() => {
          setAuthMode('register');
          setAuthError(null); // Clear error when opening
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
              setAuthError(null);
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
            // Add your handlers here if missing in previous copy
            onRelease={handleRelease} 
            onUpdate={handleUpdate}
          />
        ) : (
          <HomePage 
            key="home" 
            onGetStarted={() => {
              setAuthMode('register');
              setAuthError(null);
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
            onToggleMode={() => {
                setAuthMode(authMode === 'login' ? 'register' : 'login');
                setAuthError(null); // Clear error when switching modes
            }}
            // ✅ PASSING NEW PROPS HERE
            error={authError}
            isLoading={isAuthLoading}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {captureConfirmation && (
          <CaptureConfirmation pokemon={captureConfirmation} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification(null)}
          />
        )}
      </AnimatePresence>

      <PokeballAnimation
        show={showPokeballAnimation}
        onComplete={handleAnimationComplete}
      />
    </div>
  );
}