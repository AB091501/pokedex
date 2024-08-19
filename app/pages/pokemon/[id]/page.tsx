// app/pokemon/[id]/page.tsx
import PokemonDetailClient from './PokemonDetailClient';

export async function generateStaticParams() {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10'); // Adjust the limit as needed
  const data = await response.json();

  return data.results.map((pokemon: { url: string }) => {
    const id = pokemon.url.split('/').filter(Boolean).pop();
    return { id };
  });
}

const PokemonDetail = () => {
  
  return <PokemonDetail />;
};

export default PokemonDetailClient;
