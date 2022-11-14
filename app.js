const mongoose = require('mongoose');
const express = require('express');
const app = express();

const hbs = require('hbs');

const Author = require('./models/Author.model');

mongoose.connect('mongodb://localhost:27017/post-request-example')
  .then(x => console.log(`connected to db ${x.connections[0].name}`))
  .catch(err => console.log(err));


app.use(express.urlencoded({ extended: false }));

app.set('views', __dirname + '/views')
app.set('view engine', 'hbs')

app.get('/', (req, res, next) => {
  res.render('index.hbs')
});

app.post('/user-data', (req, res, next) => {
  console.log(req.body);
  Author.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName
  })
    .then(createdAuthor => {
      console.log('i created an author', createdAuthor);
      res.send(createdAuthor);
    })
    .catch(err => res.send(err));

});

app.listen(3000, () => console.log('app listening on port 3000'))