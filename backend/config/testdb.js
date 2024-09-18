const { prisma } = require('./passport');

async function main() {


        const userFriends = await prisma.user.findMany({
            where: {
                username: 'Jrmilburn'
            },
            include: {
                friendshipsSent: {
                    include: {
                        toUser: true
                    }
                },
            },
        })

        console.log(userFriends[0].friendshipsSent[0].toUser);


}

main();