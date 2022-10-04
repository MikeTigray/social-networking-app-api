const { Schema, model, Types } = require("mongoose");
// todo: Getters to format timestamp

function formatTime(createdAt, model) {
  return `This ${model} was created on ${createdAt.toDateString()} at ${createdAt.getHours()}:${createdAt.getMinutes()}`;
}

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
      default: new Date(),
      get: (createdAt) => formatTime(createdAt, "reaction"),
    },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    _id: false,
  }
);
// GETTER function that formats time for thought and reaction

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
      default: new Date(),
      get: (createdAt) => formatTime(createdAt, "thought"),
    },
    username: { type: String, required: true },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
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
