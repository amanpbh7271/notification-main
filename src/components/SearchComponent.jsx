import React, { useState } from 'react';
export default function SearchComponent ({ searchData }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const filteredResults = searchData.filter(item => item.id.toString().includes(searchTerm));
    setSearchResults(filteredResults);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search by ID"
          value={searchTerm}
          onChange={handleChange}
        />
        <button type="submit">Search</button>
      </form>
      <div>
        {searchResults.map(item => (
          <div key={item.id}>
            <p>ID: {item.id}</p>
            <p>Priority: {item.priority}</p>
            <p>Name: {item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};