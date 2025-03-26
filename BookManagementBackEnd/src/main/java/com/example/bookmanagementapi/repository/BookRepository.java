package com.example.bookmanagementapi.repository;

import com.example.bookmanagementapi.entity.Book;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, Long> {

    // Custom query to search by title, author, or ISBN
    List<Book> findByTitleContainingIgnoreCaseOrAuthorContainingIgnoreCase(String title, String author);

    // Custom query to search by ISBN
    List<Book> findByIsbn(String isbn);

    // Query to fetch random books (limited to 10)
    @Query("SELECT b FROM Book b ORDER BY RANDOM()")
    List<Book> findRandomBooks(Pageable pageable);
}



