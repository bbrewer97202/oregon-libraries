# Oregon Libraries

Directory of Oregon libraries with content from [data.gov](https://catalog.data.gov/dataset/oregon-library-directory).

## Retrieve Updated Data

    npm run generate-data

## TODO
1. Direct link to each type of library type (e.g. Volunteer, Tribal, etc.)
   http://localhost:3000/library/type/Academic
2. search by zip code
3. browse/search by county
4. use SWR or comparable


## process
1. delete data.db
2. run migrations, client update, and create script

        rm data/data.db && npx prisma migrate dev --preview-feature && npx prisma generate && npm run generate2