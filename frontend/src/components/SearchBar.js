import React from 'react';

const SearchBar = ({ onSearch, searchTerm, setSearchTerm }) => {
    return (
        <div className="search-header">
            <input
                type="text"
                className="search-input"
                placeholder="Search by title, author, or ISBN"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={onSearch}>Search</button>
        </div>
    );
};

export default SearchBar;
