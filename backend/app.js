const express = require("express");
const cors = require("cors");
const session = require("express-session");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const { passport, prisma } = require("./config/passport");
require("dotenv").config();

const http = require('http');
const { Server } = require('socket.io');

const userRouter = require("./routes/userRouter");
const authenticationRouter = require("./routes/authenticationRouter");
const messageRouter = require('./routes/messageRouter');
const friendRouter = require('./routes/friendRouter');


const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(passport.initialize());

app.use("/user", passport.authenticate('jwt', { session: false }), userRouter);
app.use("/friend", passport.authenticate('jwt', { session: false }), friendRouter);
app.use("/", authenticationRouter);
app.use('/user/:id/message', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  req.io = io;
  next();
},messageRouter);

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});

