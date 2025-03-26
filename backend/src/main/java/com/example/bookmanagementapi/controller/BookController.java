package com.example.bookmanagementapi.controller;

import com.example.bookmanagementapi.entity.Book;
import com.example.bookmanagementapi.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3000") // Allow React frontend
@RestController
@RequestMapping("/api/books")
public class BookController {

    @Autowired
    private BookRepository bookRepository;

    public BookController(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }
    @GetMapping
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }
    @GetMapping("/search")
    public List<Book> searchBooks(@RequestParam String query) {
        // If the query is an ISBN, return a single book
        if (isIsbn(query)) {
            return bookRepository.findByIsbn(query).stream().limit(1).collect(Collectors.toList());
        }

        // If the query is a title or author, return multiple books
        return bookRepository.findByTitleContainingIgnoreCaseOrAuthorContainingIgnoreCase(query, query);
    }
    private boolean isIsbn(String query) {
        return query.matches("\\d{13}");  // Simple check for a 13-digit ISBN
    }

    // Endpoint to get a list of 10 random books
    @GetMapping("/random")
    public List<Book> getRandomBooks() {
        Pageable pageable = PageRequest.of(0, 10);  // Fetch 10 random books
        return bookRepository.findRandomBooks(pageable);
    }

    @PostMapping
    public Book createBook(@RequestBody Book book) {
        return bookRepository.save(book);
    }

    @PutMapping("/{id}")
    public Book updateBook(@PathVariable Long id, @RequestBody Book bookDetails) {
        return bookRepository.findById(id).map(book -> {
            book.setTitle(bookDetails.getTitle());
            book.setAuthor(bookDetails.getAuthor());
            book.setIsbn(bookDetails.getIsbn());
            return bookRepository.save(book);
        }).orElseThrow(() -> new RuntimeException("Book not found with ID: " + id));
    }

    @DeleteMapping("/{id}")
    public String deleteBook(@PathVariable Long id) {
        bookRepository.deleteById(id);
        return "Book deleted successfully";
    }
}
