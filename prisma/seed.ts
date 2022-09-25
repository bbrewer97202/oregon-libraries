import { PrismaClient } from '@prisma/client';
import { Library } from '../types/index';
import sourceData from '../data/data.json';

const prisma = new PrismaClient();

async function main(libraryList: Library[]) {
    for (const library of libraryList) {
        const data = {
            name: library.name,
            address: library.address,
            slug: library.slug,
            geolocation: library.geolocation,
            system: {
                connectOrCreate: {
                    where: {
                        name: library.system,
                    },
                    create: {
                        name: library.system,
                    },
                },
            },
            libraryType: {
                connectOrCreate: {
                    where: {
                        name: library.libraryType,
                    },
                    create: {
                        name: library.libraryType,
                    },
                },
            },
            city: {
                connectOrCreate: {
                    where: {
                        name: library.city,
                    },
                    create: {
                        name: library.city,
                    },
                },
            },
            county: {
                connectOrCreate: {
                    where: {
                        name: library.county,
                    },
                    create: {
                        name: library.county,
                    },
                },
            },
            zipCode: {
                connectOrCreate: {
                    where: {
                        name: library.zipCode,
                    },
                    create: {
                        name: library.zipCode,
                    },
                },
            },
        };
        await prisma.library.create({ data });
    }
}

main(sourceData as Library[])
    .catch((error) => {
        console.log('error', error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
