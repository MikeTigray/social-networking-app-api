const { Schema, model } = require("mongoose");

// User Schema
// Don't forget email validator
const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true },
    thoughts: [{ type: Schema.Types.ObjectId, ref: "thought" }],
    friends: [{ type: Schema.Types.ObjectId, ref: "user" }],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Virtual that returns friends array length
userSchema.virtual("friendsCount").get(function () {
  return this.friends.length;
});

// Thought Schema
// username that creates the thought
const thoughtSchema = new Schema(
  {
    thoughtText: { type: String, required: true, minLength: 1, maxLength: 280 },
    createdAt: { type: Date, default: Date.now },
    username: { type: String, required: true },
    reactions: [],
    get: formatTimeStamp,
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Virtual that returns reactions array length
thoughtSchema.virtual("reactionsCount").get(function () {
  return this.reactions.length;
});

// GETTER function for thoughts Schema Date
function formatTimeStamp() {
  return `This thought was created at: ${createdAt}`;
}
// User and Thought models
const User = model("user", userSchema);
const Thought = model("thought", thoughtSchema);
