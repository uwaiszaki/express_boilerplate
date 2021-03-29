const User = require('../models/userModel');
const APIFeatures = require('../utils/apiFeatures');

exports.getAllUsers = async (req, res) => {
  try {
    console.log(req.query);

    const apiFeatures = new APIFeatures(User.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const users = await apiFeatures.query;

    res.status(200).json({ status: 'OK', data: { users } });
  } catch (err) {
    res.status(500).json({ status: 'Failed', message: err });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.find(req.params);
    console.log(user);
    res.status(200).json({ status: 'Found', data: { user } });
  } catch (err) {
    res.status(404).json({ status: 'Failed', message: err });
  }
};

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ status: 'Created', data: { user } });
  } catch (err) {
    res.status(404).json({ status: 'Failed', message: err });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params, req.body);
    res.status(202).json({ status: 'Updated', data: { user } });
  } catch (err) {
    res.status(404).json({ status: 'Failed', message: err });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params, req.body);
    res.status(202).json({ status: 'Deleted' });
  } catch (err) {
    res.status(404).json({ status: 'Failed', message: err });
  }
};
