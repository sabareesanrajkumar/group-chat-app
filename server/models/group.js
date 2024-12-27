const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const User = require("./users");

const Group = sequelize.define("Group", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: Sequelize.STRING,
  admin: Sequelize.INTEGER,
});

module.exports = Group;
