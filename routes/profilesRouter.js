const { Router } = require("express");
const passport = require('passport');
const router = Router();
const profileController = require("../controllers/profileController");

router.get('/', passport.authenticate('jwt'), profileController.getProfiles);

router.get('/chat/:id', passport.authenticate('jwt'), profileController.getChatroomUsers);

router.get('/:id', passport.authenticate('jwt'), profileController.getProfile);

router.put('/:id/update', passport.authenticate('jwt'), profileController.updateProfile);

module.exports = router;