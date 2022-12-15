const router = require("express").Router();
const messageController = require("../controler/messageController");

router.post("/", messageController.addMessage);
router.get("/:chatId", messageController.getMessages);

module.exports = router;
