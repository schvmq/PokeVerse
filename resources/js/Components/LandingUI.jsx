// resources/js/Components/LandingUI.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from '@inertiajs/react';

export default function LandingUI() {
    // Animation variants for staggered entrance
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-[#0f1016] to-black text-white relative overflow-hidden">
            
            {/* Background Atmosphere */}
            <div className="absolute inset-0 bg-[url('/images/grid-pattern.png')] opacity-10 pointer-events-none"></div>
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-red-600/20 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]"></div>

            {/* Navigation */}
            <nav className="relative z-20 flex justify-between items-center p-6 max-w-7xl mx-auto">
                <div className="flex items-center gap-3">
                    <img src="/images/professor-icon.png" alt="Logo" className="h-10 w-10" />
                    <div className="flex flex-col">
                        <span className="font-bold text-lg tracking-wider">POKÉVERSE</span>
                        <span className="text-xs text-gray-500 uppercase">Professor's Field Log</span>
                    </div>
                </div>
                <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
                    <a href="#" className="hover:text-white transition-colors">The Journey</a>
                    <a href="#" className="hover:text-white transition-colors">My Lab</a>
                </div>
                <div className="flex gap-4">
                    <Link href="/login" className="px-5 py-2 text-sm font-medium hover:text-white text-gray-300 transition-colors">Login</Link>
                    <Link href="/register" className="px-5 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-500 rounded-lg shadow-lg shadow-blue-600/30 transition-all">Register</Link>
                </div>
            </nav>

            {/* Hero Content */}
            <motion.div 
                variants={container}
                initial="hidden"
                animate="show"
                className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] text-center px-4"
            >
                <motion.h1 variants={item} className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter mb-4 text-balance px-4">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-red-400 to-orange-500 drop-shadow-sm">
                        POKEVERSE
                    </span>
                </motion.h1>

                <motion.h2 variants={item} className="text-lg sm:text-xl md:text-3xl font-mono text-gray-200 mb-8 uppercase tracking-widest border-b-2 border-red-500/50 pb-2 px-4 text-balance">
                    The Professor's Field Log
                </motion.h2>

                <motion.p variants={item} className="max-w-2xl text-gray-400 text-base sm:text-lg md:text-xl leading-relaxed mb-12 px-4 text-balance">
                    Embark on an epic research expedition. Explore diverse habitats, 
                    document rare species, and build your ultimate 
                    <span className="text-white font-bold"> Pokémon collection</span>.
                </motion.p>

                <motion.div variants={item} className="flex flex-col md:flex-row gap-6">
                    <Link href="/journey/start" className="group relative px-8 py-4 bg-transparent overflow-hidden rounded-full border border-red-500/50 hover:border-red-500 transition-all">
                        <div className="absolute inset-0 w-0 bg-gradient-to-r from-red-600 to-red-500 transition-all duration-[250ms] ease-out group-hover:w-full opacity-20"></div>
                        <span className="relative flex items-center gap-2 font-bold tracking-wide">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                            START YOUR JOURNEY
                        </span>
                    </Link>

                    <button className="px-8 py-4 rounded-full border border-gray-700 hover:border-gray-500 text-gray-400 hover:text-white hover:bg-white/5 transition-all font-medium tracking-wide">
                        EXPLORE AS GUEST
                    </button>
                </motion.div>
            </motion.div>
        </div>
    );
}