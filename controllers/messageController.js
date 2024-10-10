import { PrismaClient } from '@prisma/client'
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const { body, validationResult } = require("express-validator");

const prisma = new PrismaClient()

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
        let filteredUsers = [];
        const users = req.body.user;
        if (Array.isArray(users)) {
            for () {}
        }
        else if (users) {}
        else {}

        const chatroom = await prisma.chatroom.create({});
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
        const message = await prisma.message.create({})
    }
    catch(err) {
        return res.status(500).json({message: "Could not post chatroom message"})
    }
} ]