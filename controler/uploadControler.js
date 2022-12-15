const UserModel = require("../models/user");
const multer = require("multer");
const fs = require("fs");
const { promisify } = require("util");
const { uploadErrors, uploadError } = require("../utils/error");

const pipeline = promisify(require("stream").pipeline);

const fileupoad = require("express-fileupload");

module.exports.uploadProfil = async (req, res) => {
  try {
    if (
      req.file.detectedMineType != "image/jpg" &&
      req.file.detectedMineType != "image/png" &&
      req.file.detectedMineType != "image/jpeg"
    )
      throw Error("Invalid File");

    if (req.file.size > 500000) throw Error("max size");
  } catch (error) {
    const errors = uploadError(error);
    res.status(400).json({ errors });
  }

  // const fileName = `${req.body.name}.jpg`;

  // await pipeline(
  //   req.file.stream,
  //   fs.createWriteStream(
  //     `${__dirname}/../client/public/uploads/profil/${fileName}`
  //   )
  // );

  // const storage = multer.diskStorage({
  //   destination: (req, file, cb) => {
  //     cb(null, "../client/public/uploads/prof");
  //   },
  //   filename: (req, file, cb) => {
  //     cb(null, req.body.name);
  //   },
  // });
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./image");
    },
    filename: (req, file, cb) => {
      cb(null, `${req.body.name}.jpg`);
    },
  });
  try {
    await UserModel.findByIdAndUpdate(
      req.body.userId,
      {
        $set: { picture: `./image/${req.body.name}.jpg` },
      },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      },
      (error, docs) => {
        if (!error) return res.status(200).json(docs);
        else return res.status(500).json({ message: error });
      }
    );
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
