const { Router } = require('express');

const userController = require('../controllers/userController');

const messageRouter = require('./messageRouter');
const userRouter = Router();

userRouter.get('/', userController.getUsers);
userRouter.get('/:id', userController.getUser);
userRouter.post('/', userController.createUser);
userRouter.put('/:id', userController.editUser);
userRouter.delete('/:id', userController.deleteUser);

userRouter.post('/:id/friend', userController.createFriendship);
userRouter.get('/:id/friend', userController.getFriends);

userRouter.use('/:id/message', messageRouter);

module.exports = userRouter;