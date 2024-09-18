const { prisma } = require('./passport');

async function main() {


        const userFriends = await prisma.user.findMany({
            where: {
                username: 'Jrmilburn'
            },
        })

        console.log(userFriends);


}

main();