const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const userRoutes = require('./routes/userRoutes');

app.use('/api/users', userRoutes);

// Unhandled routes
app.all('*', (req, res, next) => {
  const err = new AppError(`Can't find ${req.originalUrl}`, 404);
  console.log(err);
  console.log('Inside app.js -----');
  next(err);
});

app.use(globalErrorHandler);

module.exports = app;
