'use client';

import { FC } from 'react';

interface SearchBarProps {
  query: string;
  onChange: (value: string) => void;
  removeCookiesLogout: (value: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({ query, onChange  }) => {
  return (
    <> <input
    type="text"
    placeholder="Search products..."
    value={query}
    onChange={(e) => onChange(e.target.value)}
    className="w-full px-3 py-2 border rounded-md"
  /></>
   
  );
};

export default SearchBar;
