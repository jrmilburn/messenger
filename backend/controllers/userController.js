const { prisma } = require("../config/passport");

async function getUsers(req, res) {
    try {
        const users = await prisma.user.findMany({
            where: {
             
            }
        });

        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getUser(req, res) {
    try {
        const { id } = req.params;

        const user = await prisma.user.findUnique({
            where: {
                id: id
            }
        });

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function createUser(req, res) {
    try {
        const { email, password, username } = req.body;

        const user = await prisma.user.create({
            data: {
                email,
                username,
                password
            }
        });

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function editUser(req, res) {
    try {
        const { id } = req.params;
        const { email, password, username, bio, pfp, status } = req.body;

        const user = await prisma.user.update({
            where: {
                id: id
            },
            data: {
                email: email,
                password: password,
                username: username,
                bio: bio,
                pfp: pfp,
                status: status
            }
        });

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function deleteUser(req, res) {
    try {
        const { id } = req.params;

        await prisma.user.delete({
            where: {
                id: id
            }
        });

        res.json({ message: "User deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function createFriendship(req, res) {
    try {
        await prisma.user.update({
            where: {
                id: req.params.id
            },
            data: {
                friends: {
                    connect: {
                        id: req.body.friendId
                    }
                }
            }
        });

        await prisma.user.update({
            where: {
                id: req.body.friendId
            },
            data: {
                friends: {
                    connect: {
                        id: req.params.id
                    }
                }
            }
        });
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getFriends(req, res) {
    try {
        const friends = await prisma.user.findUnique({
            where: {
                id: req.params.id
            },
            select: {
                friends: true
            }
        });
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getUsers,
    getUser,
    createUser,
    editUser,
    deleteUser,
    createFriendship,
    getFriends
};