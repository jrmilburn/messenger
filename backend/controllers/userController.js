const { prisma, generateToken } = require("../config/passport");
const bcrypt = require("bcryptjs");

async function getNotFriends(req, res) {
    try {
        const currentUserId = req.user.id;

        // Find all friends of the current user
        const friends = await prisma.user.findMany({
            where: {
                OR: [
                    { friends: { some: { id: currentUserId } } },
                    { friendOf: { some: { id: currentUserId } } }
                ]
            },
            select: {
                id: true
            }
        });

        // Extract friend IDs
        const friendIds = friends.map(friend => friend.id);

        // Find all users who are not friends with the current user
        const users = await prisma.user.findMany({
            where: {
                id: {
                    notIn: friendIds.concat(currentUserId) // Exclude friends and the current user
                }
            }
        });

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
        const friend = await prisma.user.findUnique({
            where: {
                id: req.params.id
            }
        })

        await prisma.user.update({
            where: {
                id: req.user.id
            },
            data: {
                friends: {
                    connect: {
                        id: friend.id
                    }
                }
            }
        });

        await prisma.user.update({
            where: {
                id: friend.id
            },
            data: {
                friendOf: {
                    connect: {
                        id: req.user.id
                    }
                }
            }
        });

        res.json(friend);


        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getFriends(req, res) {
    try {
        const friends = await prisma.user.findUnique({
            where: {
                id: req.user.id
            },
            select: {
                friends: true
            }
        });

        res.json(friends || []);
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