import React from 'react';
import { motion } from 'motion/react';
import { ChevronDown, Sparkles, Map, Book } from 'lucide-react';
import professorImage from '../../images/new-professor.png';
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
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 pt-28 sm:pt-24">
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

        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto flex flex-col items-center justify-center min-h-screen">
          
          {/* ✅ FIXED: Professor Container Sizing */}
          {/* Changed w-40 h-40 to h-64/h-96 so he fits vertically without cutting off */}
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 200, 
              damping: 20,
              delay: 0.2 
            }}
            className="relative h-40 md:h-80 w-auto mx-auto mb-8 flex justify-center"
          >
            <motion.img
              src={professorImage}
              alt="Professor"
              className="h-full w-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] professor-glow"
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                duration: 4,
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
            <h1 className="font-pokemon-title text-4xl sm:text-6xl lg:text-8xl xl:text-9xl mb-4 tracking-wider leading-tight text-balance">
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
            <p className="font-pokemon text-xl md:text-3xl text-white mb-2 tracking-widest">
              THE PROFESSOR'S FIELD LOG
            </p>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-base sm:text-lg md:text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed text-balance px-4 sm:px-0"
          >
            Embark on an epic research expedition. Explore diverse habitats, document rare species, 
            and build your ultimate Pokémon collection.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-5 justify-center items-center w-full"
          >
            <motion.button
              onClick={onGetStarted}
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(239, 68, 68, 0.6)" }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-10 py-5 bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 rounded-full text-white font-pokemon-title text-xl shadow-2xl shadow-red-900/50 overflow-hidden w-full sm:w-auto"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.5 }}
              />
              <span className="relative z-10 flex items-center justify-center gap-3">
                <Sparkles className="w-6 h-6" />
                START YOUR JOURNEY
              </span>
            </motion.button>

            <motion.button
              onClick={onExploreJourney}
              whileHover={{ scale: 1.05, borderColor: "#3b82f6", backgroundColor: "rgba(30, 41, 59, 0.9)" }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-slate-900/60 backdrop-blur-sm border-2 border-slate-700 rounded-full text-white font-pokemon-title text-xl transition-all w-full sm:w-auto"
            >
              <span className="flex items-center justify-center gap-3">
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
            className="mt-14 md:mt-22 mb-4"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center text-slate-500 hover:text-white transition-colors cursor-pointer"
            >
              <span className="text-xs uppercase tracking-widest mb-2 font-bold">Scroll to Begin</span>
              <ChevronDown className="w-6 h-6" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-32 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-pokemon-title text-5xl md:text-6xl text-center text-white mb-20 drop-shadow-lg"
          >
            YOUR RESEARCH AWAITS
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-10">
            {/* Feature 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -15, scale: 1.03 }}
              className="bg-gradient-to-br from-emerald-950 to-slate-900 backdrop-blur-md border border-emerald-800/50 rounded-3xl p-10 text-center shadow-xl hover:shadow-emerald-900/30 transition-all group"
            >
              <div className="w-20 h-20 bg-emerald-900/50 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 border border-emerald-700/30">
                <Map className="w-10 h-10 text-emerald-400" />
              </div>
              <h3 className="font-pokemon-title text-2xl text-white mb-4 tracking-wide">EXPLORE HABITATS</h3>
              <p className="text-slate-400 leading-relaxed">
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
              whileHover={{ y: -15, scale: 1.03 }}
              className="bg-gradient-to-br from-blue-950 to-slate-900 backdrop-blur-md border border-blue-800/50 rounded-3xl p-10 text-center shadow-xl hover:shadow-blue-900/30 transition-all group"
            >
              <div className="w-20 h-20 bg-blue-900/50 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 border border-blue-700/30">
                <Sparkles className="w-10 h-10 text-blue-400" />
              </div>
              <h3 className="font-pokemon-title text-2xl text-white mb-4 tracking-wide">CAPTURE & COLLECT</h3>
              <p className="text-slate-400 leading-relaxed">
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
              whileHover={{ y: -15, scale: 1.03 }}
              className="bg-gradient-to-br from-purple-950 to-slate-900 backdrop-blur-md border border-purple-800/50 rounded-3xl p-10 text-center shadow-xl hover:shadow-purple-900/30 transition-all group"
            >
              <div className="w-20 h-20 bg-purple-900/50 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 border border-purple-700/30">
                <Book className="w-10 h-10 text-purple-400" />
              </div>
              <h3 className="font-pokemon-title text-2xl text-white mb-4 tracking-wide">MANAGE YOUR LAB</h3>
              <p className="text-slate-400 leading-relaxed">
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