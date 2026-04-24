"use client";

import { useEffect, useState } from "react";
import { getPokemons } from "@/lib/api";
import PokemonTable from "@/components/PokemonTable";
import PokemonDetails from "@/components/PokemonDetails";

export default function PokePage() {
  const [pokemonList, setPokemonList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [activePokemon, setActivePokemon] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");

  const limit = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getPokemons(currentPage * limit, limit);
        setPokemonList(res.results);
        setTotalCount(res.count);
      } catch (err) {
        setError("Failed to load Pokémon");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  // 🔍 Filter
  const filteredList = pokemonList.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 grid grid-cols-2 gap-8 bg-blue-50 min-h-screen">
      
      {/* LEFT */}
      <div>
        <h1 className="text-2xl font-bold mb-4 text-center">
          Pokemon Explorer
        </h1>

        {/* Search */}
        <input
          type="text"
          placeholder="Search Pokémon..."
          className="w-full p-2 border rounded mb-3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && (
          <PokemonTable
            pokemons={filteredList}
            onSelect={setActivePokemon}
            selected={activePokemon}
          />
        )}

        {/* Pagination */}
        <div className="flex gap-4 mt-4 items-center justify-center">
          <button
            disabled={currentPage === 0}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="px-3 py-1 border rounded bg-white"
          >
            Prev
          </button>

          <span>Page: {currentPage + 1}</span>

          <button
            disabled={(currentPage + 1) * limit >= totalCount}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="px-3 py-1 border rounded bg-white"
          >
            Next
          </button>

          <span>Total: {totalCount}</span>
        </div>
      </div>

      {/* RIGHT */}
      <PokemonDetails pokemon={activePokemon} />
    </div>
  );
}