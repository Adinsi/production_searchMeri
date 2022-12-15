const router = require("express").Router();
const postController = require("../controler/postcontroler");
const authControler = require("../controler/authControler");
const multer = require("multer");

const storages = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./client/public/posts");
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});
const uploads = multer({ storage: storages });

router.get("/", authControler.verifyToken, postController.readPost);
router.post("/", uploads.single("posts"), postController.createPost);
router.get("/:id", postController.userPost);
router.put("/:id", authControler.verifyToken, postController.updatePost);
router.delete("/:id", authControler.verifyToken, postController.deletePost);
router.get("/user/:id", authControler.verifyToken, postController.getByUserId);
router.patch(
  "/signal-post/:id",
  authControler.verifyToken,
  postController.SignalPost
);
router.patch(
  "/like-post/:id",
  authControler.verifyToken,
  postController.likePost
);
router.patch(
  "/unsignal-post/:id",
  authControler.verifyToken,
  postController.unSignalPost
);
router.patch(
  "/unlike-post/:id",
  authControler.verifyToken,
  postController.unlikePost
);

// comments
router.patch(
  "/comment-post/:id",
  authControler.verifyToken,
  postController.commentPost
);
router.patch("/edit-comment-post/:id", postController.editCommentPost);
router.patch(
  "/delete-comment-post/:id",
  authControler.verifyToken,
  postController.deleteCommentPost
);
module.exports = router;
