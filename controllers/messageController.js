const prisma = require("../db/prisma");
const { body, validationResult } = require("express-validator");

exports.getChatrooms = async (req, res) => {
    try {
        const chatrooms = await prisma.chatroom.findMany({where: {
            user: {
                name: {
                    has: req.user.username
                },
            }
        },});
        return res.status(201).json(chatrooms)
    }
    catch(err) {
        return res.status(500).json({message: "Could not get chatrooms"})
    }
}

exports.getUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            orderBy: {
                name: 'asc',
            },
            where: {
                NOT: {name: req.user.username},
        },
    })
        return res.status(201).json(users);
    }
    catch(err) {
        return res.status(500).json({message: "Could not get users."})
    }
}

exports.createChatroomPost = async (req, res) => {
    try {
        // req.user.username--I meant to make it so that and users in list added
        let filteredUsers = [{user: req.user.username}];
        const users = req.body.user;
        if (Array.isArray(users)) {
            for (let i = 0; i < users.length; i++) {
                filteredUsers.push({user: users[i]});
            }
            const chatroom = await prisma.chatroom.create({data: {user: {connect: filteredUsers}}});
            return res.status(201).json(chatroom);
        }
        else if (users) {
            const chatroom = await prisma.chatroom.create({data: {user: {connect: [{user: req.user.username}, {user: users}]}}});
            return res.status(201).json(chatroom);
        }
        else {
            return res.status(400).json({message: "Invalid request"})
        }
    }
    catch(err) {
        return res.status(500).json({message: "Could not create chatroom"})
    }
}

exports.getChatroomMessages = async (req, res) => {
    try {
        const chatmessages = await prisma.message.findMany({where: {
            chatroomId: req.params
        }},)
        return res.status(201).json(chatmessages);
    }
    catch(err) {
        return res.status(500).json({message: "Could not get chatroom messages"});
    }
}

exports.createChatroomMessagePost = [ async (req, res) => {
    try {
        const message = await prisma.message.create({data: {}});
    }
    catch(err) {
        return res.status(500).json({message: "Could not post chatroom message"})
    }
} ]