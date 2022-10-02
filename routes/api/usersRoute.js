const router = require("express").Router();
const {
  getAllUsers,
  createUser,
  getSingleUser,
  updateUser,
  removeUser,
  addFriend,
  removeFriend,
} = require("../../controllers/usersController");

router.route("/").get(getAllUsers).post(createUser);
router.route("/:userId").get(getSingleUser).put(updateUser).delete(removeUser);
router.route("/:userId/friends/:friendId").post(addFriend).delete(removeFriend);

module.exports = router;
