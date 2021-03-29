const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, 'email is required'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  name: String,
  photo: String,
  password: {
    type: String,
    require: [true, 'Please provide a password'],
    select: false,
    minlength: 8,
  },
  confirmPassword: {
    type: String,
    require: [true, 'Please confirm your password'],
    select: false,
    validate: {
      validator: function (pass) {
        return pass === this.password;
      },
      message: 'Passwords are not the same',
    },
  },
});

userSchema.pre('save', async function (next) {
  // only run this function if password is updated
  if (!this.isModified('password')) next();

  // encrypt password
  this.password = await bcrypt.hash(this.password, 12);
  // Remove confirm password from database
  this.confirmPassword = undefined;

  next();
});

module.exports = mongoose.model('User', userSchema);
