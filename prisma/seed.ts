import { PrismaClient } from '@prisma/client';
import { Library } from '../types/index';
import sourceData from '../data/data.json';

const prisma = new PrismaClient();

async function main(libraryList: Library[]) {
    for (const library of libraryList) {
        for (const branch of library.branches) {
            const { branchName } = branch;

            const data = {
                name: branchName,
                address: branch.address,
                slug: branch.slug,
                // geolocation: branch.geolocation,
                library: {
                    connectOrCreate: {
                        where: {
                            name: library.name,
                        },
                        create: {
                            name: library.name,
                            slug: library.slug
                        },
                    },
                },
                librayType: {
                    connectOrCreate: {
                        where: {
                            name: branch.libraryType,
                        },
                        create: {
                            name: branch.libraryType,
                        },
                    },
                },
                city: {
                    connectOrCreate: {
                        where: {
                            name: branch.city,
                        },
                        create: {
                            name: branch.city,
                        },
                    },
                },
                county: {
                    connectOrCreate: {
                        where: {
                            name: branch.county,
                        },
                        create: {
                            name: branch.county,
                        },
                    },
                },
                zipCode: {
                    connectOrCreate: {
                        where: {
                            name: branch.zipCode,
                        },
                        create: {
                            name: branch.zipCode,
                        },
                    },
                },
            };
            await prisma.branch.create({ data });
        }
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
