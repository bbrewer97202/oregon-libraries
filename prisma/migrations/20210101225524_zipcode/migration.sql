/*
  Warnings:

  - Added the required column `zipCodeId` to the `Branch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typeId` to the `Branch` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "ZipCode" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Branch" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "libraryId" INTEGER NOT NULL,
    "cityId" INTEGER NOT NULL,
    "countyId" INTEGER NOT NULL,
    "zipCodeId" INTEGER NOT NULL,
    "typeId" INTEGER NOT NULL,

    FOREIGN KEY ("libraryId") REFERENCES "Library"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("countyId") REFERENCES "County"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("zipCodeId") REFERENCES "ZipCode"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("typeId") REFERENCES "LibraryType"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Branch" ("id", "name", "address", "libraryId", "cityId", "countyId") SELECT "id", "name", "address", "libraryId", "cityId", "countyId" FROM "Branch";
DROP TABLE "Branch";
ALTER TABLE "new_Branch" RENAME TO "Branch";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
