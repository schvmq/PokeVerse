import React from 'react';
import { motion } from 'motion/react';
import { ChevronDown, Sparkles, Map, Book } from 'lucide-react';
import professorImage from 'figma:asset/c18cec7d918feb53a71c6f712e03977391b87907.png';
import labBackground from 'figma:asset/5a81c25dacf74242b16c39e3cf09df0ba12282e6.png';
import bikingGif from 'figma:asset/811757e09f4bef2468adf2baac2da198555e8011.png';

interface HomePageProps {
  onGetStarted: () => void;
  onExploreJourney: () => void;
}

export function HomePage({ onGetStarted, onExploreJourney }: HomePageProps) {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Bike GIF Background */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url(${bikingGif})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'repeat-x',
            imageRendering: 'pixelated'
          }}
        ></div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/50 to-slate-950/90"></div>

        {/* Animated Gradient Background */}
        <motion.div
          className="absolute inset-0 mix-blend-multiply"
          animate={{
            background: [
              'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #166534 100%)',
              'linear-gradient(135deg, #1e293b 0%, #0f172a 50%, #0369a1 100%)',
              'linear-gradient(135deg, #166534 0%, #0369a1 50%, #0f172a 100%)',
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>

        {/* Floating Pokeball Particles */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 bg-white/10 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              x: [null, Math.random() * window.innerWidth],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}

        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          {/* Professor Logo */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 200, 
              damping: 20,
              delay: 0.2 
            }}
            className="w-40 h-40 mx-auto mb-8"
          >
            <motion.img
              src={professorImage}
              alt="Professor"
              className="w-full h-full object-contain drop-shadow-2xl professor-glow"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <h1 className="font-pokemon-title text-7xl md:text-9xl mb-4 tracking-wider">
              <motion.span
                className="inline-block bg-gradient-to-r from-yellow-400 via-red-500 to-blue-500 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 5, repeat: Infinity }}
                style={{ backgroundSize: '200% 200%' }}
              >
                POKEVERSE
              </motion.span>
            </h1>
            <p className="font-pokemon text-2xl md:text-4xl text-white mb-2">
              THE PROFESSOR'S FIELD LOG
            </p>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto"
          >
            Embark on an epic research expedition. Explore diverse habitats, document rare species, 
            and build your ultimate Pokémon collection.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              onClick={onGetStarted}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 rounded-full text-white font-pokemon-title text-xl shadow-2xl shadow-red-500/50 overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.5 }}
              />
              <span className="relative z-10 flex items-center gap-2">
                <Sparkles className="w-6 h-6" />
                START YOUR JOURNEY
              </span>
            </motion.button>

            <motion.button
              onClick={onExploreJourney}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-slate-800/80 backdrop-blur-sm border-2 border-slate-600 hover:border-blue-500 rounded-full text-white font-pokemon-title text-xl transition-all"
            >
              <span className="flex items-center gap-2">
                <Map className="w-6 h-6" />
                EXPLORE AS GUEST
              </span>
            </motion.button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-20"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center text-slate-400"
            >
              <span className="text-sm mb-2 font-pokemon-body">Discover More</span>
              <ChevronDown className="w-6 h-6 animate-bounce" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-pokemon-title text-5xl md:text-6xl text-center text-white mb-16"
          >
            YOUR RESEARCH AWAITS
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-gradient-to-br from-emerald-900/50 to-green-900/30 backdrop-blur-sm border border-emerald-700/50 rounded-2xl p-8 text-center"
            >
              <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Map className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="font-pokemon-title text-2xl text-white mb-4">EXPLORE HABITATS</h3>
              <p className="text-slate-300">
                Journey through lush forests, mysterious caves, and azure depths. Each habitat 
                offers unique Pokémon species to discover.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border border-blue-700/50 rounded-2xl p-8 text-center"
            >
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="font-pokemon-title text-2xl text-white mb-4">CAPTURE & COLLECT</h3>
              <p className="text-slate-300">
                Build your personal Pokédex. Capture Pokémon, give them nicknames, and document 
                your findings with detailed field notes.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-gradient-to-br from-purple-900/50 to-pink-900/30 backdrop-blur-sm border border-purple-700/50 rounded-2xl p-8 text-center"
            >
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Book className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="font-pokemon-title text-2xl text-white mb-4">MANAGE YOUR LAB</h3>
              <p className="text-slate-300">
                Access your personal laboratory to review captured Pokémon, update research notes, 
                and manage your growing collection.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}