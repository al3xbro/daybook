/*
  Warnings:

  - Changed the type of `day` on the `Entry` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `endTime` on table `Entry` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Entry" DROP COLUMN "day",
ADD COLUMN     "day" INTEGER NOT NULL,
ALTER COLUMN "endTime" SET NOT NULL;

-- DropEnum
DROP TYPE "Days";
