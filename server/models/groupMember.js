const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const User = require("./users");

const GroupMember = sequelize.define("GroupMember", {
  userId: Sequelize.INTEGER,
  role: Sequelize.STRING,
});

module.exports = GroupMember;
