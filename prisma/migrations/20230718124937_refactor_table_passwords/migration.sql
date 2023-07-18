/*
  Warnings:

  - You are about to drop the column `title` on the `passwords` table. All the data in the column will be lost.
  - You are about to alter the column `description` on the `passwords` table. The data in that column could be lost. The data in that column will be cast from `VarChar(200)` to `VarChar(50)`.

*/
-- AlterTable
ALTER TABLE "passwords" DROP COLUMN "title",
ADD COLUMN     "username" TEXT,
ALTER COLUMN "description" SET DATA TYPE VARCHAR(50);
