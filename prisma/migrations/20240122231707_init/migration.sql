-- CreateTable
CREATE TABLE "Manga" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "parodyId" INTEGER NOT NULL,
    "coverLg" TEXT NOT NULL,
    "coverSm" TEXT NOT NULL,
    "rating" REAL NOT NULL,
    "views" INTEGER NOT NULL,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "languageId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "groups" TEXT NOT NULL,
    "pages" INTEGER NOT NULL,
    "isWesternReading" INTEGER NOT NULL DEFAULT 0,
    "collection" TEXT NOT NULL,
    "chapCollection" INTEGER NOT NULL DEFAULT 1,
    "urlName" TEXT NOT NULL,
    "fullName" TEXT NOT NULL DEFAULT '',
    CONSTRAINT "Manga_parodyId_fkey" FOREIGN KEY ("parodyId") REFERENCES "Parody" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Manga_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Page" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "mangaId" INTEGER NOT NULL,
    "page" INTEGER NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "alt" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    CONSTRAINT "Page_mangaId_fkey" FOREIGN KEY ("mangaId") REFERENCES "Manga" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Language" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
    "urlName" TEXT NOT NULL DEFAULT ''
);

-- CreateTable
CREATE TABLE "Category" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
    "urlName" TEXT NOT NULL DEFAULT ''
);

-- CreateTable
CREATE TABLE "Parody" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
    "urlName" TEXT NOT NULL DEFAULT ''
);

-- CreateTable
CREATE TABLE "Author" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
    "urlName" TEXT NOT NULL DEFAULT ''
);

-- CreateTable
CREATE TABLE "Tags" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
    "urlName" TEXT NOT NULL DEFAULT ''
);

-- CreateTable
CREATE TABLE "Character" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
    "urlName" TEXT NOT NULL DEFAULT ''
);

-- CreateTable
CREATE TABLE "CharacterManga" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "mangaId" INTEGER NOT NULL,
    "characterId" INTEGER NOT NULL,
    CONSTRAINT "CharacterManga_mangaId_fkey" FOREIGN KEY ("mangaId") REFERENCES "Manga" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CharacterManga_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TagsManga" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "mangaId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,
    CONSTRAINT "TagsManga_mangaId_fkey" FOREIGN KEY ("mangaId") REFERENCES "Manga" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TagsManga_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tags" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CategoryManga" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "mangaId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    CONSTRAINT "CategoryManga_mangaId_fkey" FOREIGN KEY ("mangaId") REFERENCES "Manga" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CategoryManga_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AuthorManga" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "mangaId" INTEGER NOT NULL,
    "authorId" INTEGER NOT NULL,
    CONSTRAINT "AuthorManga_mangaId_fkey" FOREIGN KEY ("mangaId") REFERENCES "Manga" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "AuthorManga_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
