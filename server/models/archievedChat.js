const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const ArchivedChat = sequelize.define("archivedChat", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  text: Sequelize.STRING,
  userId: Sequelize.INTEGER,
  groupId: Sequelize.INTEGER,
  createdAt: Sequelize.DATE,
});

module.exports = ArchivedChat;
