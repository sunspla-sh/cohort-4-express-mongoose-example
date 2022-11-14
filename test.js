const mongoose = require('mongoose');
const Author = require('./models/Author.model');
const Book = require('./models/Book.model')

mongoose.connect('mongodb://localhost:27017/post-request-example')
  .then(x => {
    console.log(`Connect to ${x.connections[0].name}`);
    return Author.create({
      firstName: 'F Scott',
      lastName: 'Fitzgerald'
    })
  })
  .then(savedAuthor => {
    console.log('author was created', savedAuthor);
    return Book.create({
      title: 'Great Gatsby',
      author: savedAuthor._id
    });
  })
  .then(savedBook => {
    console.log('book was created', savedBook);
    return Book.findOne({ title: 'Great Gatsby' }).populate('author')
  })
  .then(foundBook => {
    console.log('i found the book', foundBook);
    return mongoose.connection.close()
  })
  .then(() => console.log('connection to db closed'))
  .catch(err => console.log(err));