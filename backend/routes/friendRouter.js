const { Router } = require('express');

const userController = require('../controllers/userController');

const friendRouter = Router();

friendRouter.get('/', userController.getFriends);
friendRouter.post('/:id', userController.createFriendship);

module.exports = friendRouter;