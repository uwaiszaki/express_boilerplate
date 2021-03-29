const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
    min: 1,
    max: 5,
    require: [true, 'Please provide the rating'],
  },
  review: String,
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  //   course: {
  //         type: mongoose.Schema.ObjectId,
  //         ref: 'Course'
  //   }
});

const reviewModel = mongoose.model('Review', reviewSchema);

module.exports = reviewModel;
