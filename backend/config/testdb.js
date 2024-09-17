const { prisma } = require('./passport');

async function main() {

    const user = await prisma.user.findMany({
        where: {
            username: 'Jrmilburn'
        },
        select: {
            friends: true
        }
    });

    console.log(user.friends);

}

main();