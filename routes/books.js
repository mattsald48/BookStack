const express = require('express');
const router = express.Router();
const Book = require('../models/book');

//Return ALL Books
router.get('/', async (req, res) => {
  res.send('All Books');
});

//New Book Route
router.get('/new', (req, res) => {
  res.send('New Books');
});

//Create new book route
router.post('/', async (req, res) => {
  res.send('Create Books');
});

module.exports = router;
