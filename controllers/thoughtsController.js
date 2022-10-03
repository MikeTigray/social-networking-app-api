const { Thought } = require("../models");

module.exports = {
  getAllThoughts(req, res) {
    Thought.find({}, (err, documents) => {
      err ? res.status(404).json(err) : res.status(200).json(documents);
    });
  },
  createThought(req, res) {
    Thought.create(req.body)
      .then((result) => {
        res
          .status(201)
          .json({ status: "Thought created successfully 💭", thought: result });
      })
      .catch((err) => {
        res.status(400).json({ status: "Though was NOT created!" });
      });
  },
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId }, (err, thought) =>
      err ? res.status(404).json(err) : res.status(200).json(thought)
    );
  },
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { new: true, runValidators: true, new: true }
    )
      .then((updatedThought) =>
        res.status(200).json({ status: "Thought was updated successfully!" })
      )
      .catch((err) => res.status(400).json(err));
  },
  removeThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId }).then((data) => {
      if (!data) {
        res.status(200).json({ status: "No User with this Id" });
      }
      res.status(200).json({
        status: "Thought was deleted successfully!",
        deletedThough: data,
      });
    });
  },
  createReaction(req, res) {},
  removeReaction(req, res) {},
};
