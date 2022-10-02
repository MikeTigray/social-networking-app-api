const { Thought, User, reactionSchema } = require("../models");
module.exports = {
  getAllUsers(req, res) {
    User.find({})
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
      { new: true }
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
  removeUser(req, res) {},
  addFriend(req, res) {},
  removeFriend(req, res) {},
};
