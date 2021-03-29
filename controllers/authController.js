const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const catchAsync = (fn) => (req, res, next) => fn(req, res, next).catch(next);

exports.signup = catchAsync(async (req, res, next) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  res.status(201).json({ status: 'Created', token, data: { user } });
});
