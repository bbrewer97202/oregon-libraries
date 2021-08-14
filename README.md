# Oregon Libraries

Directory of Oregon libraries with content from [data.gov](https://catalog.data.gov/dataset/oregon-library-directory).

## Retrieve Updated Data

    npm run generate-data

## short term TODO

- county is broken
- seed trace

## longer term TODO

1. Direct link to each type of library type (e.g. Volunteer, Tribal, etc.)
   http://localhost:3000/library/type/Academic
2. search by zip code
3. browse/search by county
4. use SWR or comparable

## process

0. npm run generate-data (to run from JSON data on disc without hitting api: 'npm run generate-data:example')
1. npm run generate-data-client
2. npm run db:create
3. npx prisma db seed --preview-feature
4. npx prisma studio
