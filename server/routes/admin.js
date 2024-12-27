const express = require("express");
const router = express.Router();

const adminController = require("../controllers/admin");
const userAuthentication = require("../middleware/auth");

router.get(
  "/:groupId/add",
  userAuthentication.authenticate,
  adminController.addMember
);
router.post(
  "/:groupId/remove",
  userAuthentication.authenticate,
  adminController.removeMember
);

module.exports = router;
