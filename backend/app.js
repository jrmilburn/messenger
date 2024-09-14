const express = require("express");
const cors = require("cors");
const session = require("express-session");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const { passport, prisma } = require("./config/passport");
require("dotenv").config();

const userRouter = require("./routes/user");
const messageRouter = require("./routes/message");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(passport.initialize());

app.use("/user", passport.authenticate('jwt', { session: false }), userRouter);
app.use("/message", passport.authenticate('jwt', { session: false }), messageRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

