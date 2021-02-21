// import fs from 'fs';
// import path from 'path';
// import { promisify } from 'util';
// import fetch from 'node-fetch';
// import slugify from 'slugify';
// import { Library } from '../types/index';
import fake from './saved-source-2020-05-02.json';

import { Prisma, PrismaClient } from '@prisma/client';

// type SimpleTableList = string[] | number[];
type ApiEntryValue = number | string | null;
type ApiEntry = ApiEntryValue[];
// type ApiSource = {
//   meta: object;
//   data: ApiEntry[];
// };
// type ApiResponse = ApiSource | null;
// type SourceKeyEntry = {
//   index: number;
//   field: keyof Library;
// };

interface TableDelegrate {
  create(data: Record<string, unknown>): void;
}

type SourceKey =
  | 'address'
  | 'branchName'
  | 'city'
  | 'county'
  | 'geolocation'
  | 'libraryName'
  | 'libraryType'
  | 'membership'
  | 'website'
  | 'zipCode';

const UNKNOWN_VALUE = 'unknown';

const sourceIndexMap: Record<SourceKey, number> = {
  address: 12,
  branchName: 10,
  city: 13,
  county: 14,
  geolocation: 32,
  libraryName: 9,
  libraryType: 17,
  membership: 27,
  website: 26,
  zipCode: 16,
};

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

function createSimpleTableList(key: SourceKey, sourceData: ApiEntry[]): ApiEntry {
  const fieldIndex: number = sourceIndexMap[key];
  if (!fieldIndex) {
    console.log(`createSimpleTableList :"${key} could not be found`);
    return [];
  }

  const result = sourceData.reduce((list, sourceRow) => {
    const value = sourceRow[fieldIndex];
    if ((typeof value === 'string' || typeof value === 'number') && !list.includes(value)) {
      list.push(value);
    }
    return list;
  }, []);

  console.log(`${key}: extracted ${result.length} entries from ${sourceData.length} rows`);
  return result.sort();
}



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

async function _saveListToTable<T extends TableDelegrate>(list: ApiEntry, client: T) {
  for (const listItem of list) {
    const name = listItem as string;
    await client.create({ data: { name } });
  }
}

function normalizeSourceData(list: ApiEntry[]) {
  for (const entry of list) {
    // allow for unknown county
    let county = (entry[sourceIndexMap.county] as string) || UNKNOWN_VALUE;
    // remove superfluous "County" in some cases
    county = county.replace(/ county/i, '');
    entry[sourceIndexMap.county] = county;

    // allow for unknown zip code, remove extra digits from zipcode
    let zipCode = (entry[sourceIndexMap.zipCode] as string) || UNKNOWN_VALUE;
    zipCode = zipCode.replace(/-\d{4}/, '');
    entry[sourceIndexMap.zipCode] = zipCode;

    // allow for unknown city
    if (!entry[sourceIndexMap.city]) {
      entry[sourceIndexMap.city] = UNKNOWN_VALUE;
    }
  }

  return list;
}

async function generate() {
  const source = await loadFromSource(SOURCE_URL);
  if (!source || !source.data) {
    throw Error('source data unavailable');
  }

  const { data: loadedData } = source;
  if (!loadedData) {
    throw Error('unexpected format');
  }
  const sourceData = normalizeSourceData(loadedData);

  const prisma = new PrismaClient();

  try {
    // const countyList = createSimpleTableList('county', sourceData);
    // await saveListToTable<Prisma.CountyDelegate>(countyList, prisma.county);

    // const cityList = createSimpleTableList('city', sourceData);
    // await saveListToTable<Prisma.CityDelegate>(cityList, prisma.city);

    // const zipCodeList = createSimpleTableList('zipCode', sourceData);
    // await saveListToTable<Prisma.ZipCodeDelegate>(zipCodeList, prisma.zipCode);

    // const libraryNameList = createSimpleTableList('libraryName', sourceData);
    // await saveListToTable<Prisma.LibraryDelegate>(libraryNameList, prisma.library);

    // const libraryTypeList = createSimpleTableList('libraryType', sourceData);
    // await saveListToTable<Prisma.LibraryTypeDelegate>(libraryTypeList, prisma.libraryType);

    for (const branchEntry of sourceData) {
      const address = (branchEntry[sourceIndexMap.address] as string) || '';

      const countyName = branchEntry[sourceIndexMap.county] as string;
      // const countyMatch = await prisma.county.findFirst({ where: { name: countyName } });
      // const countyId = countyMatch && countyMatch.id ? (countyMatch.id as number) : '';

      // const cityName = branchEntry[sourceIndexMap.city] as string;
      // const cityMatch = await prisma.city.findFirst({ where: { name: cityName } });
      // const cityId = cityMatch && cityMatch.id ? (cityMatch.id as number) : '';

      // const zipCode = branchEntry[sourceIndexMap.zipCode] as string;
      // const zipCodeMatch = await prisma.zipCode.findFirst({ where: { name: zipCodeValue } });
      // const zipCodeId = zipCodeMatch && zipCodeMatch.id ? (zipCodeMatch.id as number) : '';

      // const libraryName = branchEntry[sourceIndexMap.libraryName] as string;
      // const libraryNameMatch = await prisma.library.findFirst({ where: { name: libraryName } });
      // const libraryId = libraryNameMatch && libraryNameMatch.id ? (libraryNameMatch.id as number) : '';

      // const libraryTypeName = branchEntry[sourceIndexMap.libraryType] as string;
      // const libraryTypeMatch = await prisma.libraryType.findFirst({ where: { name: libraryTypeName } });
      // const libraryTypeId = libraryTypeMatch && libraryTypeMatch.id ? (libraryTypeMatch.id as number) : '';

      const name = (branchEntry[sourceIndexMap.branchName] as string) || ('' as string);

      // const branch = {
      //   name,
      //   address,
      //   city,
      //   county,
      //   zipCode,
      //   library,
      //   libraryType,
      // };

      const branch = {
        name,
        address,
        // city: {
        //   connectOrCreate: {
        //     where: { name: cityName },
        //     create: { name: cityName },
        //   },
        // },
        county: {
          connectOrCreate: {
            where: { name: countyName },
            create: { name: countyName },
          },
        },
        // zipCode: {
        //   connectOrCreate: {
        //     where: { name: zipCode },
        //     create: { name: zipCode },
        //   },
        // },
        // library: {
        //   connectOrCreate: {
        //     where: { name: libraryName },
        //     create: { name: libraryName },
        //   },
        // },
        // libraryType: {
        //   connectOrCreate: {
        //     where: { name: libraryTypeName },
        //     create: { name: libraryTypeName },
        //   },
        // },
      };

      // branch.countyId = countyMatch?.id;
      console.log('-------');
      console.log(branch);

      await prisma.branch.create({ data: branch });

      // console.log('branchEntry geolocation: ', branchEntry[sourceIndexMap.geolocation]);
      // console.log('branchEntry membership: ', branchEntry[sourceIndexMap.membership]);
      // console.log('branchEntry website: ', branchEntry[sourceIndexMap.website]);
    }

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
