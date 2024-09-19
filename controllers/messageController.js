import { PrismaClient } from '@prisma/client'
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const prisma = new PrismaClient()

exports.getChatrooms = (req, res) => {
    
}

exports.createChatroomPost = (req, res) => {}

exports.getChatroomMessages = (req, res) => {}

exports.createChatroomMessagePost = (req, res) => {}