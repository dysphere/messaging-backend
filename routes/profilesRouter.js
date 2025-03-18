const { Router } = require("express");
const { isAuth } = require("./auth");
const router = Router();
const profileController = require("../controllers/profileController");

router.get('/', isAuth, profileController.getProfiles);

router.get('/chatroom/:id', isAuth, profileController.getChatroomProfiles);

router.get('/:id', isAuth, profileController.getProfile);

router.put('/:id/update', isAuth, profileController.updateProfile);

module.exports = router;