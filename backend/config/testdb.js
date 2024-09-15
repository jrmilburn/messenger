const { prisma } = require('./passport');

async function main() {

    const user = await prisma.user.findMany();

    console.log(user);

}

main();