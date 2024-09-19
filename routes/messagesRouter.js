const { Router } = require("express");
const messagesRouter = Router();
const messageController = require('../controllers/messageController');


messagesRouter.get('/', messageController.getChatrooms);

messagesRouter.post('/new', messageController.createChatroomPost);

messagesRouter.get('/:chatroom', messageController.getChatroomMessages);

messagesRouter.post('/:chatroom/new', messageController.createChatroomMessagePost);

module.exports = messagesRouter;
