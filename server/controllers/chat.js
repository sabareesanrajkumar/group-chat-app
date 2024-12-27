const Chat = require("../models/chat");
const User = require("../models/users");
const { Op } = require("sequelize");

exports.getChat = async (req, res, next) => {
  try {
    const lastFetchedId = req.query.lastFetchedId;
    const whereCondition = lastFetchedId
      ? { id: { [Op.gt]: lastFetchedId } }
      : {};

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
    const { text } = req.body;
    const userId = req.user.id;
    const chat = await Chat.create({ userId: userId, text: text });
    res.status(201).json({ success: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
