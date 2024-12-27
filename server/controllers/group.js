const Chat = require("../models/chat");
const User = require("../models/users");
const Group = require("../models/group");
const GroupMember = require("../models/groupMember");
const { Op } = require("sequelize");

exports.createGroup = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const group = await Group.create({
      name,
      description,
      admin: req.user.id,
    });
    console.log(group.dataValues.id);
    await GroupMember.create({
      userId: req.user.id,
      GroupId: group.dataValues.id,
      role: "admin",
    });

    res.status(201).json(group);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getGroup = async (req, res, next) => {
  try {
    const groups = await Group.findAll();
    res.status(200).json(groups);
  } catch (err) {
    res.status(500).json({ error: error.message });
  }
};
