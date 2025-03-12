const { Router } = require("express");
const router = Router();
const userController = require("../controllers/userController");

router.get('/', userController.HomeRedirect);

router.post('/signup', userController.createUserPost);

router.post('/login', userController.userLoginPost);

router.post('/logout', userController.userLogoutPost);

module.exports = router;
