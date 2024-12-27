const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const User = require("./users");

const Chat = sequelize.define("Chat", {
  text: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  timestamp: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
});

module.exports = Chat;
