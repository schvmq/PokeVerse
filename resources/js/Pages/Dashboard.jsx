import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Dashboard({ auth }) {
    const [teamCount, setTeamCount] = useState(0);

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

    const cardVariants = {
        hover: {
            scale: 1.05,
            transition: { duration: 0.3 }
        }
    };

    const features = [
        {
            title: 'Discover Pokémon',
            description: 'Explore the vast world of Pokémon with detailed information and stats',
            icon: '🔎',
            link: '/',
            color: 'from-blue-400 to-blue-600'
        },
        {
            title: 'Build Your Team',
            description: 'Create and manage your personal Pokémon team for battles',
            icon: '⚔️',
            link: route('team.index'),
            color: 'from-red-400 to-red-600'
        },
        {
            title: 'Evolution Tracker',
            description: 'Track Pokémon evolution chains and transformations',
            icon: '✨',
            link: '/pokedex/evolution',
            color: 'from-purple-400 to-purple-600'
        },
        {
            title: 'Regions Guide',
            description: 'Learn about different Pokémon regions and their habitats',
            icon: '🗺️',
            link: '/pokedex/regions',
            color: 'from-green-400 to-green-600'
        },
    ];

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-800">
                            Welcome, {auth.user.name}! 👋
                        </h2>
                        <p className="text-gray-600 mt-1">Your Pokémon adventure awaits</p>
                    </div>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12 px-6">
                <motion.div
                    className="mx-auto max-w-7xl"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Quick Stats */}
                    <motion.div
                        variants={itemVariants}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
                    >
                        <div className="bg-gradient-to-br from-pokemon-yellow to-pokemon-orange rounded-lg shadow-lg p-6 text-white">
                            <div className="text-4xl font-bold">🎮</div>
                            <h3 className="text-lg font-semibold mt-4">Trainer Level</h3>
                            <p className="text-sm text-white/80 mt-2">Beginner</p>
                        </div>

                        <div className="bg-gradient-to-br from-pokemon-red to-pokemon-pink rounded-lg shadow-lg p-6 text-white">
                            <div className="text-4xl font-bold">👥</div>
                            <h3 className="text-lg font-semibold mt-4">Team Members</h3>
                            <p className="text-2xl font-bold mt-2">0 / 6</p>
                        </div>

                        <div className="bg-gradient-to-br from-pokemon-blue to-pokemon-indigo rounded-lg shadow-lg p-6 text-white">
                            <div className="text-4xl font-bold">⭐</div>
                            <h3 className="text-lg font-semibold mt-4">Pokédex</h3>
                            <p className="text-sm text-white/80 mt-2">0 Caught</p>
                        </div>
                    </motion.div>

                    {/* Welcome Section */}
                    <motion.div variants={itemVariants} className="mb-10">
                        <div className="bg-white rounded-xl shadow-md p-8 border-l-4 border-pokemon-yellow">
                            <h3 className="text-2xl font-bold text-gray-800 mb-3">🌟 Ready to Start?</h3>
                            <p className="text-gray-600 mb-6">
                                Welcome to PokeVerse! Build your ultimate Pokémon team, discover new species,
                                and become a master trainer. Your journey starts here!
                            </p>
                            <Link
                                href="/"
                                className="inline-block bg-gradient-to-r from-pokemon-yellow to-pokemon-orange text-pokemon-dark font-bold py-3 px-6 rounded-lg hover:shadow-lg transition-all duration-300"
                            >
                                Start Discovering →
                            </Link>
                        </div>
                    </motion.div>

                    {/* Features Grid */}
                    <motion.div variants={itemVariants} className="mb-10">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">⚡ Quick Actions</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {features.map((feature, index) => (
                                <motion.a
                                    key={index}
                                    href={feature.link}
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.05 }}
                                    className={`bg-gradient-to-br ${feature.color} rounded-xl shadow-lg p-6 text-white cursor-pointer hover:shadow-xl transition-all duration-300`}
                                >
                                    <div className="text-4xl mb-3">{feature.icon}</div>
                                    <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                                    <p className="text-sm text-white/80">{feature.description}</p>
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Helpful Tips */}
                    <motion.div variants={itemVariants} className="bg-gradient-to-r from-pokemon-indigo/10 to-pokemon-blue/10 rounded-xl p-8 border border-pokemon-blue/20">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">💡 Pro Tips for Trainers</h3>
                        <ul className="space-y-3 text-gray-700">
                            <li className="flex items-start">
                                <span className="text-pokemon-blue font-bold mr-3">•</span>
                                <span>Build a balanced team with different Pokémon types for maximum effectiveness</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-pokemon-blue font-bold mr-3">•</span>
                                <span>Check Pokémon evolution chains to plan your team growth</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-pokemon-blue font-bold mr-3">•</span>
                                <span>Explore different regions to discover unique Pokémon species</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-pokemon-blue font-bold mr-3">•</span>
                                <span>Level up your Pokémon to unlock new moves and abilities</span>
                            </li>
                        </ul>
                    </motion.div>
                </motion.div>
            </div>
        </AuthenticatedLayout>
    );
}
