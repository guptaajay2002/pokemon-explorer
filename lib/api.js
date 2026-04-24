export async function getPokemons(offset = 0, limit = 10) {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
  );

  if (!res.ok) throw new Error("Failed");

  return res.json();
}

export async function getPokemonDetails(url) {
  const res = await fetch(url);

  if (!res.ok) throw new Error("Failed");

  return res.json();
}