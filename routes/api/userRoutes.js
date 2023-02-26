const router = require('express').Router();
const {
  getUser,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController');

// /api/user
router
.route('/')
.get(getUser)
.post(createUser);

// /api/user/:userId
router
.route('/:userId')
.get(getSingleUser)
.put(updateUser)
.delete(deleteUser);

// /api/user/:userId/friends
router
.route('/:userId/friends/:friendsId')
.post(addFriend)
.delete(removeFriend);

// /api/user/:userId/friends/:friendId
// router
// .route('/:userId/friends/:friendsId')
// .delete(removeFriend);

module.exports = router;