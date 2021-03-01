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

0. npm run generate-data
1. rm data/data.db && npx prisma generate
2. npx prisma migrate dev --name init --preview-feature
3. npx prisma db seed --preview-feature
4. npx prisma studio
