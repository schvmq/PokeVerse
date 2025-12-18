import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

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

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-pokemon px-6 py-12">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-black text-white drop-shadow-lg mb-2">Welcome Back</h1>
                    <p className="text-white/80">Sign in to your PokeVerse account</p>
                </div>

                <div className="bg-white rounded-xl shadow-pokemon-2xl p-8 border border-white/20">
                    <Head title="Log in" />

                    {status && (
                        <div className="mb-6 text-sm font-medium text-green-600 bg-green-50 border border-green-200 rounded-lg p-4">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <InputLabel htmlFor="email" value="Email" className="text-pokemon-dark font-semibold" />

                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) => setData('email', e.target.value)}
                            />

                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="password" value="Password" className="text-pokemon-dark font-semibold" />

                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full"
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                            />

                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) =>
                                        setData('remember', e.target.checked)
                                    }
                                />
                                <span className="ms-2 text-sm text-gray-600">
                                    Remember me
                                </span>
                            </label>

                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="text-sm text-pokemon-blue hover:text-pokemon-indigo underline focus:outline-none focus:ring-2 focus:ring-pokemon-blue focus:ring-offset-2 rounded"
                                >
                                    Forgot password?
                                </Link>
                            )}
                        </div>

                        <div className="flex items-center justify-end">
                            <PrimaryButton disabled={processing}>
                                Sign In
                            </PrimaryButton>
                        </div>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Don't have an account?{' '}
                            <Link href={route('register')} className="text-pokemon-blue hover:text-pokemon-indigo font-medium underline">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
