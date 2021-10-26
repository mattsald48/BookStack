const mongoose = require('mongoose');
const Book = require('./book');

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  isDemo: {
    type: Boolean,
    default: false,
  },
});

//the pre() Wil run any function before the designated call is made. In this case the remove.
//Stops you from deleting author who has books assigned to them
authorSchema.pre('remove', function (next) {
  Book.find({ author: this.id }, (err, books) => {
    if (err) {
      next(err);
    } else if (books.length > 0) {
      next(
        new Error(
          'To Delete This Author All Linked Books Must First Be Removed'
        )
      );
    } else {
      next();
    }
  });
});

//Allows you to remove an author and all currently assigned books to them. May implement later.
// authorSchema.pre('remove', function (next) {
//   Book.find({ author: this.id }, (err, books) => {
//     if (err) {
//       next(err);
//     } else {
//       books.forEach((book) => book.remove());
//     }
//     next();
//   });
// });

module.exports = mongoose.model('Author', authorSchema);
