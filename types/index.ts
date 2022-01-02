export type LibraryType = 'Academic' | 'Public' | 'Special' | 'Tribal' | 'Volunteer' | 'Unknown';

export type LibraryMembership = 'CCRLS' | 'UCSLD' | 'WCCLS' | 'NONE' | 'UNKNOWN';

export type County =
    | 'Baker'
    | 'Benton'
    | 'Clackamas'
    | 'Clatsop'
    | 'Columbia'
    | 'Coos'
    | 'Crook'
    | 'Curry'
    | 'Deschutes'
    | 'Douglas'
    | 'Gilliam'
    | 'Grant'
    | 'Harney'
    | 'Hood River'
    | 'Jackson'
    | 'Jefferson'
    | 'Josephine'
    | 'Klamath'
    | 'Lake'
    | 'Lane'
    | 'Lincoln'
    | 'Linn'
    | 'Malheur'
    | 'Marion'
    | 'Morrow'
    | 'Multnomah'
    | 'Polk'
    | 'Sherman'
    | 'Tillamook'
    | 'Umatilla'
    | 'Union'
    | 'Wallowa'
    | 'Wasco'
    | 'Washington'
    | 'Wheeler'
    | 'Yamhill'
    | 'Unknown';

export interface Library {
    name: string;
    slug: string;
    system: string;
    address: string;
    city: string;
    county: string;
    zipCode: string;
    geolocation: string | null;
    phone: string | null;
    email: string | null;
    libraryType: LibraryType;
    membership: LibraryMembership;
    directorName: string | null;
    directorPhone: string | null;
    directorEmail: string | null;
}
