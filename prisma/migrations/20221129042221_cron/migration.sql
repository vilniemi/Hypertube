/*
  Warnings:

  - You are about to alter the column `comment_text` on the `Comment` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(250)`.
  - You are about to drop the `Example` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[imdb_code]` on the table `Movies` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `date` to the `Movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `downloaded` to the `Movies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "imdb_code" SET DATA TYPE TEXT,
ALTER COLUMN "comment_text" SET DATA TYPE VARCHAR(250);

-- AlterTable
ALTER TABLE "Movies" ADD COLUMN     "date" TEXT NOT NULL,
ADD COLUMN     "downloaded" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "firstLogin" INTEGER NOT NULL DEFAULT 1;

-- DropTable
DROP TABLE "Example";

-- CreateTable
CREATE TABLE "Movie" (
    "id" INTEGER NOT NULL,
    "url" TEXT,
    "imdb_code" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "title_english" TEXT,
    "title_long" TEXT,
    "slug" TEXT,
    "year" INTEGER,
    "rating" DOUBLE PRECISION,
    "runtime" DOUBLE PRECISION,
    "summary" TEXT,
    "description_full" TEXT,
    "synopsis" TEXT,
    "yt_trailer_code" TEXT,
    "language" TEXT,
    "mpa_rating" TEXT,
    "background_image" TEXT,
    "background_image_original" TEXT,
    "small_cover_image" TEXT,
    "medium_cover_image" TEXT,
    "large_cover_image" TEXT,
    "state" TEXT,
    "date_uploaded" TEXT,
    "date_uploaded_unix" INTEGER,
    "genres" TEXT[],

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Torrent" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "quality" TEXT NOT NULL,
    "type" TEXT,
    "seeds" INTEGER NOT NULL,
    "peers" INTEGER NOT NULL,
    "size_bytes" BIGINT NOT NULL,
    "size" TEXT NOT NULL,
    "date_uploaded" TEXT NOT NULL,
    "date_uploaded_unix" TEXT NOT NULL,
    "movieId" INTEGER NOT NULL,
    "downloaded" INTEGER,

    CONSTRAINT "Torrent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subtitles" (
    "id" TEXT NOT NULL,
    "imdb_code" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "path" TEXT NOT NULL,

    CONSTRAINT "Subtitles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WatchedMovies" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "movies" TEXT[],

    CONSTRAINT "WatchedMovies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Movie_id_key" ON "Movie"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Movie_imdb_code_key" ON "Movie"("imdb_code");

-- CreateIndex
CREATE UNIQUE INDEX "Torrent_id_key" ON "Torrent"("id");

-- CreateIndex
CREATE UNIQUE INDEX "WatchedMovies_user_id_key" ON "WatchedMovies"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Movies_imdb_code_key" ON "Movies"("imdb_code");

-- AddForeignKey
ALTER TABLE "Torrent" ADD CONSTRAINT "Torrent_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- SELECT cron.schedule('0 0 * * *', $$delete movie where DATE_PART('day', now()-movies.date)>30$$);
-- SELECT cron.schedule('0 0 * * *', $$delete movie where DATE_PART('day', now()-movies.last_watch)>30$$);
-- Add cron.database_name = 'hypertube' in postgresql.conf to 