const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: String,
  author: {
    type: mongoose.Types.ObjectId,
    ref: 'Author'
  }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;