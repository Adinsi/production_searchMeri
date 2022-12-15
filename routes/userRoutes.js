const router = require("express").Router();
const authControler = require("../controler/authControler");
const uploadControler = require("../controler/uploadControler");
const UserControler = require("../controler/UserControler");
const userAuthMiddelware = require("../middleware/auth.middleware");
const multer = require("multer");
const upload = multer();

// Auth
router.put("/forget-password", authControler.forgetPassword); //ok
router.put("/reset-password", authControler.resetPassword); //ok
router.get("/jwt", authControler.verifyToken, authControler.getUser); //ok
router.post("/logout", authControler.verifyToken, authControler.logOut); //ok
router.post("/register", authControler.signUp); //ok
router.post("/login", authControler.signIn); //ok
router.get("/:id", UserControler.userInfo); //ok
router.post("/upload", upload.single("file"), uploadControler.uploadProfil); //ok
router.put("/:id", UserControler.UpdateUser); //ok

router.delete("/:id", authControler.verifyToken, UserControler.deleteUser); //ok

// Upload d'image

//user DB
router.get(
  "/",
  // authControler.verifyToken,
  UserControler.getAllUsers
);

//Mettre a jour le tablaeu des utilisateurs
router.patch("/follow/:id", UserControler.follow);

router.patch("/unfollow/:id", UserControler.unfollow);

router.get(
  "/refresh",
  authControler.RefreshToken,
  authControler.verifyToken,
  authControler.getUser
);

module.exports = router;
