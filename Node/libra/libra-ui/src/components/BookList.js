// src/components/BookList.js
import React from 'react';
import { ListGroup, Button } from 'react-bootstrap';

const BookList = ({ books, onDelete }) => {
    return (
        <ListGroup>
            {books.map((book) => (
                <ListGroup.Item key={book.ISBN}>
                    <h5>{book.title}</h5>
                    <p>Author: {book.author}</p>
                    <p>Publisher: {book.publisher}</p>
                    <p>Published Date: {new Date(book.publishedDate).toLocaleDateString()}</p>
                    <p>ISBN: {book.ISBN}</p>
                    <Button variant="danger" onClick={() => onDelete(book.ISBN)}>
                        Delete
                    </Button>
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
};

export default BookList;
