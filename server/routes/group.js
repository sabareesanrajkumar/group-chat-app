const express = require("express");
const router = express.Router();

const groupController = require("../controllers/group");
const userAuthentication = require("../middleware/auth");

router.post(
  "/create",
  userAuthentication.authenticate,
  groupController.createGroup
);

router.get("/", userAuthentication.authenticate, groupController.getGroup);

module.exports = router;
