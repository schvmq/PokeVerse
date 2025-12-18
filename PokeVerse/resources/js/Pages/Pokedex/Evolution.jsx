import { Head, Link } from '@inertiajs/react';

export default function Evolution() {
    return (
        <>
            <Head title="Evolution" />
            <main className="min-h-screen p-6">
                <section aria-labelledby="evolution-heading">
                    <h1 id="evolution-heading" className="text-4xl font-black text-pokemon-dark mb-4">Evolution Chains</h1>
                    <p className="text-lg text-gray-600 mb-8">Explore how Pokémon transform and evolve through different stages</p>

                    <div className="grid gap-8 sm:grid-cols-1 lg:grid-cols-2">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="bg-white rounded-xl shadow-pokemon-lg p-6 border border-gray-100">
                                <h3 className="text-xl font-bold text-pokemon-dark mb-4">Evolution Chain {i + 1}</h3>
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-col items-center">
                                        <div className="w-20 h-20 bg-gradient-to-br from-pokemon-blue to-pokemon-teal rounded-full flex items-center justify-center mb-2 shadow-pokemon">
                                            <span className="text-white font-bold text-sm">Lv. 1</span>
                                        </div>
                                        <span className="text-sm font-medium text-gray-600">Basic</span>
                                    </div>

                                    <div className="flex flex-col items-center px-4">
                                        <svg className="w-8 h-8 text-pokemon-yellow mb-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-xs text-gray-500">Evolves at</span>
                                        <span className="text-xs font-medium text-pokemon-dark">Level 16</span>
                                    </div>

                                    <div className="flex flex-col items-center">
                                        <div className="w-20 h-20 bg-gradient-to-br from-pokemon-green to-pokemon-teal rounded-full flex items-center justify-center mb-2 shadow-pokemon">
                                            <span className="text-white font-bold text-sm">Lv. 16</span>
                                        </div>
                                        <span className="text-sm font-medium text-gray-600">Stage 1</span>
                                    </div>

                                    <div className="flex flex-col items-center px-4">
                                        <svg className="w-8 h-8 text-pokemon-yellow mb-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-xs text-gray-500">Evolves at</span>
                                        <span className="text-xs font-medium text-pokemon-dark">Level 32</span>
                                    </div>

                                    <div className="flex flex-col items-center">
                                        <div className="w-20 h-20 bg-gradient-to-br from-pokemon-purple to-pokemon-pink rounded-full flex items-center justify-center mb-2 shadow-pokemon">
                                            <span className="text-white font-bold text-sm">Lv. 32</span>
                                        </div>
                                        <span className="text-sm font-medium text-gray-600">Stage 2</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8">
                        <Link href={route('pokedex.index')} className="rounded px-3 py-2 border">Back to Discover</Link>
                    </div>
                </section>
            </main>
        </>
    );
}
