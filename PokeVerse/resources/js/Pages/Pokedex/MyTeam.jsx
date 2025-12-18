import { Head, Link } from '@inertiajs/react';
import TeamForm from './TeamForm';

export default function MyTeam() {
    const handleSubmit = (e) => {
        e.preventDefault();
        // placeholder: integration with Inertia form or fetch will go here
        alert('Submit (placeholder)');
    };

    return (
        <>
            <Head title="My Team" />
            <main className="min-h-screen p-6">
                <section aria-labelledby="myteam-heading">
                    <h1 id="myteam-heading" className="text-4xl font-black text-pokemon-dark mb-4">My Team (CRUD)</h1>
                    <p className="text-lg text-gray-600 mb-8">Create, edit and manage your Pokémon teams with full CRUD functionality</p>

                    <div className="grid gap-8 lg:grid-cols-2">
                        <div>
                            <h2 className="text-2xl font-bold text-pokemon-dark mb-6">Your Teams</h2>
                            <div className="space-y-4">
                                {Array.from({ length: 3 }).map((_, i) => (
                                    <div key={i} className="bg-white rounded-xl shadow-pokemon-lg p-6 border border-gray-100 hover:shadow-pokemon-xl transition-shadow">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-12 h-12 bg-gradient-to-br from-pokemon-blue to-pokemon-teal rounded-full flex items-center justify-center">
                                                    <span className="text-white font-bold text-sm">T{i + 1}</span>
                                                </div>
                                                <div>
                                                    <div className="font-bold text-pokemon-dark">Team {i + 1}</div>
                                                    <div className="text-sm text-gray-600">Pikachu, Bulbasaur, Charmander</div>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <button className="inline-flex items-center px-3 py-2 border border-pokemon-blue text-pokemon-blue rounded-lg hover:bg-pokemon-blue hover:text-white transition-colors">
                                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                    Edit
                                                </button>
                                                <button className="inline-flex items-center px-3 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors">
                                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <aside>
                            <h2 className="text-2xl font-bold text-pokemon-dark mb-6">Add / Edit Team</h2>
                            <div className="bg-white rounded-xl shadow-pokemon-lg p-6 border border-gray-100">
                                <TeamForm onSubmit={handleSubmit} />
                            </div>
                        </aside>
                    </div>

                    <div className="mt-8">
                        <Link href={route('pokedex.index')} className="rounded px-3 py-2 border">Back to Discover</Link>
                    </div>
                </section>
            </main>
        </>
    );
}
