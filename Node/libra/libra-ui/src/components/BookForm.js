// src/components/BookForm.js
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const BookForm = ({ onSubmit }) => {
    const [book, setBook] = useState({
        title: '',
        author: '',
        publisher: '',
        publishedDate: '',
        ISBN: '',
    });

    const handleChange = (e) => {
        setBook({ ...book, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(book);
        setBook({ title: '', author: '', publisher: '', publishedDate: '', ISBN: '' });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                    type="text"
                    name="title"
                    value={book.title}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group controlId="formAuthor">
                <Form.Label>Author</Form.Label>
                <Form.Control
                    type="text"
                    name="author"
                    value={book.author}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group controlId="formPublisher">
                <Form.Label>Publisher</Form.Label>
                <Form.Control
                    type="text"
                    name="publisher"
                    value={book.publisher}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group controlId="formPublishedDate">
                <Form.Label>Published Date</Form.Label>
                <Form.Control
                    type="date"
                    name="publishedDate"
                    value={book.publishedDate}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group controlId="formISBN">
                <Form.Label>ISBN</Form.Label>
                <Form.Control
                    type="text"
                    name="ISBN"
                    value={book.ISBN}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
};

export default BookForm;
