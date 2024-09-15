const { Router } = require('express');

const messageController = require('../controllers/messageController');

const messageRouter = Router({ mergeParams: true });

messageRouter.get('/:selectedid', messageController.getMessages);
messageRouter.get('/:messageid', messageController.getMessage);
messageRouter.post('/', messageController.createMessage);
messageRouter.put('/:messageid', messageController.editMessage);
messageRouter.delete('/:messageid', messageController.deleteMessage);

module.exports = messageRouter;