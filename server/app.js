const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
const sequelize = require("./util/database");
const User = require("./models/users");
const Chat = require("./models/chat");

const userRoutes = require("./routes/users");
const passwordRoutes = require("./routes/password");
const chatRoutes = require("./routes/chat");

app.use(
  cors({
    origin: "null",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

app.use("/user", userRoutes);
app.use("/password", passwordRoutes);
app.use("/chat", chatRoutes);

User.hasMany(Chat, { foreignKey: "userId" });
Chat.belongsTo(User, { foreignKey: "userId" });

sequelize
  .sync()
  .then(() => {
    console.log("DB sync done");
  })
  .catch((err) => console.log(err));

app.listen(3000);
