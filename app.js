const express =require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Book = require('./Book.model');

const app = express();
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

app.listen(port, () => {
  console.log('app listening on port ' + port);
});