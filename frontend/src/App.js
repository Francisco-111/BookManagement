import React, { useState, useEffect } from 'react';

function App() {
  const [books, setBooks] = useState([]); // For displaying random books
  const [searchResults, setSearchResults] = useState([]); // For displaying search results
  const [searchTerm, setSearchTerm] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [searchMessage, setSearchMessage] = useState('');

  // Fetch 10 random books on initial load
  const fetchRandomBooks = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/books/random');
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error('Error fetching random books:', error);
    }
  };

  useEffect(() => {
    fetchRandomBooks(); // Load 10 random books when the app starts
  }, []);

  // Handle Search
  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setSearchMessage('Please enter a search term');
      setSearchResults([]); // Clear previous search results
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/books/search?query=${searchTerm}`);
      const data = await response.json();
      if (data.length === 0) {
        setSearchMessage('No books found');
      } else {
        setSearchMessage('');
      }
      setSearchResults(data);
    } catch (error) {
      console.error('Error searching books:', error);
      setSearchMessage('An error occurred while searching');
    }
  };

  // Handle Adding Books
  const handleAddBook = async () => {
    if (!title || !author || !isbn) {
      alert('Please fill out all fields');
      return;
    }

    const newBook = { title, author, isbn };
    try {
      const response = await fetch('http://localhost:8080/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBook),
      });

      if (response.ok) {
        alert('Book added successfully');
        fetchRandomBooks(); // Refresh random books list
        setTitle('');
        setAuthor('');
        setIsbn('');
      } else {
        alert('Failed to add book');
      }
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  return (
      <div className="container">
        <h1>Book Management</h1>

        {/* Add Book Section */}
        <h2>Add New Book</h2>
        <div className="add-book-form">
          <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
          />
          <input
              type="text"
              placeholder="Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
          />
          <input
              type="text"
              placeholder="ISBN"
              value={isbn}
              onChange={(e) => setIsbn(e.target.value)}
          />
          <button onClick={handleAddBook}>Add Book</button>
        </div>

        {/* Search Section */}
        <h2>Search Books</h2>
        <div className="search-header">
          <input
              type="text"
              className="search-input"
              placeholder="Search by title, author, or ISBN"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        {/* Display Search Results directly below the Search Bar */}
        {searchMessage && <p className="search-message">{searchMessage}</p>}
        <div className="book-list">
          {searchResults.length === 0 && !searchMessage && (
              <p>No results found</p>
          )}
          {searchResults.map((book, index) => (
              <div className="book-item" key={index}>
                <strong>{book.title}</strong> by <em>{book.author}</em> (ISBN: {book.isbn})
              </div>
          ))}
        </div>

        {/* Default Book List Section */}
        <h2>Book List <span className="random-text">(Random 10)</span></h2>
        <div className="book-list">
          {books.length === 0 ? (
              <p>No books available</p>
          ) : (
              books.map((book, index) => (
                  <div className="book-item" key={index}>
                    <strong>{book.title}</strong> by <em>{book.author}</em> (ISBN: {book.isbn})
                  </div>
              ))
          )}
        </div>
      </div>
  );
}

export default App;
