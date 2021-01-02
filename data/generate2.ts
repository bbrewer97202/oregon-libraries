// import fs from 'fs';
// import path from 'path';
// import { promisify } from 'util';
// import fetch from 'node-fetch';
// import slugify from 'slugify';
import { Library } from '../types/index';
import fake from './saved-source-2020-05-02.json';

import { Prisma, PrismaClient } from '@prisma/client';

// type SimpleTableList = string[] | number[];
type ApiEntryValue = number | string; // | null;
type ApiEntry = ApiEntryValue[];
// type ApiSource = {
//   meta: object;
//   data: ApiEntry[];
// };
// type ApiResponse = ApiSource | null;
type SourceKeyEntry = {
  index: number;
  field: keyof Library;
};

interface TableDelegrate {
  create(data: Record<string, unknown>): void;
}

const sourceKeyMap: SourceKeyEntry[] = [
  {
    index: 0,
    field: 'id',
  },
  {
    index: 8,
    field: 'fullLibraryName',
  },
  {
    index: 9,
    field: 'libraryName',
  },
  {
    index: 10,
    field: 'branchName',
  },
  {
    index: 11,
    field: 'fullAddress',
  },
  {
    index: 12,
    field: 'address',
  },
  {
    index: 13,
    field: 'city',
  },
  {
    index: 14,
    field: 'county',
  },
  {
    index: 16,
    field: 'zipCode',
  },
  {
    index: 17,
    field: 'libraryType',
  },
  {
    index: 26,
    field: 'website',
  },
  {
    index: 27,
    field: 'membership',
  },
  {
    index: 32,
    field: 'geolocation',
  },
];

// todo: move to config file?
const SOURCE_URL = 'https://data.oregon.gov/api/views/6x9d-idz4/rows.json?accessType=DOWNLOAD';

async function loadFromSource(url: string): Promise<any> {
  // try {
  //   console.log(`requesting ${url}`);
  //   const response = await fetch(url);
  //   const json = response.json();
  //   return json;
  // } catch (e) {
  //   console.log('loadFromSource error', e);
  //   return null;
  // }
  return fake;
}

function createSimpleTableList(key: string, sourceData: ApiEntry[]): ApiEntry {
  const field = sourceKeyMap.find((fieldMap) => fieldMap.field === key);
  if (!field) {
    console.log(`createSimpleTableList :"${key} could not be found`);
    return [];
  }

  const result = sourceData.reduce((list, sourceRow) => {
    const value = sourceRow[field.index];
    if ((typeof value === 'string' || typeof value === 'number') && !list.includes(value)) {
      list.push(value);
    }
    return list;
  }, []);

  console.log(`${key}: extracted ${result.length} entries from ${sourceData.length} rows`);
  return result.sort();
}

// function createLibraryEntry(entry: ApiEntry): Library {


//   const library = sourceKeyMap.reduce((lib, key) => {
//     const { index, field } = key;
//     if (entry[index]) {
//       // lib[field] = entry[index]; // !@$@#%!
//       lib = { ...lib, [field]: entry[index] };
//     }
//     return lib;
//   }, {} as Library);

//   library.slug = slugify(library.fullLibraryName, {
//     lower: true,
//     strict: true,
//   });

//   return library;
// }

// async function saveData(libraryData: Library[]): Promise<void> {
//   try {
//     const fileName = path.join(__dirname, 'data.json');
//     const writeFileAsync = promisify(fs.writeFile);
//     await writeFileAsync(fileName, JSON.stringify(libraryData, null, 2));
//     console.log(`created ${fileName}`);
//   } catch (e) {
//     console.log('error', e);
//   }
// }

// async function saveListToTable<T>(list: ApiEntry, client: T) {
//   for (const listItem of list) {
//     const name = listItem as string;
//     await client.create({ data: { name } });
//   }
// }

async function saveListToTable<T extends TableDelegrate>(list: ApiEntry, client: T) {
  for (const listItem of list) {
    const name = listItem as string;
    await client.create({ data: { name } });
  }
}

async function generate() {
  const source = await loadFromSource(SOURCE_URL);
  if (!source || !source.data) {
    console.log('source data unavailable');
    return;
  }

  const { data: loadedData } = source;
  if (!loadedData) {
    console.log('unexpected format');
    return;
  }

  const prisma = new PrismaClient();

  try {
    const countyList = createSimpleTableList('county', loadedData);
    await saveListToTable<Prisma.CountyDelegate>(countyList, prisma.county);

    const cityList = createSimpleTableList('city', loadedData);
    await saveListToTable<Prisma.CityDelegate>(cityList, prisma.city);

    const zipCodeList = createSimpleTableList('zipCode', loadedData);
    await saveListToTable<Prisma.ZipCodeDelegate>(zipCodeList, prisma.zipCode);

    const libraryNameList = createSimpleTableList('libraryName', loadedData);
    await saveListToTable<Prisma.LibraryDelegate>(libraryNameList, prisma.library);

    // const libraries = loadedData.map((entry: ApiEntry) => createLibraryEntry(entry));
    // console.log('done', libraries);
    // await saveData(libraries);
  } catch (e) {
    console.log('error', e);
    throw e;
  } finally {
    await prisma.$disconnect();
  }
}

generate();
