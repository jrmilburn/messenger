const { prisma, generateToken } = require("../config/passport");
const bcrypt = require("bcryptjs");

async function getNotFriends(req, res) {
    try {

        const currentUserId = req.user.id;

        const friendships = await prisma.userFriends.findMany({
            where: {
                OR: [
                    { fromUserId: currentUserId },
                    { toUserId: currentUserId }
                ],
            },
            select: {
                fromUserId: true,
                toUserId: true
            }
        });

        const friendIds = friendships.map((friendship) => {
            if ( friendship.fromUserId === currentUserId) {
                return friendship.toUserId;
            } else {
                return friendship.fromUserId;
            }
        });

        const excludeIds = friendIds.concat(currentUserId);

        const users = await prisma.user.findMany({
            where: {
                id: {
                    notIn: excludeIds
                }
            }
        })

        return res.json(users);
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
        const { email, username, password } = req.body;

        // Validate the required fields
        if (!email || !password || !username) {
            console.error('All fields are required');
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Check if the user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            console.error('Email already registered');
            return res.status(400).json({ error: 'Email already registered' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        const user = await prisma.user.create({
            data: {
                email,
                username,
                password: hashedPassword,
            },
        });

        // Generate JWT token
        const token = generateToken(user);

        res.status(201).json({ token });
    } catch (error) {
        console.error('Error creating user:', error); // Add this to log the error
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        res.json({ user: user, token: generateToken(user) });
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
        const friendId = req.params.id;
        const userId = req.user.id;

        const friend = await prisma.user.findUnique({
            where: {
                id: friendId
            }
        });
        
        if (!friend) {
            return res.status(404).json({ error: "Friend not found" });
        }

        const existingFriendship = await prisma.userFriends.findUnique({
            where:{
                fromUserId_toUserId: {
                    fromUserId: userId,
                    toUserId: friendId
                }
            }
        });

        if (existingFriendship) {
            return res.status(400).json({ error: "Friendship already exists" });
        }

        await prisma.userFriends.create({
            data: {
                fromUserId: userId,
                toUserId: friendId
            },
        });

        res.json({ message: "Friendship created" });
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getFriends(req, res) {
    try {

        const userId = req.user.id;

        const userFriends = await prisma.user.findUnique({
            where: {
                id: userId
            },
            include: {
                friendshipsSent: {
                    include: {
                        toUser: true
                    }
                },
            },
        })

        const friends = []

        userFriends.friendshipsSent.forEach((friendship) => {
            friends.push(friendship.toUser);
        });

        res.json(friends);

    } catch(error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getNotFriends,
    getUser,
    createUser,
    editUser,
    deleteUser,
    createFriendship,
    getFriends,
    login
};