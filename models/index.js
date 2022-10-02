const { Thought, reactionSchema } = require("./thought");
const { collection } = require("./user");
const User = require("./user");
const { userData, thoughtData, reactionData } = require("../utils/data");

User.find({}).exec((err, collection) => {
  if (collection.length === 0) {
    User.insertMany(userData, (err, results) => {
      err ? console.log(err) : console.log(results);
    });
  }
});

Thought.find({}).exec((err, collection) => {
  if (collection.length === 0) {
    Thought.insertMany(thoughtData, (err, results) => {
      err ? console.log(err) : console.log(results);
    });
  }
});

module.exports = { Thought, User, reactionSchema };
