import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
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
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pokemon-yellow via-pokemon-red to-pokemon-blue px-6 py-12 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    className="absolute top-10 left-10 w-20 h-20 bg-pokemon-yellow/20 rounded-full blur-3xl"
                    animate={{ y: [0, 20, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                />
                <motion.div
                    className="absolute bottom-10 right-10 w-32 h-32 bg-pokemon-blue/20 rounded-full blur-3xl"
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
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                    >
                        <span className="text-6xl">⚡</span>
                    </motion.div>
                    <h1 className="text-5xl font-black text-white drop-shadow-lg mb-2">PokeVerse</h1>
                    <p className="text-white/90 text-lg font-semibold">Welcome Back, Trainer!</p>
                </motion.div>

                <motion.div
                    className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 border-2 border-white/30"
                    variants={itemVariants}
                >
                    <Head title="Log in" />

                    {status && (
                        <motion.div
                            className="mb-6 text-sm font-medium text-green-600 bg-green-50 border-2 border-green-300 rounded-lg p-4"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                        >
                            {status}
                        </motion.div>
                    )}

                    <form onSubmit={submit} className="space-y-5">
                        <motion.div variants={itemVariants}>
                            <InputLabel htmlFor="email" value="Email Address" className="text-pokemon-dark font-bold text-sm" />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-2 block w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-pokemon-yellow focus:ring-2 focus:ring-pokemon-yellow/50 transition-all"
                                placeholder="trainer@pokeverse.com"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) => setData('email', e.target.value)}
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
                                className="mt-2 block w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-pokemon-yellow focus:ring-2 focus:ring-pokemon-yellow/50 transition-all"
                                placeholder="••••••••"
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                            />
                            <InputError message={errors.password} className="mt-2 text-red-600 font-semibold" />
                        </motion.div>

                        <motion.div className="flex items-center justify-between" variants={itemVariants}>
                            <label className="flex items-center cursor-pointer">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) =>
                                        setData('remember', e.target.checked)
                                    }
                                    className="w-5 h-5"
                                />
                                <span className="ms-2 text-sm text-gray-700 font-medium">
                                    Keep me signed in
                                </span>
                            </label>

                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="text-sm text-pokemon-blue hover:text-pokemon-indigo font-semibold underline transition-colors"
                                >
                                    Forgot password?
                                </Link>
                            )}
                        </motion.div>

                        <motion.div variants={itemVariants} className="pt-2">
                            <PrimaryButton
                                disabled={processing}
                                className="w-full py-3 bg-gradient-to-r from-pokemon-yellow to-pokemon-orange text-pokemon-dark font-bold rounded-lg hover:shadow-lg transition-all duration-300"
                            >
                                {processing ? 'Signing in...' : 'Sign In'}
                            </PrimaryButton>
                        </motion.div>
                    </form>

                    <motion.div className="mt-6 text-center" variants={itemVariants}>
                        <p className="text-gray-700 text-sm">
                            New trainer?{' '}
                            <Link
                                href={route('register')}
                                className="text-pokemon-blue hover:text-pokemon-indigo font-bold underline transition-colors"
                            >
                                Create your account
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
