"use client";

// pages/index.tsx
import { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import PokemonCard from '../components/PokemonCard';

// TypeScript interface to define the shape of Pokemon data
interface Pokemon {
  name: string;
  url: string;
}

const Home = () => {
  // State to hold the list of Pokemon
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  // State to hold the search query
  const [search, setSearch] = useState('');

  useEffect(() => {
    // Function to fetch Pokemon data from the API
    const fetchPokemons = async () => {
  
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=300', {cache: 'no-store'});
  
      const data = await response.json();
      // Update the state with the fetched Pokemon data
      setPokemons(data.results);
    };

    fetchPokemons();
  }, []); 

  // Filter Pokemon based on the search query
  const filteredPokemons = pokemons.filter(pokemon =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4">
      {/* Search bar component for user input */}
      <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />
      {/* Grid layout to display Pokemon cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 gap-5 mt-5">
        {filteredPokemons.map((pokemon, index) => {
          // Extract Pokemon ID from the URL
          const id = pokemon.url.split('/').filter(Boolean).pop();
          return (
            <PokemonCard
              key={index} // Use index as key for each Pokemon card
              id={parseInt(id!)} // Convert ID from string to number
              name={pokemon.name}
              image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} // Construct image URL
            />
          );
        })}
      </div>
    </div>
  );
};

export default Home;
