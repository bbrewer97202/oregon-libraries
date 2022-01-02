import path from 'path';
import { readFile, writeFile } from 'fs/promises';
import got from 'got';
// @ts-ignore
import AddressParser from 'parse-address'; // no @types exist
import slugify from 'slugify';
import { Library, County, LibraryMembership, LibraryType } from '../types/index';

// location of JSON source data from open data API
const SRC_URL = 'https://data.oregon.gov/api/views/6x9d-idz4/rows.json?accessType=DOWNLOAD';

// path to filesystem version of JSON source data
const SRC_EXAMPLE_FILESYSTEM = '../data/example-src-data.json';

// path to filesystem output of processed src data
const DEST_URL = '../data/data.json';

interface APIResponse {
    meta: Record<string, unknown>;
    data: string[][];
}

type LibrarySystems = Record<string, number>;

interface NormalizedAddressValues {
    shortAddress: string;
    city: string;
}

interface NormalizedLibraryValues {
    system: string;
    name: string;
}

async function downloadFile() {
    console.log(`loading file from url: ${SRC_URL}`);
    const response = await got.get(SRC_URL, { responseType: 'json' });
    return response.body as APIResponse;
}

async function loadFromFilesystem() {
    console.log(`loading file from filesystem: ${SRC_EXAMPLE_FILESYSTEM}`);
    const fileName = path.join(__dirname, SRC_EXAMPLE_FILESYSTEM);
    const file = await readFile(fileName, 'utf8');
    return JSON.parse(file) as APIResponse;
}

async function saveFile(libraries: Library[]) {
    console.log(`saved data to file system: ${DEST_URL}`);
    const fileName = path.join(__dirname, DEST_URL);
    await writeFile(fileName, JSON.stringify(libraries, null, 2));
    console.log(`created ${fileName}`);
}

function getNormalizedDirectorName(firstName: string | null, lastName: string | null): string | null {
    return firstName && lastName ? `${firstName} ${lastName}` : null;
}

function getNormalizedGeoLocation(location = ''): string | null {
    const matches = location.match(/POINT \((.*?) (.*?)\)/);
    if (matches && matches[1] && matches[2]) {
        return `${parseFloat(matches[2])}, ${parseFloat(matches[1])}`;
    }
    return null;
}

function getNormalizedAddress(address = '', zipCode = ''): NormalizedAddressValues {
    const parsedAddress = AddressParser.parseLocation(address);
    const city = parsedAddress.city || 'unknown';

    let shortAddress = address;
    shortAddress = shortAddress.replace(new RegExp(`, ${parsedAddress.city}`), '');
    shortAddress = shortAddress.replace(/, OR/, '');
    if (zipCode) shortAddress = shortAddress.replace(zipCode, '');
    shortAddress = shortAddress.replace(parsedAddress.zip, '');
    shortAddress = shortAddress.trim();

    return { city, shortAddress };
}

function getNormalizedLibraryName(rawName = ''): NormalizedLibraryValues {
    const nameParts = rawName.split(' - ');
    const system = nameParts.length ? nameParts[0] : rawName;
    const name = nameParts.length === 2 ? nameParts[1] : nameParts[0];
    return { system, name };
}

function createLibrary(rawLibrary: Record<string, string>, systems: LibrarySystems): Library {
    const {
        directorFirst = null,
        directorLast = null,
        directorPhone = null,
        directorEmail = null,
        email,
        phone,
        type = 'UNKNOWN',
        zipCode,
    } = rawLibrary;
    const { system, name } = getNormalizedLibraryName(rawLibrary.name);
    const systemName = system && systems[system] ? system : 'NO_SYSTEM';
    const slug = slugify(name, { replacement: '-', lower: true, remove: /[*+~.()'"!:@]/g })
    const { shortAddress, city } = getNormalizedAddress(rawLibrary.address, zipCode);
    const county = rawLibrary.county || 'Unknown';
    const geolocation = getNormalizedGeoLocation(rawLibrary.geoAddress);
    const membership = rawLibrary.membership || 'UNKNOWN';
    const directorName = getNormalizedDirectorName(directorFirst, directorLast);

    return {
        slug,
        system: systemName,
        name,
        address: shortAddress,
        city,
        county: county as County,
        zipCode,
        geolocation,
        phone,
        email,
        membership: membership as LibraryMembership,
        libraryType: type as LibraryType,
        directorName,
        directorPhone,
        directorEmail,
    };
}

/**
 * generate a map of library system names and branch counts within each
 */
function generateLibrarySystems(rawData: string[][]): LibrarySystems {
    const systems: LibrarySystems = {};
    for (const entry of rawData) {
        const name = String(entry[8]);
        const nameParts = name.split(' - ');
        const systemName = nameParts.length ? nameParts[0] : null;
        if (systemName) {
            if (!systems[systemName]) {
                systems[systemName] = 0;
            }
            systems[systemName]++;
        }
    }

    // only interested in systems with more than one branch
    return Object.fromEntries(Object.entries(systems).filter(item => item[1] > 1));
}

function generateLibraries(rawData: string[][], systems: LibrarySystems) {
    const entityMap: Record<number, string> = {
        8: 'name',
        10: 'address',
        11: 'county',
        13: 'zipCode',
        14: 'type',
        16: 'phone',
        18: 'email',
        19: 'website',
        20: 'membership',
        21: 'directorFirst',
        22: 'directorLast',
        23: 'directorPhone',
        24: 'directorEmail',
        25: 'geoAddress',
    } as const;

    const libraries = rawData.map((entry) => {
        const rawLibraryEntry = entry.reduce((library, value, index) => {
            const key = entityMap[index];
            if (key) library[key] = value;
            return library;
        }, {} as Record<string, string>);

        return createLibrary(rawLibraryEntry, systems);
    });
    return libraries;
}

(async () => {
    // TODO: this does not work when run as part of npm initialize
    // const isExampleRun = process.argv.includes('--example=true');
    const isExampleRun = true;
    try {
        const rawData = isExampleRun ? await loadFromFilesystem() : await downloadFile();
        const systems = generateLibrarySystems(rawData.data);
        const libraries = generateLibraries(rawData.data, systems);
        await saveFile(libraries);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log(`error ${error.stack}`);
        }
    }
})();
