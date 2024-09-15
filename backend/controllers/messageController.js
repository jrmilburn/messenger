const { prisma } = require("../config/passport");

async function getMessages(req, res) {
    try {
        const messages = await prisma.message.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            where: {
                OR: [
                    {
                        senderId: req.params.id
                    },
                    {
                        receiverId: req.body.selectedid
                    }
                ]
            }
        });

        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

async function getMessage(req, res) {
    try {
        const { messageid } = req.params;

        const message = await prisma.message.findUnique({
            where: {
                id: messageid
            }
        });

        res.json(message);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function createMessage(req, res) {
    try {
        const { id } = req.params;
        const { content, receiverId } = req.body;

        const message = await prisma.message.create({
            data: {
                content,
                senderId: id,
                receiverId,
            }
        });

        res.json(message);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function editMessage(req, res) {
    try {
        const { id } = req.params;
        const { text } = req.body;

        const message = await prisma.message.update({
            where: {
                id: id
            },
            data: {
                text
            }
        });

        res.json(message);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function deleteMessage(req, res) {
    try {
        const { id } = req.params;

        await prisma.message.delete({
            where: {
                id: id
            }
        });

        res.json({ message: "Message deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getMessages,
    getMessage,
    createMessage,
    editMessage,
    deleteMessage
};