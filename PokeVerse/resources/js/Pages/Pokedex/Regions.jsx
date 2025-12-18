import { Head, Link } from '@inertiajs/react';

export default function Regions() {
    return (
        <>
            <Head title="Regions" />
            <main className="min-h-screen p-6">
                <section aria-labelledby="regions-heading">
                    <h1 id="regions-heading" className="text-4xl font-black text-pokemon-dark mb-4">Pokémon Regions</h1>
                    <p className="text-lg text-gray-600 mb-8">Explore different regions of the Pokémon world, each with unique Pokémon and landscapes</p>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {[
                            { name: 'Kanto', color: 'from-pokemon-red to-pokemon-orange', description: 'The first region where it all began' },
                            { name: 'Johto', color: 'from-pokemon-green to-pokemon-teal', description: 'Home to many new Pokémon species' },
                            { name: 'Hoenn', color: 'from-pokemon-blue to-pokemon-indigo', description: 'Tropical islands and diverse landscapes' },
                            { name: 'Sinnoh', color: 'from-pokemon-purple to-pokemon-pink', description: 'Snowy mountains and ancient ruins' },
                            { name: 'Unova', color: 'from-pokemon-yellow to-pokemon-orange', description: 'Urban cities and rural areas' },
                            { name: 'Kalos', color: 'from-pokemon-pink to-pokemon-purple', description: 'Fashion and fairy-type Pokémon' },
                            { name: 'Alola', color: 'from-pokemon-teal to-pokemon-blue', description: 'Tropical islands with regional variants' },
                            { name: 'Galar', color: 'from-pokemon-indigo to-pokemon-gray', description: 'Wild areas and dynamax phenomenon' }
                        ].map((region) => (
                            <article key={region.name} className="group rounded-xl border border-gray-200 bg-white p-6 shadow-pokemon hover:shadow-pokemon-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                                <div className={`h-24 bg-gradient-to-br ${region.color} rounded-lg mb-4 flex items-center justify-center relative overflow-hidden`}>
                                    <div className="absolute inset-0 bg-black/10"></div>
                                    <div className="relative w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-pokemon-dark mb-2 group-hover:text-pokemon-blue transition-colors">{region.name}</h3>
                                <p className="text-sm text-gray-600 mb-3">{region.description}</p>
                                <div className="flex items-center justify-between">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pokemon-blue/10 text-pokemon-blue">
                                        Region
                                    </span>
                                    <svg className="w-5 h-5 text-gray-400 group-hover:text-pokemon-blue transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </article>
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
