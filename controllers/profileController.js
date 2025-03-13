const prisma = require("../db/prisma");

exports.getProfiles = async (req, res) => {
    try {
        const profiles = await prisma.profile.findMany({
            orderBy: {
              user: {
                name: 'asc',
              },
            },
          });
        return res.status(201).json(profiles);
    }
    catch(error) {
        return res.status(500).json({message: "Could not find profiles"});
    }
}

exports.getChatroomProfiles = async (req, res) => {
    try {
        const profiles = await prisma.profile.findMany({
            where: {
              user: {
                some: {
                    chatroom: {
                        is: {
                            id: parseInt(req.params.id),
                        }
                    }
                }
              }
            },
          });
          return res.status(201).json(profiles);
    }
    catch(error) {
        return res.status(500).json({message: "Could not find profiles for chatroom"});
    }
}

exports.createProfile = async (req, res) => {
    try {
        const profile = await prisma.profile.create({
            data: {
              bio: req.body.bio,
              userId: req.user.id,
            },
          });
          return res.status(201).json(profile);
    }
    catch(error) {
        return res.status(500).json({message: "Could not create profile"});
    }
}

exports.getProfile = async (req, res) => {
    try {
        const profile = await prisma.profile.findUnique({});
    }
    catch(error) {
        return res.status(500).json({message: "Could not get profile"});
    }
}

exports.updateProfile = async (req, res) => {
    try {
        const profile = await prisma.profile.update({
            where: {
              id: parseInt(req.params.id),
            },
            data: {
              bio: req.body.bio,
            },
          });
          return res.status(201).json(profile);
    }
    catch(error) {
        return res.status(500).json({message: "Could not update profile"});
    }
}