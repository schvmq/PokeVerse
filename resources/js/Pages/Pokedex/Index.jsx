import { Head, Link } from '@inertiajs/react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useState, useRef } from 'react';
import HeroSection from './HeroSection';

export default function Index({ pokemons = [] }) {
    const [flippedCards, setFlippedCards] = useState(new Set());

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.1
            }
        }
    };

    const cardVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100
            }
        }
    };

    const handleCardClick = (index) => {
        setFlippedCards(prev => {
            const newSet = new Set(prev);
            if (newSet.has(index)) {
                newSet.delete(index);
            } else {
                newSet.add(index);
            }
            return newSet;
        });
    };

    return (
        <>
            <Head title="Discover" />
            <main className="min-h-screen p-6">
                <HeroSection />

                <motion.section
                    aria-labelledby="discover-heading"
                    className="mt-10"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    <motion.h2
                        id="discover-heading"
                        className="text-3xl font-bold mb-6 text-pokemon-dark"
                        variants={cardVariants}
                    >
                        Discover Pokémon
                    </motion.h2>
                    <motion.div
                        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                        variants={containerVariants}
                    >
                        {Array.from({ length: 8 }).map((_, i) => {
                            const isFlipped = flippedCards.has(i);
                            const cardRef = useRef(null);
                            const isInView = useInView(cardRef, { once: true, margin: "-100px" });

                            return (
                                <motion.div
                                    ref={cardRef}
                                    key={i}
                                    className="relative w-full h-80 cursor-pointer"
                                    initial={{ y: 50, opacity: 0 }}
                                    animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
                                    transition={{
                                        duration: 0.6,
                                        delay: i * 0.1,
                                        ease: "easeOut"
                                    }}
                                    style={{ perspective: "1000px" }}
                                    whileHover={{ scale: 1.05, y: -10 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleCardClick(i)}
                                >
                                    <motion.div
                                        className="relative w-full h-full"
                                        initial={false}
                                        animate={{ rotateY: isFlipped ? 180 : 0 }}
                                        transition={{ duration: 0.6, type: "spring", stiffness: 300, damping: 30 }}
                                        style={{ transformStyle: "preserve-3d" }}
                                    >
                                        {/* Front of card */}
                                        <motion.article
                                            className="absolute inset-0 rounded-xl border border-gray-200 bg-white p-6 shadow-pokemon hover:shadow-pokemon-lg transition-all duration-300 backface-hidden"
                                            style={{ backfaceVisibility: "hidden" }}
                                        >
                                            <div className="h-32 bg-gradient-to-br from-pokemon-blue to-pokemon-teal rounded-lg mb-4 flex items-center justify-center">
                                                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                                                    <span className="text-2xl">#{String(i + 1).padStart(3, '0')}</span>
                                                </div>
                                            </div>
                                            <h3 className="text-xl font-bold text-pokemon-dark mb-2">Pokémon {i + 1}</h3>
                                            <p className="text-sm text-gray-600 mb-3">Discover this amazing Pokémon and its unique abilities.</p>
                                            <div className="flex items-center justify-between">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pokemon-green/10 text-pokemon-green">
                                                    Grass
                                                </span>
                                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </div>
                                        </motion.article>

                                        {/* Back of card */}
                                        <motion.article
                                            className="absolute inset-0 rounded-xl border border-gray-200 bg-gradient-to-br from-pokemon-red to-pokemon-orange p-6 shadow-pokemon backface-hidden"
                                            style={{
                                                backfaceVisibility: "hidden",
                                                transform: "rotateY(180deg)"
                                            }}
                                        >
                                            <div className="h-32 bg-white/20 rounded-lg mb-4 flex items-center justify-center">
                                                <div className="text-center">
                                                    <div className="text-3xl font-bold text-white mb-2">Stats</div>
                                                    <div className="text-sm text-white/80">Click to flip back</div>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex justify-between text-white">
                                                    <span>HP:</span>
                                                    <span className="font-bold">{45 + i * 10}</span>
                                                </div>
                                                <div className="flex justify-between text-white">
                                                    <span>Attack:</span>
                                                    <span className="font-bold">{49 + i * 5}</span>
                                                </div>
                                                <div className="flex justify-between text-white">
                                                    <span>Defense:</span>
                                                    <span className="font-bold">{49 + i * 3}</span>
                                                </div>
                                                <div className="flex justify-between text-white">
                                                    <span>Speed:</span>
                                                    <span className="font-bold">{45 + i * 7}</span>
                                                </div>
                                            </div>
                                            <div className="mt-4 text-center">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/20 text-white">
                                                    Click to flip back
                                                </span>
                                            </div>
                                        </motion.article>
                                    </motion.div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </motion.section>

                <motion.section
                    aria-labelledby="explore-heading"
                    className="mt-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.5 }}
                >
                    <h2 id="explore-heading" className="text-2xl font-semibold mb-4">Explore more</h2>
                    <div className="flex gap-4 flex-wrap">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link href={route('pokedex.evolution')} className="rounded-lg border px-4 py-3 hover:bg-pokemon-blue hover:text-white transition-colors">Evolution</Link>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link href={route('pokedex.regions')} className="rounded-lg border px-4 py-3 hover:bg-pokemon-blue hover:text-white transition-colors">Regions</Link>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link href={route('pokedex.myteam')} className="rounded-lg border px-4 py-3 hover:bg-pokemon-blue hover:text-white transition-colors">My Team (CRUD)</Link>
                        </motion.div>
                    </div>
                </motion.section>
            </main>
        </>
    );
}
