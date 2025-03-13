const { Router } = require("express");
const passport = require("passport");
const router = Router();
const messageController = require('../controllers/messageController');

router.get('/', passport.authenticate("local"), messageController.getChatrooms);

router.get('/users', passport.authenticate("local"), messageController.getUsers);

router.post('/:id/new', passport.authenticate("local"), messageController.createSmallChatroomPost);

router.post('/new', passport.authenticate("local"), messageController.createChatroomPost);

router.delete('/:chatroom/delete', passport.authenticate("local"), messageController.deleteChatroom);

router.get('/:chatroom', passport.authenticate("local"), messageController.getChatroomMessages);

router.post('/:chatroom/new', passport.authenticate("local"), messageController.createChatroomMessagePost);

router.put('/:id/update', passport.authenticate("local"), messageController.updateMessage);

router.delete('/:id/delete', passport.authenticate("local"), messageController.deleteMessage);

module.exports = router;
