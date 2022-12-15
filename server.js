require("dotenv").config({ path: "./config/.env" });
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const UserRoutes = require("./routes/userRoutes");
const PostRoutes = require("./routes/postRoutes");
const ChatRoutes = require("./routes/chatRoutes");
const MessageRoutes = require("./routes/messageRoutes");
const UserModel = require("./models/user");
const PostModel = require("./models/post.models");

const multer = require("multer");
const { uploadErrors } = require("./utils/error");

require("./config/db");
const cors = require("cors");
const { checkUser, requireAuth } = require("./middleware/auth.middleware");

const app = express();

const corsOption = {
  origin: process.env.CLIENT_URL,
  Credential: true,
  allowedHeaders: ["sessionId", "content-Type"],
  exposedHeaders: ["sessionId"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};
// app.use(
//   cors({ credentials: true, origin: `https://searchmeri.herokuapp.com/` })
// );
app.use(cors({ credentials: true, origin: `http://localhost:3000` }));
app.use(cookieParser());
app.use(bodyParser.json()); // Transformer les body en json
app.use(
  "./client/public/image",
  express.static(path.join(__dirname, "./client/public/image"))
);
app.use(
  "./client/public/posts",
  express.static(path.join(__dirname, "./client/public/posts"))
);
app.use(bodyParser.urlencoded({ extended: true }));

// jwt

//Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./client/public/image");
  },
  filename: (req, file, cb) => {
    cb(null, `${req.body.name}.jpg`);
  },
});
const upload = multer({ storage: storage });

app.post("/single", upload.single("image"), async (req, res) => {
  // console.log(req.file);
  try {
    if (
      req.file.detectedMineType != "image/jpg" &&
      req.file.detectedMineType != "image/png" &&
      req.file.detectedMineType != "image/jpeg"
    )
      throw Error("Invalid File");

    if (req.file.size > 500000) throw Error("max size");
  } catch (error) {
    // const errors = uploadErrors(error);
    // res.status(400).json({ error });
  }

  const filename = req.body.userId;
  try {
    await UserModel.findByIdAndUpdate(
      req.body.userId,
      {
        $set: { picture: `../image/${req.body.name}.jpg` },
      },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      },
      (error, docs) => {
        if (!error) {
          return res.status(200).json(docs);
        } else return res.send(error);
      }
    );
  } catch (error) {
    // return res.send(error);
  }
});

//routes
app.use("/api/user", UserRoutes);
app.use("/api/post", PostRoutes);
app.use("/api/chat", ChatRoutes);
app.use("/api/message", MessageRoutes);
app.use(express.static(path.join(__dirname, "./client")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

//server
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
app.listen(process.env.PORT || 7500, () => console.log(`Back is running`));
