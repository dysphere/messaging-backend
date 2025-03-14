const { Router } = require("express");
const passport = require("passport");
const router = Router();
const userController = require("../controllers/userController");

router.post('/:id/friend', passport.authenticate("local"), userController.addFriend);

router.post('/:id/unfriend', passport.authenticate("local"), userController.removeFriend);

router.get('/user', passport.authenticate("local"), userController.getCurrentUser);

router.post('/signup', userController.createUserPost);

router.post('/login', userController.userLoginPost);

router.post('/logout', userController.userLogoutPost);

module.exports = router;
