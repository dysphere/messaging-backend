const { Router } = require("express");
const passport = require('passport');
const router = Router();
const messageController = require('../controllers/messageController');

router.get('/', passport.authenticate('jwt'), messageController.getChatrooms);

router.get('/users', passport.authenticate('jwt'), messageController.getUsers);

router.post('/chat/:id/new', passport.authenticate('jwt'), messageController.createSmallChatroomPost);

router.post('/chat/new', passport.authenticate('jwt'), messageController.createChatroomPost);

router.delete('/chat/:chatroom/delete', passport.authenticate('jwt'), messageController.deleteChatroom);

router.get('/chat/:chatroom', passport.authenticate('jwt'), messageController.getChatroomMessages);

router.post('/chat/:chatroom/message', passport.authenticate('jwt'), messageController.createChatroomMessagePost);

router.put('/:id/update', passport.authenticate('jwt'), messageController.updateMessage);

router.delete('/:id/delete', passport.authenticate('jwt'), messageController.deleteMessage);

module.exports = router;
