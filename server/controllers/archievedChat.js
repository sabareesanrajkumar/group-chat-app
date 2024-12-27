const cron = require("node-cron");
const Chat = require("../models/chat");
const ArchivedChat = require("../models/archivedChat");
const sequelize = require("../util/database");

const archiveMessages = async () => {
  try {
    const transaction = await sequelize.transaction();

    const oldMessages = await Chat.findAll({
      where: {
        createdAt: {
          [Sequelize.Op.lt]: new Date(new Date() - 24 * 60 * 60 * 1000),
        },
      },
      transaction,
    });

    if (oldMessages.length > 0) {
      const archivedMessages = oldMessages.map((msg) => ({
        id: msg.id,
        text: msg.text,
        userId: msg.userId,
        groupId: msg.groupId,
        createdAt: msg.createdAt,
      }));
      await ArchivedChat.bulkCreate(archivedMessages, { transaction });

      await Chat.destroy({
        where: {
          id: oldMessages.map((msg) => msg.id),
        },
        transaction,
      });

      await transaction.commit();
      console.log("Archived and deleted old messages successfully");
    } else {
      await transaction.rollback();
      console.log("No old messages to archive");
    }
  } catch (error) {
    console.error("Error archiving messages:", error);
  }
};

cron.schedule("0 0 * * *", archiveMessages);
