const { Router } = require("express");
const { isAuth } = require("./auth");
const router = Router();
const userController = require("../controllers/userController");

router.put('/:id/friend', isAuth, userController.addFriend);

router.put('/:id/unfriend', isAuth, userController.removeFriend);

router.get('/user', isAuth, userController.getCurrentUser);

router.post('/signup', userController.createUserPost);

router.post('/login', userController.userLoginPost);

router.post('/logout', userController.userLogoutPost);

module.exports = router;
