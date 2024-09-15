const { prisma } = require('./passport');

async function main() {

    await prisma.message.deleteMany();
    await prisma.user.deleteMany();

  // Create dummy users
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: 'john@example.com',
        username: 'john_doe',
        password: 'securepassword123',
        bio: 'Loves coding and cats',
        image: 'https://example.com/avatar/john.jpg',
        status: 1
      },
    }),
    prisma.user.create({
      data: {
        email: 'jane@example.com',
        username: 'jane_doe',
        password: 'securepassword456',
        bio: 'Avid traveler and photographer',
        image: 'https://example.com/avatar/jane.jpg',
        status: 0
      },
    }),
    prisma.user.create({
      data: {
        email: 'alice@example.com',
        username: 'alice_wonderland',
        password: 'securepassword789',
        bio: 'Frontend developer',
        image: 'https://example.com/avatar/alice.jpg',
        status: 0
      },
    }),
  ]);

  // Create dummy messages
  await Promise.all([
    prisma.message.create({
      data: {
        senderId: users[0].id,
        receiverId: users[1].id,
        content: 'Hey Jane, how are you?',
      },
    }),
    prisma.message.create({
      data: {
        senderId: users[1].id,
        receiverId: users[0].id,
        content: 'Hey John, I am doing great!',
      },
    }),
    prisma.message.create({
      data: {
        senderId: users[2].id,
        receiverId: users[0].id,
        content: 'Hey John, let’s catch up sometime.',
      },
    }),
  ]);

  console.log('Dummy data inserted');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
