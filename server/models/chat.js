const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const User = require("./users");
const { group } = require("node:console");

const Chat = sequelize.define("Chat", {
  text: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  groupId: Sequelize.INTEGER,
  timestamp: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
  fileUrl: DataTypes.STRING,
});

module.exports = Chat;
