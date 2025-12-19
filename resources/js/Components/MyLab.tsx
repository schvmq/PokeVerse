import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CapturedPokemon } from '../App';
import { Search, Trash2, Edit2, Save, X } from 'lucide-react';

interface MyLabProps {
  capturedPokemon: CapturedPokemon[];
  onPokemonClick: (pokemon: any) => void;
  onRelease: (captureId: string) => void;
  onUpdate: (captureId: string, updates: Partial<CapturedPokemon>) => void;
}

export function MyLab({ capturedPokemon, onPokemonClick, onRelease, onUpdate }: MyLabProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editNickname, setEditNickname] = useState('');
  const [editNotes, setEditNotes] = useState('');
  const [releaseConfirm, setReleaseConfirm] = useState<string | null>(null);

  const filteredPokemon = capturedPokemon.filter(c =>
    c.pokemon?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.pokemon_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.nickname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.pokemon_id.toString().includes(searchTerm)
  );

  const startEdit = (captured: CapturedPokemon) => {
    setEditingId(captured.id.toString());
    setEditNickname(captured.nickname || '');
    setEditNotes(captured.field_notes || '');
  };

  const saveEdit = (captureId: string) => {
    onUpdate(captureId, {
      nickname: editNickname || undefined,
      field_notes: editNotes || undefined,
    });
    setEditingId(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditNickname('');
    setEditNotes('');
  };

  const handleRelease = (captureId: string) => {
    onRelease(captureId);
    setReleaseConfirm(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-16 bg-gradient-to-b from-slate-950 via-purple-950/20 to-slate-950"
    >
      {/* Header */}
      <div className="relative py-20 bg-gradient-to-b from-purple-900/20 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center shadow-2xl shadow-purple-500/50">
              <div className="text-3xl">🔬</div>
            </div>
            <h1 className="font-pokemon-title text-5xl md:text-6xl text-white mb-4 tracking-wider">MY RESEARCH LAB</h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto font-pokemon-body">
              Your personal collection of documented Pokémon
            </p>
            <div className="mt-6 text-4xl font-pokemon-title text-purple-400">
              {capturedPokemon.length} <span className="text-2xl">SPECIES</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search your collection..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-900/50 backdrop-blur-xl border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50"
          />
        </div>
      </div>

      {/* Collection Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {filteredPokemon.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🌟</div>
            <h3 className="text-2xl text-slate-300 mb-2">
              {capturedPokemon.length === 0 ? 'No Pokémon Captured Yet' : 'No Results Found'}
            </h3>
            <p className="text-slate-500">
              {capturedPokemon.length === 0
                ? 'Start your journey and capture your first Pokémon!'
                : 'Try a different search term'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredPokemon.map((captured, index) => {
              const isEditing = editingId === captured.id.toString();
              // Use pokemon_name since pokemon object might not be available from backend
              const pokemonName = captured.pokemon_name;
              const pokemonId = captured.pokemon_id;

              return (
                <motion.div
                  key={captured.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-gradient-to-br from-slate-900/50 to-purple-900/20 backdrop-blur-xl rounded-2xl border border-slate-700/50 overflow-hidden shadow-xl hover:shadow-2xl transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row">
                    {/* Image Section */}
                    <div
                      onClick={() => onPokemonClick({ id: pokemonId, name: pokemonName })}
                      className="sm:w-48 p-6 flex items-center justify-center bg-gradient-to-br from-purple-500/10 to-pink-500/10 cursor-pointer hover:from-purple-500/20 hover:to-pink-500/20 transition-colors"
                    >
                      <img
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`}
                        alt={pokemonName}
                        className="w-32 h-32 object-contain drop-shadow-2xl"
                      />
                    </div>

                    {/* Info Section */}
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="text-slate-500 text-sm mb-1">
                            #{pokemonId.toString().padStart(3, '0')}
                          </div>
                          {isEditing ? (
                            <input
                              type="text"
                              value={editNickname}
                              onChange={(e) => setEditNickname(e.target.value)}
                              placeholder={pokemonName}
                              className="w-full text-xl text-white bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 mb-2 capitalize focus:outline-none focus:border-purple-500"
                            />
                          ) : (
                            <h3 className="text-2xl text-white capitalize mb-1">
                              {captured.nickname || pokemonName}
                            </h3>
                          )}
                          {captured.nickname && !isEditing && (
                            <div className="text-slate-400 text-sm capitalize">
                              ({pokemonName})
                            </div>
                          )}
                        </div>

                        {!isEditing && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => startEdit(captured)}
                              className="p-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg text-blue-400 transition-colors"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setReleaseConfirm(captured.id.toString())}
                              className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-red-400 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Types - Remove since types aren't available from backend */}
                      <div className="flex gap-2 mb-4">
                        <span className="bg-slate-700 text-slate-300 text-xs px-3 py-1 rounded-full">
                          Type: Unknown
                        </span>
                      </div>

                      {/* Field Notes */}
                      <div className="mb-4">
                        <label className="text-slate-400 text-sm mb-2 block">Field Notes</label>
                        {isEditing ? (
                          <textarea
                            value={editNotes}
                            onChange={(e) => setEditNotes(e.target.value)}
                            placeholder="Add observations about this Pokémon..."
                            rows={3}
                            className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 resize-none"
                          />
                        ) : (
                          <p className="text-slate-300 text-sm italic">
                            {captured.field_notes || 'No field notes yet. Click edit to add observations.'}
                          </p>
                        )}
                      </div>

                      {/* Status & Date */}
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">
                          Status: <span className="text-green-400">{captured.status}</span>
                        </span>
                        <span className="text-slate-500">
                          {new Date(captured.captured_at).toLocaleDateString()}
                        </span>
                      </div>

                      {/* Edit Actions */}
                      {isEditing && (
                        <div className="flex gap-2 mt-4">
                          <button
                            onClick={() => saveEdit(captured.id.toString())}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg text-white transition-colors"
                          >
                            <Save className="w-4 h-4" />
                            Save
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white transition-colors"
                          >
                            <X className="w-4 h-4" />
                            Cancel
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Release Confirmation */}
                  {releaseConfirm === captured.id.toString() && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="bg-red-950/50 border-t border-red-900/50 p-4"
                    >
                      <p className="text-red-300 text-sm mb-3">
                        Release {captured.nickname || pokemonName} back into the wild?
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleRelease(captured.id.toString())}
                          className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg text-white transition-colors"
                        >
                          Release
                        </button>
                        <button
                          onClick={() => setReleaseConfirm(null)}
                          className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </motion.div>
  );
}