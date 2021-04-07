const express = require('express');
const router = express.Router();
const Book = require('../models/book');
const Author = require('../models/author');

//Return ALL Books
router.get('/', async (req, res) => {
  res.send('All Books');
});

//New Book Route
router.get('/new', async (req, res) => {
  try {
    const authors = await Author.find({});
    const book = new Book();
    res.render('books/new', {
      authors: authors,
      book: book,
    });
  } catch {
    res.redirect('/books');
  }
});

//Create new book route
router.post('/', async (req, res) => {
  res.send('Create Books');
});

module.exports = router;
