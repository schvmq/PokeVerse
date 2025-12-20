import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Pokemon, User } from '../App';
import { PokemonCard } from './PokemonCard';
import { Search, Filter, ChevronDown } from 'lucide-react'; // ✅ Added ChevronDown
import { useDebounce } from '../hooks/useDebounce';
import professorImage from '../../images/new-professor.png';
import labBackground from 'figma:asset/5a81c25dacf74242b16c39e3cf09df0ba12282e6.png';
import forestBg from 'figma:asset/2b84ded071dcef7f4ea02b8c2ce18a381622c489.png';
import caveBg from 'figma:asset/b8f858327b6e7cd50d46c7e98510a5ae40036b46.png';
import seaBg from 'figma:asset/ff335723fab416ade41a8886bbf0301d177db430.png';
import leafImage from 'figma:asset/85072bfee49294a13a11363345bc9e206cd6e563.png';

interface TheJourneyProps {
  onPokemonClick: (pokemon: Pokemon) => void;
  onCapture: (pokemon: Pokemon) => void;
  isCaptured: (pokemonId: number) => boolean;
  user: User | null;
}

interface Habitat {
  name: string;
  title: string;
  description: string;
  gradient: string;
  pokemonIds: number[];
}

const HABITATS: Habitat[] = [
  {
    name: 'forest',
    title: 'Verdant Forest',
    description: 'A lush ecosystem teeming with Grass and Bug-type Pokémon',
    gradient: 'from-emerald-900 via-green-900 to-teal-900',
    pokemonIds: [1, 2, 3, 25, 152, 153, 154, 387, 388, 389, 495, 496, 497],
  },
  {
    name: 'cave',
    title: 'Mysterious Caverns',
    description: 'Dark depths where Rock and Ground-type Pokémon dwell',
    gradient: 'from-slate-900 via-gray-900 to-stone-900',
    pokemonIds: [74, 75, 76, 95, 185, 213, 296, 297, 304, 305, 306, 524, 525],
  },
  {
    name: 'sea',
    title: 'Azure Depths',
    description: 'Crystal waters home to Water-type Pokémon',
    gradient: 'from-blue-950 via-cyan-900 to-sky-900',
    pokemonIds: [7, 8, 9, 54, 55, 116, 117, 129, 130, 134, 258, 259, 260, 318],
  },
];

export function TheJourney({ onPokemonClick, onCapture, isCaptured, user }: TheJourneyProps) {
  const [pokemonData, setPokemonData] = useState<{ [habitat: string]: Pokemon[] }>({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    fetchPokemonForHabitats();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const fetchPokemonForHabitats = async () => {
    setLoading(true);
    const data: { [habitat: string]: Pokemon[] } = {};

    for (const habitat of HABITATS) {
      const promises = habitat.pokemonIds.map(id =>
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(res => res.json())
      );
      data[habitat.name] = await Promise.all(promises);
    }

    setPokemonData(data);
    setLoading(false);
  };

  const filterPokemon = (pokemon: Pokemon[]) => {
    return pokemon.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
                            p.id.toString().includes(debouncedSearchTerm);
      const matchesType = !selectedType || p.types.some(t => t.type.name === selectedType);
      return matchesSearch && matchesType;
    });
  };

  const allTypes = Array.from(
    new Set(
      Object.values(pokemonData)
        .flat()
        .flatMap(p => p.types.map(t => t.type.name))
    )
  ).sort();

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-16"
    >
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-950 via-slate-900 to-emerald-900 overflow-hidden pt-20 sm:pt-16">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url(${labBackground})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'repeat',
            imageRendering: 'pixelated'
          }}
        ></div>
        
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/70 to-emerald-900/80"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20"></div>
        
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="relative z-10 text-center px-4"
        >
          <motion.div
            animate={{
              scale: [1, 1.05],
              rotate: [0, 5],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              direction: "alternate",
            }}
            className="h-56 md:h-72 w-auto mx-auto mb-8 animate-float flex justify-center"
          >
            <img 
              src={professorImage} 
              alt="Professor" 
              className="h-full w-auto object-contain drop-shadow-2xl professor-glow"
            />
          </motion.div>
          
          <h1 className="font-pokemon-title text-4xl sm:text-6xl md:text-8xl text-white mb-6 tracking-wider text-balance px-4">
            THE PROFESSOR'S
            <br />
            <motion.span
              className="inline-block mt-2 font-pokemon text-3xl sm:text-4xl md:text-6xl tracking-widest bg-gradient-to-r from-yellow-400 via-red-500 to-blue-500 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 5, repeat: Infinity }}
              style={{ backgroundSize: '200% 200%' }}
            >
              FIELD LOG
            </motion.span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto mb-8 px-4 text-balance">
            Journey through diverse habitats. Document rare species. Build your research collection.
          </p>
          
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-slate-400"
          >
            <div className="text-sm mb-2">Scroll to begin your expedition</div>
            <div className="w-6 h-10 border-2 border-slate-400 rounded-full mx-auto flex justify-center pt-2">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-1.5 bg-slate-400 rounded-full"
              ></motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ✅ FIXED: Search & Filter Consistency */}
      <div className="sticky top-16 z-40 bg-slate-950/95 backdrop-blur-xl border-b border-slate-800 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search Input */}
            <motion.div 
              className="flex-1 relative"
              whileFocus={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              {/* Icon Container: Absolute Top/Bottom + Flex Center = Perfect Vertical Center */}
              <div className="absolute left-4 top-0 bottom-0 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Search by name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                // Added h-12 for fixed height and pl-12 for aligned icon spacing
                className="w-full h-12 pl-12 pr-4 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 smooth-transition"
              />
            </motion.div>
            
            {/* Filter Dropdown */}
            <motion.div 
              className="relative sm:w-48"
              whileFocus={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              {/* Filter Icon Container */}
              <div className="absolute left-4 top-0 bottom-0 flex items-center pointer-events-none">
                <Filter className="w-5 h-5 text-slate-400" />
              </div>
              {/* Added ChevronDown icon explicitly */}
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
              
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                // Added h-12 for fixed height matching search, and pl-12
                className="w-full h-12 pl-12 pr-10 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 appearance-none cursor-pointer smooth-transition"
              >
                <option value="">All Types</option>
                {allTypes.map(type => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Habitats */}
      {loading ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-950 to-slate-900"
        >
          <div className="text-center">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
            />
            <motion.p 
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-slate-400 font-pokemon-body"
            >
              Loading ecosystems...
            </motion.p>
          </div>
        </motion.div>
      ) : (
        HABITATS.map((habitat, index) => {
          const filteredPokemon = filterPokemon(pokemonData[habitat.name] || []);
          
          if (filteredPokemon.length === 0 && (debouncedSearchTerm || selectedType)) {
            return null;
          }

          return (
            <motion.section
              key={habitat.name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              className="min-h-screen relative py-20 bg-cover bg-center md:bg-fixed"
              style={habitat.name === 'forest' ? {
                backgroundImage: `url(${forestBg})`,
              } : habitat.name === 'cave' ? {
                backgroundImage: `url(${caveBg})`,
              } : habitat.name === 'sea' ? {
                backgroundImage: `url(${seaBg})`,
              } : undefined}
            >
              {(habitat.name === 'forest' || habitat.name === 'cave') && (
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50"></div>
              )}
              {habitat.name === 'sea' && (
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30"></div>
              )}

              {habitat.name === 'forest' && (
                <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
                  {[...Array(20)].map((_, i) => (
                    <motion.img
                      key={i}
                      src={leafImage}
                      alt="leaf"
                      className="absolute"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `-5%`,
                        width: `${24 + Math.random() * 16}px`,
                        height: 'auto',
                        imageRendering: 'pixelated',
                        filter: `drop-shadow(0 0 8px rgba(34, 197, 94, 0.6)) brightness(${0.8 + Math.random() * 0.4})`,
                      }}
                      animate={{
                        y: ['0vh', '110vh'],
                        x: [0, Math.sin(i) * 100, Math.cos(i) * 60, 0],
                        rotate: [0, 360 * (i % 2 === 0 ? 1 : -1)],
                        opacity: [0, 1, 1, 0.7, 0],
                      }}
                      transition={{
                        duration: 8 + Math.random() * 6,
                        repeat: Infinity,
                        delay: Math.random() * 8,
                        ease: "linear",
                      }}
                    />
                  ))}
                </div>
              )}

              {habitat.name === 'cave' && (
                <>
                  <div className="absolute inset-0 bg-black/70 z-[1] pointer-events-none"></div>
                  <div 
                    className="absolute w-96 h-96 rounded-full pointer-events-none z-[2] transition-all duration-100 ease-out"
                    style={{
                      left: mousePosition.x - 192,
                      top: mousePosition.y - 192,
                      background: 'radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.15) 30%, transparent 70%)',
                      boxShadow: '0 0 100px 50px rgba(255, 255, 255, 0.1)',
                      filter: 'blur(8px)',
                    }}
                  />
                  <div 
                    className="absolute w-48 h-48 rounded-full pointer-events-none z-[3] transition-all duration-100 ease-out"
                    style={{
                      left: mousePosition.x - 96,
                      top: mousePosition.y - 96,
                      background: 'radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%)',
                      filter: 'blur(2px)',
                    }}
                  />
                </>
              )}

              {habitat.name === 'sea' && (
                <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
                  {[...Array(50)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-0.5 rounded-full"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `-5%`,
                        height: `${20 + Math.random() * 30}px`,
                        background: 'linear-gradient(to bottom, rgba(6, 182, 212, 0.6), rgba(6, 182, 212, 0.1))',
                        boxShadow: '0 0 5px rgba(6, 182, 212, 0.5)',
                      }}
                      animate={{
                        y: ['0vh', '110vh'],
                        opacity: [0, 1, 1, 0],
                      }}
                      transition={{
                        duration: 1 + Math.random() * 1.5,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                        ease: "linear",
                      }}
                    />
                  ))}
                </div>
              )}
              
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="text-center mb-16"
                >
                  <h2 className="font-pokemon-title text-5xl md:text-6xl text-white mb-4 tracking-wider text-shadow-glow drop-shadow-lg">
                    {habitat.title.toUpperCase()}
                  </h2>
                  <p className="text-xl text-white drop-shadow-lg font-pokemon-body bg-black/30 backdrop-blur-sm inline-block px-6 py-2 rounded-full">
                    {habitat.description}
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredPokemon.map((pokemon) => (
                    <div key={pokemon.id} className="h-full">
                      <PokemonCard
                        pokemon={pokemon}
                        onClick={() => onPokemonClick(pokemon)}
                        onCapture={() => onCapture(pokemon)}
                        isCaptured={isCaptured(pokemon.id)}
                        user={user}
                        biome={habitat.name}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>
          );
        })
      )}
    </motion.div>
  );
}