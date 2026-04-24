"use client";

export default function PokemonTable({ pokemons, onSelect, selected }) {
  return (
    <table className="w-full border bg-white shadow rounded">
      <thead>
        <tr className="bg-blue-200">
          <th className="p-2">#</th>
          <th className="p-2">Name</th>
        </tr>
      </thead>
      <tbody>
        {pokemons.map((p, i) => (
          <tr
            key={p.name}
            onClick={() => onSelect(p)}
            className={`border-t cursor-pointer hover:bg-blue-100 ${
              selected?.name === p.name ? "bg-blue-200" : ""
            }`}
          >
            <td className="p-2">{i + 1}</td>
            <td className="p-2 capitalize text-blue-700">
              {p.name}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}