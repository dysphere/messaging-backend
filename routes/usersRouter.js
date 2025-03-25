const { Router } = require("express");
const passport = require('passport');
const router = Router();
const userController = require("../controllers/userController");

router.put('/:id/friend', passport.authenticate('jwt'), userController.addFriend);

router.put('/:id/unfriend', passport.authenticate('jwt'), userController.removeFriend);

router.get('/user', passport.authenticate('jwt'), userController.getCurrentUser);

router.post('/signup', userController.createUserPost);

router.post('/login', userController.userLoginPost);

router.post('/logout', userController.userLogoutPost);

module.exports = router;
