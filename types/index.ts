export type LibraryType = 'Academic' | 'Public' | 'Special' | 'Tribal' | 'Volunteer';

export type LibraryMembership = 'CCRLS' | 'UCSLD' | 'WCCLS' | 'NONE';

export interface Branch {
    libraryName: string,
    branchName?: string,
    address: string,
    city: string,
    county?: string,
    zipCode: string,
    libraryType: LibraryType | string,
    membership?: LibraryMembership | string
}

export interface Library {
    name: string,
    branches: Branch[]
}
