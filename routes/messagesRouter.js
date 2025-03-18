const { Router } = require("express");
const { isAuth } = require("./auth");
const router = Router();
const messageController = require('../controllers/messageController');

router.get('/', isAuth, messageController.getChatrooms);

router.get('/users', isAuth, messageController.getUsers);

router.post('/:id/new', isAuth, messageController.createSmallChatroomPost);

router.post('/new', isAuth, messageController.createChatroomPost);

router.delete('/:chatroom/delete', isAuth, messageController.deleteChatroom);

router.get('/:chatroom', isAuth, messageController.getChatroomMessages);

router.post('/:chatroom/new', isAuth, messageController.createChatroomMessagePost);

router.put('/:id/update', isAuth, messageController.updateMessage);

router.delete('/:id/delete', isAuth, messageController.deleteMessage);

module.exports = router;
