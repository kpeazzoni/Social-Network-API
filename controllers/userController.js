const { Thought, Reaction, User } = require('../models');
const { ObjectId } = require('mongoose').Types;

module.exports = {
  // Get all users
  getUser(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  // Get a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  // update a user
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
    .then((user) =>
      !user
        ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
    .catch((err) => res.status(500).json(err));
  },
// add a friend
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendsId } },
      { runValidators: true, new: true }
    )
    .then((user) =>
      !user
        ? res.status(404).json({ message: 'No user with that ID' })
          : res.status(200).json(user)
      )
    .catch((err) => res.status(500).json(err));
  },
  // Delete a user and reactions
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : reactions.deleteMany({ _id: { $in: user.reactions } })
      )
      .then(() => res.json({ message: 'User and associated apps deleted!' }))
      .catch((err) => res.status(500).json(err));
  },

// delete a friend
removeFriend(req, res) {
  User.findOneAndUpdate(
    { _id: req.params.userId },
    { $pull: { friends: req.params.friendsId } },
    { runValidators: true, new: true }
    )
    .then((user) =>
    !user ? res.status(400).json({ message: 'No user with that ID' }) : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
},
};