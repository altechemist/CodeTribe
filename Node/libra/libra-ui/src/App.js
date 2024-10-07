// src/App.js
import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import BookForm from './components/BookForm';
import BookList from './components/BookList';

const App = () => {
    const [books, setBooks] = useState([]);

    const fetchBooks = async () => {
        const response = await fetch('http://localhost:3001'); // Adjust this URL as needed
        const data = await response.json();
        setBooks(data);
    };

    const addBook = async (newBook) => {
        await fetch('http://localhost:3001', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newBook),
        });
        fetchBooks(); // Refresh the list
    };

    const deleteBook = async (isbn) => {
        await fetch(`http://localhost:3001?isbn=${isbn}`, {
            method: 'DELETE',
        });
        fetchBooks(); // Refresh the list
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    return (
        <Container>
            <Row>
                <Col>
                    <h1>Book Directory</h1>
                    <BookForm onSubmit={addBook} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <h2>Book List</h2>
                    <BookList books={books} onDelete={deleteBook} />
                </Col>
            </Row>
        </Container>
    );
};

export default App;
