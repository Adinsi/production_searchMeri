const mongoose = require("mongoose");

const schema = mongoose.Schema;

const userSchema = new schema(
  {
    nom: {
      type: String,
      required: true,
    },
    prenom: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },
    quartier: {
      type: String,
      required: true,
    },
    activite: {
      type: String,
      required: true,
    },
    tel: {
      type: String,
      required: true,
    },
    familly: {
      type: String,
    },

    password: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      default: "../uploads/profil/profil.png",
      // default: "./image/profil.png",
    },

    followers: {
      type: [String],
    },
    following: {
      type: [String],
    },
    likes: {
      type: [String],
    },
    signal: {
      type: [String],
    },

    date: {
      type: Date,
      default: Date.now(),
    },
    resetLink: {
      data: String,
      default: "",
    },
    verified: {
      type: Boolean,
      default: false,
    },
    posts: [
      {
        type: mongoose.Types.ObjectId,
        ref: "post",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
