const { Schema, model } = require("mongoose");

// User Schema

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "A user must have a username"],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "A user must have an email."],
      unique: true,
      match: [
        /([a-zA-Z0-9-_\.]+)(@\w+\.)(\w{2,6})/,
        "A user must have a valid email address.",
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

// User model
const User = model("user", userSchema);

module.exports = User;
