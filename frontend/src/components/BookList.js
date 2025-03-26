import React from 'react';

const BookList = ({ books, searchQuery = '' }) => {
    // Filter books by title, author, or ISBN
    const filteredBooks = books.filter((book) => {
        const query = searchQuery.toLowerCase();
        return (
            book.title.toLowerCase().includes(query) ||
            book.author.toLowerCase().includes(query) ||
            book.isbn.toLowerCase().includes(query)
        );
    });

    return (
        <div>
            {filteredBooks.length > 0 ? (
                <ul>
                    {filteredBooks.map((book) => (
                        <li key={book.id} className="book-item">
                            <strong>{book.title}</strong> by {book.author} <br />
                            <em>ISBN: {book.isbn}</em>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No books found.</p>
            )}
        </div>
    );
};

export default BookList;
