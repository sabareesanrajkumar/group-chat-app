const User = require("../models/users");

exports.addMember = async (req, res, next) => {
  try {
    const { groupId } = req.params;
    const { userId } = req.body;
    const adminId = req.user.id;

    const adminMember = await GroupMembers.findOne({
      where: { groupId, userId: adminId, role: "admin" },
    });
    if (!adminMember) {
      return res.status(403).json({ error: "Only admins can add members." });
    }

    const newMember = await GroupMembers.create({
      groupId,
      userId,
      role: "member",
    });
    res.status(201).json({ success: true, newMember });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.removeMember = async (req, res, next) => {
  try {
    const { groupId } = req.params;
    const { userId } = req.body;
    const adminId = req.user.id;

    const adminMember = await GroupMembers.findOne({
      where: { groupId, userId: adminId, role: "admin" },
    });
    if (!adminMember) {
      return res.status(403).json({ error: "Only admins can remove members." });
    }

    if (userId === adminId) {
      return res
        .status(400)
        .json({ error: "Admins cannot remove themselves." });
    }

    const removed = await GroupMembers.destroy({ where: { groupId, userId } });
    if (removed) {
      res
        .status(200)
        .json({ success: true, message: "Member removed successfully." });
    } else {
      res.status(404).json({ error: "Member not found." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
