const { Router } = require("express");
const usersRouter = Router();
const userController = require("../controllers/userController");

usersRouter.get('/', userController.HomeRedirect);

usersRouter.post('/signup', userController.createUserPost);

usersRouter.post('/login', userController.userLoginPost);

module.exports = usersRouter;
