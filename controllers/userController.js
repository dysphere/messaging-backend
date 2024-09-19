import { PrismaClient } from '@prisma/client'
import { options } from '../app';
const http = require('http');
const { body, validationResult } = require("express-validator");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const bcrypt = require("bcryptjs");
const passport = require("passport");

const prisma = new PrismaClient()

exports.HomeRedirect = (req, res) => {
    res.redirect('/signup')
}

const validateUser = [
    body("username").trim()
    .isAlphanumeric().withMessage(`Username must only contain alphanumeric characters`)
    .isLength({ min: 1, max: 10 }).withMessage(`Username ${lengthErr}`),
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

exports.userLoginPost = (req, res) => {
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/"
      })
}