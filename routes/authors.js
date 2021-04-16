const express = require('express');
const router = express.Router();
const Author = require('../models/author');

//Return ALL authors
router.get('/', async (req, res) => {
  let searchOptions = {};
  if (req.query.name != null && req.query.name !== '') {
    searchOptions.name = new RegExp(req.query.name, 'i');
  }
  try {
    const authors = await Author.find(searchOptions);
    res.render('authors/index', {
      authors: authors,
      searchOptions: req.query,
    });
  } catch {
    res.redirect('/');
  }
});

//Display a new author
router.get('/new', (req, res) => {
  res.render('authors/new', { author: new Author() });
});

//Create new author
router.post('/', async (req, res) => {
  const author = new Author({
    name: req.body.name,
  });
  try {
    const newAuthor = await author.save();
    // res.redirect(`authors/${newAuthor.id}`);
    res.redirect(`authors`);
  } catch {
    res.render('authors/new', {
      author: author,
      errorMessage: 'Error creating Author',
    });
  }
});

//Getting an author
router.get('/:id', (req, res) => {
  res.send('Show Authhor ' + req.params.id);
});

//Getting to the edit page of an author
router.get('/:id/edit', (req, res) => {
  res.send(`Edit Author ${req.params.id}`);
});

//Updating the author
router.put('/:id', (req, res) => {
  res.send(`Update Author ${req.params.id}`);
});

//Deleting author
router.delete('/:id', (req, res) => {
  res.send(`Delete Author ${req.params.id}`);
});

module.exports = router;
