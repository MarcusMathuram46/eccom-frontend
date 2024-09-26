import React, { useEffect, useState } from 'react';
import '../styles/SearchBar.css';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);

  // Debouncing to limit API calls
  useEffect(() => {
    const timerId = setTimeout(() => {
      setSearchTerm(debouncedTerm);
    }, 500); // Delay of 500ms

    return () => {
      clearTimeout(timerId);
    };
  }, [debouncedTerm, setSearchTerm]);

  return (
    <div className="search-bar container my-3">
      <input
        type="text"
        className="form-control"
        placeholder="Search products..."
        value={debouncedTerm}
        onChange={(e) => setDebouncedTerm(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
