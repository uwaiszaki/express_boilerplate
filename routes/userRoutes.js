const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

// const queryParseMiddleware = require('../modules/parseQueryString');

const router = express.Router();

router.post('/signup', authController.signup);
// router.post('/signup', authController.signup);

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router.route('/:id').get(userController.getUser);

router.param('username', (req, res, next, val) => {
  console.log(`param middleware with value = ${val}`);
  next();
});

module.exports = router;
