const { Schema, model, Types } = require("mongoose");
// todo: Getters to format timestamp
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: { type: String, maxLength: 280 },
    username: { type: String, required: true },
    createdAt: {
      type: Date,
      default: Date.now,
      // get: (timestamp) => createDate(timestamp),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    _id: false,
  }
);
// GETTER function that returns time stamp
function createDate(createdAt) {
  return `This thought was created at: ${createdAt}`;
}
// Thought Schema
// username that creates the thought

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: [1, "A thought's 'thoughtText' can not be empty"],
      maxLength: [280, "A thought can not have more than 280 characters"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => createDate(timestamp),
    },
    username: { type: String, required: true },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

// Virtual that returns reactions array length
thoughtSchema.virtual("reactionsCount").get(function () {
  return this.reactions.length;
});

// Thought model
const Thought = model("thought", thoughtSchema);

module.exports = { Thought, reactionSchema };
