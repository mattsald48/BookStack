const mongoose = require('mongoose');
const Book = require('./book');

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

//Wil run any function before the remove call is made
authorSchema.pre('remove', function (next) {
  Book.find({ author: this.id }, (err, books) => {
    if (err) {
      next(err);
    } else if (books.length > 0) {
      next(new Error('This currently has books assigned'));
    } else {
      next();
    }
  });
});

module.exports = mongoose.model('Author', authorSchema);
