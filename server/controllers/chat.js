const Chat = require("../models/chat");
const User = require("../models/users");
const { Op } = require("sequelize");

exports.getChat = async (req, res, next) => {
  try {
    const lastFetchedId = req.query.lastFetchedId;
    const groupId = req.query.groupId;
    console.log(req.query);
    const whereCondition = {
      groupId,
      ...(lastFetchedId && { id: { [Op.gt]: lastFetchedId } }),
    };
    const messages = await Chat.findAll({
      where: whereCondition,
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
      order: [["createdAt", "ASC"]],
    });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.send = async (req, res, next) => {
  try {
    const { text, groupId, fileUrl } = req.body;
    const userId = req.user.id;
    const chat = await Chat.create({
      userId: userId,
      text: text,
      groupId: groupId,
      fileUrl: fileUrl,
    });
    res.status(201).json({ success: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
