import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function WelcomeLanding({ auth }) {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    const features = [
        {
            title: 'Discover Pokémon',
            description: 'Browse over 1000 Pokémon with detailed stats and information',
            icon: '🔎'
        },
        {
            title: 'Build Your Team',
            description: 'Create custom teams for battles and competitions',
            icon: '⚔️'
        },
        {
            title: 'Track Evolution',
            description: 'Follow complete evolution chains for every Pokémon',
            icon: '✨'
        },
        {
            title: 'Explore Regions',
            description: 'Discover Pokémon from different regions and habitats',
            icon: '🗺️'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-pokemon-yellow via-pokemon-red to-pokemon-blue relative overflow-hidden">
            <Head title="Welcome to PokeVerse" />

            {/* Animated Background Orbs */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    className="absolute top-20 left-10 w-40 h-40 bg-pokemon-yellow/20 rounded-full blur-3xl"
                    animate={{ y: [0, 30, 0] }}
                    transition={{ duration: 5, repeat: Infinity }}
                />
                <motion.div
                    className="absolute bottom-20 right-10 w-48 h-48 bg-pokemon-blue/20 rounded-full blur-3xl"
                    animate={{ y: [0, -30, 0] }}
                    transition={{ duration: 6, repeat: Infinity }}
                />
                <motion.div
                    className="absolute top-40 right-1/3 w-32 h-32 bg-pokemon-red/20 rounded-full blur-3xl"
                    animate={{ x: [0, 20, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                />
            </div>

            {/* Navigation Bar */}
            <motion.nav
                className="relative z-10 flex justify-between items-center px-6 py-6 max-w-7xl mx-auto"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="flex items-center space-x-2">
                    <span className="text-4xl">⚡</span>
                    <h1 className="text-3xl font-black text-white drop-shadow-lg">PokeVerse</h1>
                </div>
                {auth.user ? (
                    <Link
                        href={route('dashboard')}
                        className="px-6 py-2 bg-white text-pokemon-dark font-bold rounded-lg hover:bg-white/90 transition-all duration-300 shadow-lg"
                    >
                        Dashboard
                    </Link>
                ) : (
                    <div className="flex gap-4">
                        <Link
                            href={route('login')}
                            className="px-6 py-2 bg-white text-pokemon-dark font-bold rounded-lg hover:bg-white/90 transition-all duration-300 shadow-lg"
                        >
                            Sign In
                        </Link>
                        <Link
                            href={route('register')}
                            className="px-6 py-2 bg-pokemon-dark text-white font-bold rounded-lg hover:bg-pokemon-dark/80 transition-all duration-300 shadow-lg"
                        >
                            Join Now
                        </Link>
                    </div>
                )}
            </motion.nav>

            {/* Hero Section */}
            <motion.div
                className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 text-center"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div
                    className="mb-8"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                >
                    <span className="text-8xl drop-shadow-lg">🔥</span>
                </motion.div>

                <motion.h2 variants={itemVariants} className="text-6xl lg:text-7xl font-black text-white drop-shadow-lg mb-6">
                    Gotta Catch 'Em All!
                </motion.h2>

                <motion.p
                    variants={itemVariants}
                    className="text-2xl text-white/90 mb-8 max-w-3xl font-semibold"
                >
                    Build your ultimate Pokémon team, explore thousands of species, and become a master trainer in PokeVerse.
                </motion.p>

                {!auth.user && (
                    <motion.div variants={itemVariants} className="flex gap-4 mb-16">
                        <Link
                            href={route('register')}
                            className="px-8 py-4 bg-gradient-to-r from-pokemon-yellow to-pokemon-orange text-pokemon-dark font-bold text-lg rounded-xl hover:shadow-2xl transition-all duration-300 shadow-xl"
                        >
                            Get Started Free →
                        </Link>
                        <Link
                            href={route('login')}
                            className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-bold text-lg rounded-xl hover:bg-white/30 transition-all duration-300 border-2 border-white"
                        >
                            Sign In
                        </Link>
                    </motion.div>
                )}

                {/* Stats */}
                <motion.div variants={itemVariants} className="flex gap-8 justify-center mb-16">
                    <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
                        <div className="text-3xl font-bold text-white">1000+</div>
                        <div className="text-white/80">Pokémon</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
                        <div className="text-3xl font-bold text-white">50+</div>
                        <div className="text-white/80">Regions</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
                        <div className="text-3xl font-bold text-white">∞</div>
                        <div className="text-white/80">Adventures</div>
                    </div>
                </motion.div>
            </motion.div>

            {/* Features Section */}
            <motion.section
                className="relative z-10 py-20 px-6"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                <div className="max-w-7xl mx-auto">
                    <motion.h3 variants={itemVariants} className="text-4xl font-bold text-white text-center mb-12">
                        ⚡ Why Choose PokeVerse?
                    </motion.h3>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{ scale: 1.05, rotateY: 5 }}
                                className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 text-center hover:bg-white/20 transition-all duration-300"
                            >
                                <div className="text-5xl mb-4">{feature.icon}</div>
                                <h4 className="text-xl font-bold text-white mb-3">{feature.title}</h4>
                                <p className="text-white/80">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* CTA Section */}
            <motion.section
                className="relative z-10 py-20 px-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-12 border border-white/20 text-center">
                    <h3 className="text-4xl font-bold text-white mb-6">Ready to Begin Your Journey?</h3>
                    <p className="text-xl text-white/80 mb-8">
                        Join thousands of trainers worldwide and start building your legendary Pokémon team today!
                    </p>
                    {!auth.user && (
                        <div className="flex gap-4 justify-center">
                            <Link
                                href={route('register')}
                                className="px-8 py-3 bg-gradient-to-r from-pokemon-yellow to-pokemon-orange text-pokemon-dark font-bold rounded-lg hover:shadow-2xl transition-all duration-300"
                            >
                                Create Free Account
                            </Link>
                            <Link
                                href={route('login')}
                                className="px-8 py-3 bg-white text-pokemon-dark font-bold rounded-lg hover:bg-white/90 transition-all duration-300"
                            >
                                Sign In
                            </Link>
                        </div>
                    )}
                </div>
            </motion.section>

            {/* Footer */}
            <motion.footer
                className="relative z-10 py-8 px-6 text-center text-white/60 border-t border-white/10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
            >
                <p className="text-sm">
                    © 2025 PokeVerse. All Pokémon © 1995-2025 Nintendo/The Pokémon Company. Not affiliated with official Pokémon.
                </p>
            </motion.footer>
        </div>
    );
}
