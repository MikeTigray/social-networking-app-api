const { Thought, reactionSchema, User } = require("../models");

module.exports = {
  getAllThoughts(req, res) {
    Thought.find({}, (err, documents) => {
      err ? res.status(404).json(err) : res.status(200).json(documents);
    });
  },
  async createThought(req, res) {
    try {
      const createdThought = await Thought.create(req.body);
      const associatedUser = await User.findOneAndUpdate(
        {
          username: createdThought.username,
        },
        { $push: { thoughts: createdThought._id } },
        { new: true }
      );

      res.status(201).json({
        status: "Thought created successfully 💭",
        thought: associatedUser,
      });
    } catch (error) {
      res.status(400).json(error);
    }
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
  async removeThought(req, res) {
    try {
      // Finds the thought to be deleted
      const thought = await Thought.findOne({ _id: req.params.thoughtId });
      if (!thought) {
        res.status(200).json({ status: "No User with this Id" });
      }

      // Finds the user associated to the thought
      const associatedUser = User.findOne({ username: thought.username });
      // Deletes the thought from user
      const removeFromUser = await associatedUser.updateOne({
        $pull: { thoughts: thought._id },
      });
      // Finally delete the thought document itself
      const deleted = await thought.deleteOne();

      res.status(200).json({
        status: "Thought was deleted successfully!",
        deletedThough: deleted,
        updatedUser: removeFromUser,
      });
    } catch (error) {
      res.status(400).json(error);
    }

    // Thought.findOneAndDelete({ _id: req.params.thoughtId }).then((data) => {
    //   if (!data) {
    //     res.status(200).json({ status: "No User with this Id" });
    //   }
    //   res.status(200).json({
    //     status: "Thought was deleted successfully!",
    //     deletedThough: data,
    //   });
    // });
  },
  async createReaction(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });
      const updated = await thought.updateOne({
        $push: { reactions: req.body },
      });
      res
        .status(200)
        .json({ status: "Reaction was added successfully!", result: updated });
    } catch (error) {
      res.status(400).json(error);
    }
  },

  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      {
        _id: req.params.thoughtId,
      },
      {
        $pull: {
          reactions: { reactionId: req.params.reactionId },
        },
      },
      { new: true, runValidators: true }
    )
      .then((result) => {
        res.status(200).json({
          status: "Reaction was deleted successfully!",
          results: result,
        });
      })
      .catch((error) => res.status(400).json(error));
  },
};
