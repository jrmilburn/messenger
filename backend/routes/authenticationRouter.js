const { Router } = require("express");

const authenticationRouter = Router();

const { login, createUser } = require("../controllers/userController");

authenticationRouter.post("/login", login);
authenticationRouter.post("/register", createUser);

module.exports = authenticationRouter;