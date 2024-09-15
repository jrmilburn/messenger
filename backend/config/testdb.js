const { prisma } = require('./passport');

async function main() {

    const user = await prisma.user.findUnique({
        where: {
            email: 'john@example.com'
        },
        include: {
            sentMessages: true,
            receivedMessages: true
        }
    })

    console.log(user);

}

main();