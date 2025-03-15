const prisma = require("../db/prisma");

exports.getChatrooms = async (req, res) => {
    try {
        const chatrooms = await prisma.chatroom.findMany({where: {
            user: {
                name: {
                    has: req.user.username,
                },
            }
        },});
        return res.status(201).json({chatrooms});
    }
    catch(err) {
        return res.status(500).json({message: "Could not get chatrooms"});
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
    });
        return res.status(201).json({users});
    }
    catch(err) {
        return res.status(500).json({message: "Could not get users."});
    }
}

exports.createSmallChatroomPost = async (req, res) => {
    try {
        const chatroom = await prisma.chatroom.create({
            data: {
                user: {
                    connect: [{id: req.user.id}, {id: parseInt(req.params.id)}],
                }
              },
        });
        return res.status(201).json({chatroom});
    }
    catch(err) {
        return res.status(500).json({message: "Could not create chatroom"});
    }
}

exports.createChatroomPost = async (req, res) => {
    try {
        let filteredUsers = [{id: req.user.id}];
        const users = req.body.user;
        if (Array.isArray(users)) {
            for (let i = 0; i < users.length; i++) {
                filteredUsers.push({id: users[i]});
            }
            const chatroom = await prisma.chatroom.create({data: {user: {connect: filteredUsers}}});
            return res.status(201).json({chatroom});
        }
        else if (users) {
            const chatroom = await prisma.chatroom.create({data: {user: {connect: [{id: req.user.id}, {id: users}]}}});
            return res.status(201).json({chatroom});
        }
        else {
            return res.status(400).json({message: "Invalid request"});
        }
    }
    catch(err) {
        return res.status(500).json({message: "Could not create chatroom"});
    }
}

exports.deleteChatroom = async (req, res) => {
    try {
        const chatroom = await prisma.chatroom.delete({
            where: {
              id: parseInt(req.params.chatroom),
            },
          });
          return res.status(201).json({chatroom});
    }
    catch(err) {
        return res.status(500).json({message: "Could not delete chatroom"});
    }
}

exports.getChatroomMessages = async (req, res) => {
    try {
        const chatmessages = await prisma.message.findMany({
            orderBy: {
                createdAt: 'asc',
            },
            where: {
            chatroomId: parseInt(req.params.chatroom),
        }},)
        return res.status(201).json({chatmessages});
    }
    catch(err) {
        return res.status(500).json({message: "Could not get chatroom messages"});
    }
}

exports.createChatroomMessagePost = async (req, res) => {
    try {
        const message = await prisma.message.create({data: {
            content: req.body.content,
            chatroomId: parseInt(req.params.chatroom),
            userId: req.user.id,
        }});
        return res.status(201).json({message});
    }
    catch(err) {
        return res.status(500).json({message: "Could not post chatroom message"});
    }
} 

exports.updateMessage = async (req, res) => {
    try {
        const user = await prisma.message.findUnique({
            where: {
                id: parseInt(req.params.id),
              },
        });
        if (user.userId === req.user.id) {
        const message = await prisma.message.update({
            where: {
                id: parseInt(req.params.id),
              },
              data: {
                content: req.body.content,
              },
        });
        return res.status(201).json({message});
    }
    else {
        return res.status(403).json({message: "Invalid user"});
    }
    }
    catch(err) {
        return res.status(500).json({message: "Could not update chatroom message"});
    }
}

exports.deleteMessage = async (req, res) => {
    try {
        const user = await prisma.message.findUnique({
            where: {
                id: parseInt(req.params.id),
              },
        });
        if (user.userId === req.user.id) {
        const message = await prisma.message.delete({
            where: {
                id: parseInt(req.params.id),
              },
        });
        return res.status(201).json({message});
    }
    else {
        return res.status(403).json({message: "Invalid user"});
    }
    }
    catch(err) {
        return res.status(500).json({message: "Could not post chatroom message"});
    }
}