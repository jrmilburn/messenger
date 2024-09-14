const express = require("express");

const userRouter = require("./routes/user");
const messageRouter = require("./routes/message");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRouter);
app.use("/message", messageRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

