import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearchChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSearchSubmit}>
      <input
        type="text"
        placeholder="Search by title"
        value={query}
        onChange={handleSearchChange}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
