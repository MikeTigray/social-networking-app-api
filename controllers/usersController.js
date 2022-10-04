const { Thought, User } = require("../models");
module.exports = {
  getAllUsers(req, res) {
    User.find({})
      .populate("friends")
      .then((data) => res.status(200).json(data))
      .catch((err) => res.status(404).json(err));
  },
  createUser(req, res) {
    User.create(req.body)
      .then((data) =>
        res
          .status(201)
          .json({ status: "User created successfully!", user: data })
      )
      .catch((err) => {
        console.log(err);
        res.status(400).json({ status: "User was NOT created", error: err });
      });
  },
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .populate("friends")
      .then((data) => res.status(200).json(data))
      .catch((err) => res.status(404).json(err));
  },
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { new: true, runValidators: true, new: true }
    )
      .then((data) =>
        res
          .status(200)
          .json({ status: "User was updated successfully!", updatedUser: data })
      )
      .catch((err) =>
        res.status(404).json({ status: "User can not be updated!", error: err })
      );
  },
  async removeUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId });
      if (!user) {
        res.status(200).json({ status: "No User with this Id" });
      }

      const thought = await Thought.findOne({ username: user.username });
      const deletedThough = await thought.deleteOne();
      const deletedUser = await user.deleteOne();
      res.status(200).json({
        status: "User was deleted successfully",
        deletedUser: deletedUser,
        deletedThought: deletedThough,
      });
    } catch (error) {
      res.status(400).json(error);
    }
  },
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $push: { friends: req.params.friendId } },
      { new: true }
    )
      .then((data) => {
        res.status(200).json({
          status: `Friend was added successfully!`,
          updatedUser: data,
        });
      })
      .catch((err) =>
        res.status(400).json({
          status: "Unfortunately, friend could NOT be added.",
          message: err,
        })
      );
  },
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .then((data) => {
        res.status(200).json({
          status: `Friend was removed successfully!`,
          updatedUser: data,
        });
      })
      .catch((err) =>
        res.status(400).json({
          status: "Oops, not a friend 😅",
          message: err,
        })
      );
  },
};
