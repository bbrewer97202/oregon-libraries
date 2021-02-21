-- CreateTable
CREATE TABLE "Branch" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "libraryId" INTEGER NOT NULL,
    "libraryTypeId" INTEGER NOT NULL,
    "cityId" INTEGER NOT NULL,
    "countyId" INTEGER NOT NULL,
    "zipCodeId" INTEGER NOT NULL,
    FOREIGN KEY ("libraryId") REFERENCES "Library" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("libraryTypeId") REFERENCES "LibraryType" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("cityId") REFERENCES "City" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("countyId") REFERENCES "County" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("zipCodeId") REFERENCES "ZipCode" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("libraryId") REFERENCES "Library" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY ("libraryTypeId") REFERENCES "LibraryType" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY ("countyId") REFERENCES "County" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY ("cityId") REFERENCES "City" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY ("zipCodeId") REFERENCES "ZipCode" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Library" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "LibraryType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "County" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "City" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ZipCode" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Library.name_unique" ON "Library"("name");

-- CreateIndex
CREATE UNIQUE INDEX "LibraryType.name_unique" ON "LibraryType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "County.name_unique" ON "County"("name");

-- CreateIndex
CREATE UNIQUE INDEX "City.name_unique" ON "City"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ZipCode.name_unique" ON "ZipCode"("name");
