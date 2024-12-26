const express = require("express");
const cors = require("cors");

const sequelize = require("./util/database");
const Users = require("./models/users");

const userRoutes = require("./routes/users");
const passwordRoutes = require("./routes/password");

const app = express();

app.use(
  cors({
    origin: "null",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);
app.use(express.json());

app.use("/user", userRoutes);
app.use("/password", passwordRoutes);

sequelize
  .sync()
  .then(() => {
    console.log("DB sync done");
  })
  .catch((err) => console.log(err));

app.listen(3000);
