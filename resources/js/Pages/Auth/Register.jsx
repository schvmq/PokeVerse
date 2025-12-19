import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pokemon-red via-pokemon-yellow to-pokemon-blue px-6 py-12 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    className="absolute top-10 right-10 w-24 h-24 bg-pokemon-red/20 rounded-full blur-3xl"
                    animate={{ y: [0, 20, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                />
                <motion.div
                    className="absolute bottom-10 left-10 w-32 h-32 bg-pokemon-blue/20 rounded-full blur-3xl"
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 5, repeat: Infinity }}
                />
            </div>

            <motion.div
                className="w-full max-w-md relative z-10"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div className="text-center mb-8" variants={itemVariants}>
                    <motion.div
                        className="inline-block mb-4"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 3, repeat: Infinity }}
                    >
                        <span className="text-6xl">🔥</span>
                    </motion.div>
                    <h1 className="text-5xl font-black text-white drop-shadow-lg mb-2">Join PokeVerse</h1>
                    <p className="text-white/90 text-lg font-semibold">Start your Pokémon journey today</p>
                </motion.div>

                <motion.div
                    className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 border-2 border-white/30"
                    variants={itemVariants}
                >
                    <Head title="Register" />

                    <form onSubmit={submit} className="space-y-5">
                        <motion.div variants={itemVariants}>
                            <InputLabel htmlFor="name" value="Trainer Name" className="text-pokemon-dark font-bold text-sm" />
                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                className="mt-2 block w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-pokemon-red focus:ring-2 focus:ring-pokemon-red/50 transition-all"
                                placeholder="Enter your trainer name"
                                autoComplete="name"
                                isFocused={true}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />
                            <InputError message={errors.name} className="mt-2 text-red-600 font-semibold" />
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <InputLabel htmlFor="email" value="Email Address" className="text-pokemon-dark font-bold text-sm" />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-2 block w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-pokemon-red focus:ring-2 focus:ring-pokemon-red/50 transition-all"
                                placeholder="trainer@pokeverse.com"
                                autoComplete="username"
                                onChange={(e) => setData('email', e.target.value)}
                                required
                            />
                            <InputError message={errors.email} className="mt-2 text-red-600 font-semibold" />
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <InputLabel htmlFor="password" value="Password" className="text-pokemon-dark font-bold text-sm" />
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-2 block w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-pokemon-red focus:ring-2 focus:ring-pokemon-red/50 transition-all"
                                placeholder="••••••••"
                                autoComplete="new-password"
                                onChange={(e) => setData('password', e.target.value)}
                                required
                            />
                            <InputError message={errors.password} className="mt-2 text-red-600 font-semibold" />
                            <p className="text-xs text-gray-600 mt-2">Must be at least 8 characters</p>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <InputLabel
                                htmlFor="password_confirmation"
                                value="Confirm Password"
                                className="text-pokemon-dark font-bold text-sm"
                            />
                            <TextInput
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="mt-2 block w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-pokemon-red focus:ring-2 focus:ring-pokemon-red/50 transition-all"
                                placeholder="••••••••"
                                autoComplete="new-password"
                                onChange={(e) =>
                                    setData('password_confirmation', e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.password_confirmation}
                                className="mt-2 text-red-600 font-semibold"
                            />
                        </motion.div>

                        <motion.div variants={itemVariants} className="pt-2">
                            <PrimaryButton
                                disabled={processing}
                                className="w-full py-3 bg-gradient-to-r from-pokemon-red to-pokemon-orange text-white font-bold rounded-lg hover:shadow-lg transition-all duration-300"
                            >
                                {processing ? 'Creating account...' : 'Create Account'}
                            </PrimaryButton>
                        </motion.div>
                    </form>

                    <motion.div className="mt-6 text-center" variants={itemVariants}>
                        <p className="text-gray-700 text-sm">
                            Already have an account?{' '}
                            <Link
                                href={route('login')}
                                className="text-pokemon-blue hover:text-pokemon-indigo font-bold underline transition-colors"
                            >
                                Sign in here
                            </Link>
                        </p>
                    </motion.div>
                </motion.div>

                <motion.p className="text-center text-white/80 text-xs mt-6" variants={itemVariants}>
                    © 2025 PokeVerse. All Pokémon © 1995-2025 Nintendo/The Pokémon Company.
                </motion.p>
            </motion.div>
        </div>
    );
}
