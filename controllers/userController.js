const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const prisma = require("../db/prisma");

exports.addFriend = async (req, res) => {
  try {
    const friend = await prisma.user.update({
      where: {
        id: req.user.id,
      },
      data: {
        friends: {
          connect: { id: parseInt(req.params.id)},
        },
      },
    });
    const friend_2 = await prisma.user.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        friendedBy: {
          connect: { id: req.user.id},
        },
      },
    });
    res.json(friend, friend_2);
   } catch (error) {
      console.error(error);
      next(error);
     }
}

exports.removeFriend = async (req, res) => {
  try {
    const unfriend = await prisma.user.update({
      where: {
        id: req.user.id,
      },
      data: {
        friends: {
          disconnect: { id: parseInt(req.params.id)},
        },
      },
    });
    const unfriend_2 = await prisma.user.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        friendedBy: {
          disconnect: { id: req.user.id},
        },
      },
    });
    res.json(unfriend, unfriend_2);
   } catch (error) {
      console.error(error);
      next(error);
     }
}

exports.HomeRedirect = (req, res) => {
    res.redirect('/signup')
}

const validateUser = [
    body("username").trim()
    .isAlphanumeric().withMessage(`Username must only contain alphanumeric characters`)
    .isLength({ min: 1, max: 10 }).withMessage(`Username must be between 1 and 10 characters`),
  body("password").trim()
    .isStrongPassword({options: {minLength: 5}}).withMessage("Password is not long enough")
]

exports.createUserPost = [ validateUser, async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await prisma.user.create({
     data: {
       username: req.body.username,
       password: hashedPassword,
     },
   });
   res.json(user);
    res.redirect("/");
   } catch (error) {
      console.error(error);
      next(error);
     }
}
]
exports.userLoginPost = 
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/"
      })

exports.userLogoutPost = (req, res, next) => {
    req.logout((err) => {
        if (err) {
          return next(err);
        }
        res.redirect("/");
      });
}