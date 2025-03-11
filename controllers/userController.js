const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const prisma = require("../db/prisma");

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
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        // if err, do something
        if (err) {
            return next(err);
        }
        // otherwise, store hashedPassword in DB
        const post = await prisma.user.create({
            data: {
              username: req.body.username,
              password: hashedPassword,
            },
          })
          res.json(post);
      });
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