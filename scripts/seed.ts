const { PrismaClient } = require('@prisma/client');

const databse = new PrismaClient();

async function main() {
  try {
    await databse.category.createMany({
        data: [
            {name: "Rust"},
            {name: "Computer Science"},
            {name: "Software Engineering"},
            {name: "TypeScript"},
            {name: "JavaScript"},
            {name: "Photography"},
            {name: "React JS"},
            {name: "Next JS"},
            {name: "Prisma DB"},
            {name: "MongoDB"},
            {name: "NodeJS"},
            {name: "Videography"},
        ]
    });

    console.log('Success');
    
  } catch (error) {
    console.log('Error databse categories', error);
  } finally {
    await databse.$disconnect();
  }
}

main();