/*
  Warnings:

  - You are about to drop the column `slug` on the `subjects` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "subjects_slug_key";

-- AlterTable
ALTER TABLE "subjects" DROP COLUMN "slug";
