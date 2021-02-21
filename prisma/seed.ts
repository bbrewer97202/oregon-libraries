import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {

    const test = await prisma.branch.create({
        data: {
            name: "E P Kellenberger Library",
            address: "1188 Kincaid",
            library: {
                create: {
                    name: "Parent Library"
                }
            },
            librayType: {
                create: {
                    name: "Research"
                }
            },
            city: {
                create: {
                    name: 'Eugene'
                }
            },
            county: {
                create: {
                    name: 'Lane'
                }
            },
            zipCode: {
                create: {
                    name: '97401-3727'
                }
            }
        }
    });

    console.log('test', test);
}

main()
    .catch((error) => {
        console.log('error', error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    }
    );
