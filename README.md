# Oregon Libraries

Transform dataset from [data.gov](https://catalog.data.gov/dataset/oregon-library-directory) into relational model. Next.js app displays Oregon library details.

## Quick Start

1.  Download, process and create database of library open data

        npm install

        npm run initialize

2.  Start web project, visit http://localhost:3000

        npm run dev

## Data setup detailed steps

If you want to get into the detailed steps that `npm run initialize` manages, run these steps individually by hand instead.

1.  Get library open data from remote url and transform it for use

         npm run generate-data

    Optionally use local example data from filesystem instead of remote API:

        npm run generate-data:example

2.  Create a new database instance

        npm run db:create

3.  Seed new database with generated data

        npm run db:seed

4.  Preview results in Prisma visual tool:

        npx prisma studio
