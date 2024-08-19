"use client";

// Importing necessary hooks and utilities from Next.js and React
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import { useRouter } from 'next/navigation';

// Define the TypeScript interface for Pokemon details
interface PokemonDetailClientProps {
  name?: string;
  id?: number;
  image?: string;
  weight?: number;
  height?: number;
  abilities?: string[];
  stats?: { base_stat: number; stat: { name: string } }[];
  types?: { type: { name: string } }[];
}

const PokemonDetailClient = () => {
  // Extract the `id` parameter from the URL
  const { id } = useParams();
  // State to hold Pokemon details
  const [pokemon, setPokemon] = useState<PokemonDetailClientProps | null>(null);
  // Router instance for navigation
  const router = useRouter();

  useEffect(() => {
    // Function to fetch Pokemon data from the API
    const fetchPokemon = async () => {
      try {
        // Fetch data from the PokeAPI
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        // Handle errors if response is not ok
        if (!response.ok) {
          notFound();
          return;
        }
        // Parse the response JSON
        const data = await response.json();
        // Update the state with the fetched data
        setPokemon({
          name: data.name,
          id: data.id,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`,
          weight: data.weight,
          height: data.height,
          abilities: data.abilities.map((ability: any) => ability.ability.name),
          stats: data.stats,
          types: data.types,
        });
      } catch (error) {
        // Log any errors encountered during fetching
        console.error('Failed to fetch Pokemon:', error);
      }
    };

    fetchPokemon();
  }, [id]); // Dependency array: effect runs when `id` changes

  // Show loading message if Pokemon data is not yet available
  if (!pokemon) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center min-h-screen">
    
      <div className="absolute top-0 right-0 p-6 opacity-60">
        <svg
          width="250"
          height="250"
          viewBox="0 0 206 208"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M127.762 104C127.762 117.676 116.676 128.762 103 128.762C89.3244 128.762 78.2381 117.676 78.2381 104C78.2381 90.3244 89.3244 79.2381 103 79.2381C116.676 79.2381 127.762 90.3244 127.762 104Z" fill="white"/>
          <path d="M103 208C155.393 208 198.738 169.257 205.947 118.857H145.035C138.917 136.169 122.407 148.571 103 148.571C83.5933 148.571 67.0835 136.169 60.9648 118.857H0.0532227C7.26235 169.257 50.6067 208 103 208ZM60.9648 89.1429H0.0532227C7.26235 38.7431 50.6067 0 103 0C155.393 0 198.738 38.7431 205.947 89.1429H145.035C138.917 71.8314 122.407 59.4286 103 59.4286C83.5933 59.4286 67.0835 71.8314 60.9648 89.1429ZM127.762 104C127.762 117.676 116.676 128.762 103 128.762C89.3244 128.762 78.2381 117.676 78.2381 104C78.2381 90.3244 89.3244 79.2381 103 79.2381C116.676 79.2381 127.762 90.3244 127.762 104Z" fill="white"/>
        </svg>
      </div>

      {/* Display Pokemon image */}
      <div className="relative mt-2">
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="w-40 h-40 object-cover"
        />
      </div>

      {/* Display Pokemon type */}
      <div className="mt-2">
        <span className="px-4 py-2 text-white bg-blue-500 rounded-full text-sm">{pokemon.types?.[0].type.name}</span>
      </div>

      {/* Display Pokemon details in a card */}
      <div className="bg-white border border-[#003a70] rounded-xl shadow-xg p-6 mt-6 w-11/12 md:w-8/12 lg:w-6/12">
        <h1 className="text-2xl font-bold text-center">{pokemon.name}</h1>

        {/* Display Pokemon weight, height, and ability */}
        <div className="flex justify-between items-center mt-4">
          <div className="text-center text-sm">
            <p className="font-medium">Weight</p>
            <p>{pokemon.weight} kg</p>
          </div>
          <div className="text-center text-sm">
            <p className="font-medium">Height</p>
            <p>{pokemon.height} m</p>
          </div>
          <div className="text-center text-sm">
            <p className="font-medium">Ability</p>
            <p>{pokemon.abilities?.[0]}</p>
          </div>
        </div>

        {/* Display base stats as progress bars */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-center">Base Stats</h2>
          {pokemon.stats?.map((stat, index) => (
            <div key={index} className="flex items-center mt-2">
              <span className="w-1/4 text-sm capitalize">{stat.stat.name}</span>
              <div className="w-9/12 bg-gray-200 rounded-full h-4 mx-2">
                <div className="bg-blue-500 h-4 rounded-full" style={{ width: `${stat.base_stat}%` }}></div>
              </div>
              <span className="w-1/4 text-sm text-right">{stat.base_stat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Button to navigate back to the list */}
      <div className="my-4 text-center">
        <button
          onClick={() => router.push('../../')} 
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Back to List
        </button>
      </div>
    </div>
  );
};

export default PokemonDetailClient;
