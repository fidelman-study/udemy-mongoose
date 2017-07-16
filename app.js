const express =require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Book = require('./Book.model');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

const port = 8080;
const db = 'mongodb://localhost/udemy-mongoose';

// Use native promises
mongoose.Promise = global.Promise;

mongoose.connect(db)
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Database connected');
  })
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.log(`Database connection failed: ${error}`);
  });

app.get('/', (req, res) => {
  res.send('Happy to be here');
});

app.get('/books', (req, res) => {
  console.log('getting all books');
  Book.find({})
    .exec((err, books) => {
      if (err) {
        res.send('error has occurred');
      } else {
        res.json(books);
      }
    });
});

app.get('/books/:id', (req, res) => {
  const { id } = req.params;
  console.log('get book by ' + id);
  Book.findById(id)
    .exec((err, book) => {
      if (err) {
        res.send('error has occurred');
      } else {
        res.json(book);
      }
    });
});

app.post('/book', (req, res, next) => {
  const book = new Book(req.body);
  book.save((err, book) => {
    if (err) {
      res.send('error has occurred');
    } else {
      res.json(book);
    }
  });
});

app.put('/book/:id', (req, res) => {
  const { id } = req.params;
  Book.findByIdAndUpdate(id, req.body)
    .exec((err, book) => {
      if (err) {
        res.send('error has occurred');
      } else {
        res.json(book);
      }
    });
});

app.delete('/book/:id', (req, res) => {
  const { id } = req.params;
  Book.findByIdAndRemove(id)
    .exec((err, book) => {
      if (err) {
        res.send('error has occurred');
      } else {
        res.json(book);
      }
    });
});

app.listen(port, () => {
  console.log('app listening on port ' + port);
});