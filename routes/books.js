const express = require('express');
const router = express.Router();
const Book = require('../models/book');

//Return ALL Books
router.get('/', async (req, res) => {});

//New Book Route
router.get('/new', (req, res) => {});

//Create new book route
router.post('/', async (req, res) => {});

module.exports = router;
