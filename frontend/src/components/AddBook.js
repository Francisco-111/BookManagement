import React, { useState } from 'react';

const AddBook = ({ onAddBook }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [isbn, setIsbn] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title && author && isbn) {
            const newBook = {
                id: Date.now(),
                title,
                author,
                isbn,
            };
            onAddBook(newBook);
            setTitle('');
            setAuthor('');
            setIsbn('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="add-book-form">
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="ISBN"
                value={isbn}
                onChange={(e) => setIsbn(e.target.value)}
                required
            />
            <button type="submit">Add Book</button>
        </form>
    );
};

export default AddBook;
