// components/PokemonCard.tsx
import { FC } from 'react';
import Link from 'next/link';

interface PokemonCardProps {
  id: number;
  name: string;
  image: string;
}

const PokemonCard: FC<PokemonCardProps> = ({ id, name, image }) => {
  return (
    <Link href={`/pages/pokemon/${id}`}>
      <div className="p-2 border border-[#003a70] rounded-lg cursor-pointer bg-white hover:bg-blue-400">
        <img src={image} alt={name} className="w-6/12 h-6/12 object-cover mx-auto" />
        <h3 className="mt-2 text-center text-lg font-semibold">{name}</h3>
      </div>
    </Link>
  );
};

export default PokemonCard;
