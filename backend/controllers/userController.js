const { prisma, generateToken } = require("../config/passport");
const bcrypt = require("bcryptjs");

async function getUsers(req, res) {
    try {
        const users = await prisma.user.findMany();

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
    getFriends,
    login
};