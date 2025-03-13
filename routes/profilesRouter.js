const { Router } = require("express");
const passport = require("passport");
const router = Router();
const profileController = require("../controllers/profileController");

router.get('/', passport.authenticate("local"), profileController.getProfiles);

router.get('/chatroom/:id', passport.authenticate("local"), profileController.getChatroomProfiles);

router.post('/create', passport.authenticate("local"), profileController.createProfile);

router.get('/:id', passport.authenticate("local"), profileController.getProfile);

router.put('/:id/update', passport.authenticate("local"), profileController.updateProfile);

module.exports = router;