const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Sync Uncaught Exception
process.on('uncaughtException', (err) => {
  console.log('Uncaught Exception! 💥 Shutting down...');
  console.log(err.name, err.message);
  // Exit the server
  process.exit(1);
});

dotenv.config({ path: './config.env' });

// Database Connection

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((conn) => {
    // console.log(conn.connections);
    console.log('DB connection successful');
  });

// Application setup

const app = require('./app');

// Start Server

const port = process.env.PORT || 3000;
const host = process.env.HOST || '127.0.0.1';

const server = app.listen(port, host, () => {
  console.log('Hello world');
});

// Async Unhandled Rejections
process.on('unhandledRejection', (err) => {
  console.log('Unhandled Rejections! 💥 Shutting down...');
  console.log(err.name, err.message);
  // Close the server first to complete remaining requests
  server.close(() => {
    // Exit the server
    process.exit(1);
  });
});
