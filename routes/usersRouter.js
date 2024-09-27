const { Router } = require("express");
const usersRouter = Router();
const userController = require("../controllers/userController");

usersRouter.get('/', userController.HomeRedirect);

usersRouter.post('/signup', userController.createUserPost);

usersRouter.post('/login', userController.userLoginPost);

usersRouter.post('/guestlogin', userController.anonLoginPost);

usersRouter.post('/logout', userController.userLogoutPost);

module.exports = usersRouter;
