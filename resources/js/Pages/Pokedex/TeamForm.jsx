export default function TeamForm({ onSubmit, initial = {} }) {
    return (
        <form onSubmit={onSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium">Team Name</label>
                <input name="name" defaultValue={initial.name || ''} className="mt-1 block w-full rounded border p-2" />
            </div>

            <div>
                <label className="block text-sm font-medium">Pokémon (comma separated)</label>
                <input name="pokemons" defaultValue={initial.pokemons || ''} className="mt-1 block w-full rounded border p-2" />
            </div>

            <div className="flex gap-2">
                <button type="submit" className="rounded bg-blue-600 px-4 py-2 text-white">Save</button>
                <button type="button" className="rounded border px-4 py-2">Cancel</button>
            </div>
        </form>
    );
}
