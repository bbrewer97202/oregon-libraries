import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import fetch from 'node-fetch';
import { Library, Branch } from '../types/index';
// import tmpSavedSource from './saved-source-2020-05-02.json';

type ApiEntryValue = number | string | null;
type ApiEntry = ApiEntryValue[];
type ApiSource = {
    meta: Record<string, unknown>;
    data: ApiEntry[];
};
type ApiResponse = ApiSource | null;
type SourceKeyEntry = {
    index: number;
    field: string, //keyof Library;
};
// type LibraryEntry = {
//     libraryName: string,
//     branchName?: string,
//     address: string,
//     city: string,
//     county?: string,
//     zipCode: string,
//     libraryType: string,
//     membership?: string
// }

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

function createLibraryEntry(entry: ApiEntry): Branch {
    const sourceKeyMap: SourceKeyEntry[] = [
        {
            index: 8,
            field: 'libraryName',
        },
        {
            index: 9,
            field: 'branchName',
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
        // {
        //     index: 26,
        //     field: 'website',
        // },
        {
            index: 27,
            field: 'membership',
        },
        // {
        //     index: 32,
        //     field: 'geolocation',
        // },
    ];

    const library = sourceKeyMap.reduce((lib, key) => {
        const { index, field } = key;
        if (entry[index]) {
            // lib[field] = entry[index]; // !@$@#%!
            console.log(`field: ${field} = ${entry[index]}`);
            lib = { ...lib, [field]: entry[index] };
        }
        return lib;
    }, {} as Branch);

    // TODO: "Douglas County" > "Douglas"

    return library;
}

function collateBranches(libraryData: Branch[]): Library[] {
    const libraryBranchMap: Record<string, Library> = {};

    // group libraries/branches together
    for (const library of libraryData) {
        const name: string = library.libraryName;
        if (!libraryBranchMap[name]) {
            libraryBranchMap[name] = { name: library.libraryName, branches: [] };
        }
        libraryBranchMap[name].branches.push(library);
    }
    return Object.values(libraryBranchMap);
}

async function saveData(libraries: Library[]) {
    try {
        const fileName = path.join(__dirname, 'data.json');
        const writeFileAsync = promisify(fs.writeFile);
        await writeFileAsync(fileName, JSON.stringify(libraries, null, 2));
        console.log(`created ${fileName}`);
    } catch (e) {
        console.log('error', e);
    }
}

async function generate() {
    const source = await loadFromSource(SOURCE_URL);
    // const source = tmpSavedSource as ApiResponse;
    if (!source || !source.data) {
        console.log('source data unavailable');
        return;
    }

    const libraryData = source.data.map((entry: ApiEntry) => createLibraryEntry(entry));
    const libraries: Library[] = collateBranches(libraryData);
    await saveData(libraries);
}

generate();
