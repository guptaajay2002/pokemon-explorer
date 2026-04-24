"use client";

import { useEffect, useState } from "react";
import { getPokemonDetails } from "@/lib/api";

export default function PokemonDetails({ pokemon }) {
  const [details, setDetails] = useState(null);
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    if (!pokemon) return;

    const fetchDetails = async () => {
      const res = await getPokemonDetails(pokemon.url);
      setDetails(res);
      setActiveTab(res.types[0].type.name);
    };

    setDetails(null);
    fetchDetails();
  }, [pokemon]);

  if (!pokemon)
    return (
      <div className="bg-white p-6 rounded shadow text-gray-500">
        Select a Pokémon
      </div>
    );

  if (!details)
    return (
      <div className="bg-white p-6 rounded shadow text-gray-500">
        Loading details...
      </div>
    );

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold capitalize mb-3">
        {details.name}
      </h2>

      {/* IMAGE */}
      <img
        src={details.sprites.front_default}
        alt={details.name}
        className="w-24 h-24 mb-3"
      />

      {/* TABS */}
      <div className="flex gap-2 mb-4">
        {details.types.map((t) => (
          <button
            key={t.type.name}
            onClick={() => setActiveTab(t.type.name)}
            className={`px-3 py-1 rounded ${
              activeTab === t.type.name
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            {t.type.name}
          </button>
        ))}
      </div>

      {/* DATA */}
      <p>
        <strong>Game Indices:</strong> {details.game_indices.length}
      </p>
      <p>
        <strong>Moves:</strong> {details.moves.length}
      </p>
    </div>
  );
}