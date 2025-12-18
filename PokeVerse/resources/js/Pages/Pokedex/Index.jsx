import { Head, Link } from '@inertiajs/react';
import HeroSection from './HeroSection';

export default function Index({ pokemons = [] }) {
    return (
        <>
            <Head title="Discover" />
            <main className="min-h-screen p-6">
                <HeroSection />

                <section aria-labelledby="discover-heading" className="mt-10">
                    <h2 id="discover-heading" className="text-3xl font-bold mb-6 text-pokemon-dark">Discover Pokémon</h2>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <article key={i} className="group rounded-xl border border-gray-200 bg-white p-6 shadow-pokemon hover:shadow-pokemon-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                                <div className="h-32 bg-gradient-to-br from-pokemon-blue to-pokemon-teal rounded-lg mb-4 flex items-center justify-center">
                                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                                        <span className="text-2xl">#{String(i + 1).padStart(3, '0')}</span>
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-pokemon-dark mb-2 group-hover:text-pokemon-blue transition-colors">Pokémon {i + 1}</h3>
                                <p className="text-sm text-gray-600 mb-3">Discover this amazing Pokémon and its unique abilities.</p>
                                <div className="flex items-center justify-between">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pokemon-green/10 text-pokemon-green">
                                        Grass
                                    </span>
                                    <svg className="w-5 h-5 text-gray-400 group-hover:text-pokemon-blue transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                <section aria-labelledby="explore-heading" className="mt-12">
                    <h2 id="explore-heading" className="text-2xl font-semibold mb-4">Explore more</h2>
                    <div className="flex gap-4 flex-wrap">
                        <Link href={route('pokedex.evolution')} className="rounded-lg border px-4 py-3">Evolution</Link>
                        <Link href={route('pokedex.regions')} className="rounded-lg border px-4 py-3">Regions</Link>
                        <Link href={route('pokedex.myteam')} className="rounded-lg border px-4 py-3">My Team (CRUD)</Link>
                    </div>
                </section>
            </main>
        </>
    );
}
