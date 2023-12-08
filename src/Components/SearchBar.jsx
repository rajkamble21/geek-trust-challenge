import React from "react";
import "./SearchBar.css"; // Import the CSS file for styling

const SearchBar = ({ searchQuery, onSearch }) => {
  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Search by name, email, role"
        value={searchQuery}
        onChange={(e) => onSearch(e.target.value)}
        className="search-input"
      />
    </div>
  );
};

export default SearchBar;
