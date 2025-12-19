import { motion } from 'framer-motion';

export default function HeroSection() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.2,
                staggerChildren: 0.3
            }
        }
    };

    const titleVariants = {
        hidden: { opacity: 0, y: 50, rotateX: -15 },
        visible: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

    const subtitleVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                delay: 0.3
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.9 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    return (
        <motion.section
            aria-labelledby="hero-title"
            className="relative rounded-xl bg-gradient-pokemon p-8 overflow-hidden"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative max-w-6xl mx-auto text-center">
                <motion.h1
                    id="hero-title"
                    className="text-5xl font-black text-white drop-shadow-lg mb-4"
                    variants={titleVariants}
                >
                    PokeVerse — Discover Pokémon
                </motion.h1>
                <motion.p
                    className="text-xl text-white/90 drop-shadow mb-8 max-w-2xl mx-auto"
                    variants={subtitleVariants}
                >
                    Explore the amazing world of Pokémon with our comprehensive database
                </motion.p>
                <motion.div
                    className="grid gap-6 sm:grid-cols-2 max-w-4xl mx-auto"
                    variants={containerVariants}
                >
                    <motion.div
                        className="rounded-xl border border-white/20 p-6 bg-white/10 backdrop-blur-sm"
                        variants={cardVariants}
                        whileHover={{
                            scale: 1.05,
                            rotateY: 5,
                            boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
                        }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">Search & Filter</h3>
                        <p className="text-white/80 text-sm">Find your favorite Pokémon by type, region, or abilities</p>
                    </motion.div>
                    <motion.div
                        className="rounded-xl border border-white/20 p-6 bg-white/10 backdrop-blur-sm"
                        variants={cardVariants}
                        whileHover={{
                            scale: 1.05,
                            rotateY: -5,
                            boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
                        }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">Evolution Chains</h3>
                        <p className="text-white/80 text-sm">Discover how Pokémon transform and grow stronger</p>
                    </motion.div>
                </motion.div>
            </div>
        </motion.section>
    );
}
