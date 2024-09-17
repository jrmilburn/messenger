const { Router } = require('express');

const userController = require('../controllers/userController');

const userRouter = Router();

userRouter.get('/', userController.getNotFriends);
userRouter.get('/:id', userController.getUser);
userRouter.post('/', userController.createUser);
userRouter.put('/:id', userController.editUser);
userRouter.delete('/:id', userController.deleteUser);

userRouter.post('/:id/friend', userController.createFriendship);

module.exports = userRouter;