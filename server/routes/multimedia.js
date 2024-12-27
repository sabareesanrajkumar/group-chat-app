const express = require("express");
const router = express.Router();

const multimediaController = require("../controllers/multimedia");
const userAuthentication = require("../middleware/auth");

router.post(
  "/sendfile",
  userAuthentication.authenticate,
  multimediaController.sendFile
);

module.exports = router;
