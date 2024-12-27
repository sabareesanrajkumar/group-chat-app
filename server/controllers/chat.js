const Chat = require("../models/chat");
const User = require("../models/users");

exports.getChat = async (req, res, next) => {
  try {
    const messages = await Chat.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
    res.status(200).json({ success: true, messages: messages });
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
