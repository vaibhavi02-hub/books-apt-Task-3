const express = require('express');
const app = express();

const PORT = 3000;

app.use(express.json());

// In-memory books array
let books = [
    { id: 1, title: "Atomic Habits", author: "James Clear" },
    { id: 2, title: "Rich Dad Poor Dad", author: "Robert Kiyosaki" }
];

// GET all books
app.get('/books', (req, res) => {
    res.json(books);
});

// POST new book
app.post('/books', (req, res) => {
    const { title, author } = req.body;

    if (!title || !author) {
        return res.status(400).json({ message: "Title and Author required" });
    }

    const newBook = {
        id: books.length + 1,
        title,
        author
    };

    books.push(newBook);
    res.status(201).json(newBook);
});

// PUT update book
app.put('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { title, author } = req.body;

    const book = books.find(b => b.id === id);

    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }

    book.title = title || book.title;
    book.author = author || book.author;

    res.json(book);
});

// DELETE book
app.delete('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const bookIndex = books.findIndex(b => b.id === id);

    if (bookIndex === -1) {
        return res.status(404).json({ message: "Book not found" });
    }

    books.splice(bookIndex, 1);

    res.json({ message: "Book deleted successfully" });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
