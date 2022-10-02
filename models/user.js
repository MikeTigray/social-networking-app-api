const { Schema, model } = require("mongoose");

// User Schema

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Must have a username"],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "A user must have an email."],
      unique: true,
      match: [
        /([a-zA-Z0-9-_\.]+)(@\w+\.)(\w{2,6})/,
        "User must have a valid email address.",
      ],
    },
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
    thoughtText: {
      type: String,
      required: true,
      minLength: [1, "A thought's 'thoughtText' can not be empty"],
      maxLength: [280, "A thought can not have more than 280 characters"],
    },
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

const reactionSchema = new Schema({
  reactionId: {},
  reactionBody: { type: String, maxLength: 280 },
  username: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  get: formatTimeStamp,
});

// GETTER function that returns time stamp
function formatTimeStamp() {
  return `This thought was created at: ${createdAt}`;
}
// User and Thought models
const User = model("user", userSchema);
const Thought = model("thought", thoughtSchema);
