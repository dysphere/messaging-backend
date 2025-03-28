const prisma = require("../db/prisma");

exports.getProfiles = async (req, res) => {
    try {
        const profiles = await prisma.profile.findMany();
        return res.status(200).json({profiles});
    }
    catch(error) {
        return res.status(500).json({message: "Could not find profiles"});
    }
}

exports.getChatroomUsers = async (req, res) => {
    try {
        const users = await prisma.chatroom.findUnique({  
            where: {
                id: parseInt(req.params.id),
              },
            include: {
            user: true,
          },});
          return res.status(200).json({users});
    }
    catch(error) {
        return res.status(500).json({message: "Could not find profiles for chatroom"});
    }
}

exports.getProfile = async (req, res) => {
    try {
        const profile = await prisma.profile.findUnique({
            where: {
                id: parseInt(req.params.id),
              },
              include: {
                user: true,
              },
        });
        return res.status(200).json({profile});
    }
    catch(error) {
        return res.status(500).json({message: "Could not get profile"});
    }
}

exports.updateProfile = async (req, res) => {
    try {
        const profile_read = await prisma.profile.findUnique({
            where: {
                id: parseInt(req.params.id),
              },
        });
        if (profile_read.userId === req.user.id) {
        const profile = await prisma.profile.update({
            where: {
              id: parseInt(req.params.id),
            },
            data: {
              bio: req.body.bio,
            },
          });
          return res.status(201).json({profile});
        }
        else {
            return res.status(403).json({message: "Invalid user"});
        }
    }
    catch(error) {
        return res.status(500).json({message: "Could not update profile"});
    }
}