import React, { useState } from "react";

type SearchBarProps = {
  onSearch: (searchTerm: string) => void;
};

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search workshops..."
      value={searchTerm}
      onChange={handleChange}
    />
  );
};

export default SearchBar;
