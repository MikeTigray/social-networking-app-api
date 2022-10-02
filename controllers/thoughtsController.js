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
  getSingleThought(req, res) {},
  updateThought(req, res) {},
  removeThought(req, res) {},
  createReaction(req, res) {},
  removeReaction(req, res) {},
};
