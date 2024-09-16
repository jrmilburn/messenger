const { prisma } = require('./passport');

async function main() {

    const messages = await prisma.message.deleteMany();
    const user = await prisma.user.deleteMany();

    console.log(messages);
    console.log(user);

}

main();