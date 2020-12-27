export type LibraryType = 'Academic' | 'Public' | 'Special' | 'Tribal' | 'Volunteer';

export type LibraryMembership = 'CCRLS' | 'UCSLD' | 'WCCLS' | 'NONE';

export interface Library {
  id: string;
  slug: string;
  fullLibraryName: string;
  libraryName: string;
  branchName?: string;
  fullAddress: string;
  address: string;
  city: string;
  county: string;
  zipCode: string;
  libraryType: LibraryType;
  website?: string[];
  membership?: LibraryMembership;
  geolocation: string;
}
