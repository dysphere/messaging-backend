const { Router } = require("express");
const passport = require("passport");
const messagesRouter = Router();
const messageController = require('../controllers/messageController');


messagesRouter.get('/', passport.authenticate("local"), messageController.getChatrooms);

messagesRouter.post('/new', passport.authenticate("local"), messageController.createChatroomPost);

messagesRouter.get('/:chatroom', passport.authenticate("local"), messageController.getChatroomMessages);

messagesRouter.post('/:chatroom/new', passport.authenticate("local"), messageController.createChatroomMessagePost);

module.exports = messagesRouter;
