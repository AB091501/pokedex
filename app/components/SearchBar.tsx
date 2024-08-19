// components/SearchBar.tsx
import { FC } from 'react';

interface SearchBarProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Search Pokémon"
      value={value}
      onChange={onChange}
      className="w-full p-3 border border-[#003a70] rounded"
    />
  );
};

export default SearchBar;
