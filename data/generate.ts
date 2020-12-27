import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import fetch from 'node-fetch';
import slugify from 'slugify';
import { Library } from '../types/index';

type ApiEntryValue = number | string | null;
type ApiEntry = ApiEntryValue[];
type ApiSource = {
  meta: object;
  data: ApiEntry[];
};
type ApiResponse = ApiSource | null;
type SourceKeyEntry = {
  index: number;
  field: keyof Library;
};

// todo: move to config file?
const SOURCE_URL = 'https://data.oregon.gov/api/views/6x9d-idz4/rows.json?accessType=DOWNLOAD';

async function loadFromSource(url: string): Promise<ApiResponse> {
  try {
    console.log(`requesting ${url}`);
    const response = await fetch(url);
    const json = response.json();
    return json;
  } catch (e) {
    console.log('loadFromSource error', e);
    return null;
  }
}

function createLibraryEntry(entry: ApiEntry): Library {
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

  const library = sourceKeyMap.reduce((lib, key) => {
    const { index, field } = key;
    if (entry[index]) {
      // lib[field] = entry[index]; // !@$@#%!
      lib = { ...lib, [field]: entry[index] };
    }
    return lib;
  }, {} as Library);

  library.slug = slugify(library.fullLibraryName, {
    lower: true,
    strict: true,
  });

  return library;
}

async function saveData(libraryData: Library[]): Promise<void> {
  try {
    const fileName = path.join(__dirname, 'data.json');
    const writeFileAsync = promisify(fs.writeFile);
    await writeFileAsync(fileName, JSON.stringify(libraryData, null, 2));
    console.log(`created ${fileName}`);
  } catch (e) {
    console.log('error', e);
  }
}

async function generate(): Promise<void> {
  const source = await loadFromSource(SOURCE_URL);
  if (!source || !source.data) {
    console.log('source data unavailable');
    return;
  }

  const libraries = source.data.map((entry: ApiEntry) => createLibraryEntry(entry));
  await saveData(libraries);
}

generate();
