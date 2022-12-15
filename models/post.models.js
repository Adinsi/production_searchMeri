const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    posterId: {
      type: String,
      required: true,
    },

    picture: {
      type: String,
    },
    video: {
      type: String,
    },

    activitePost: {
      type: String,
      required: true,
      trim: true,
    },
    quartierPost: {
      type: String,
      required: true,
      trim: true,
    },
    emailPoster: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      trim: true,
    },

    likers: {
      type: [String],
      required: true,
    },
    signal: {
      type: [String],
      required: true,
    },
    comments: {
      type: [
        {
          commenterId: String,

          text: String,
          timestamp: Number,
        },
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("post", PostSchema);
