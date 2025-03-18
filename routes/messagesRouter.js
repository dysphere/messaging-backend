const { Router } = require("express");
const { isAuth } = require("./auth");
const router = Router();
const messageController = require('../controllers/messageController');

router.get('/', isAuth, messageController.getChatrooms);

router.get('/users', isAuth, messageController.getUsers);

router.post('/chat/:id/new', isAuth, messageController.createSmallChatroomPost);

router.post('/chat/new', isAuth, messageController.createChatroomPost);

router.delete('/chat/:chatroom/delete', isAuth, messageController.deleteChatroom);

router.get('/chat/:chatroom', isAuth, messageController.getChatroomMessages);

router.post('/chat/:chatroom/message', isAuth, messageController.createChatroomMessagePost);

router.put('/:id/update', isAuth, messageController.updateMessage);

router.delete('/:id/delete', isAuth, messageController.deleteMessage);

module.exports = router;
