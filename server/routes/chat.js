const express = require("express");
const router = express.Router();

const chatController = require("../controllers/chat");
const userAuthentication = require("../middleware/auth");

router.get("/", userAuthentication.authenticate, chatController.getChat);
router.post("/send", userAuthentication.authenticate, chatController.send);

module.exports = router;
