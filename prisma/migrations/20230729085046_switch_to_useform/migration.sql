/*
  Warnings:

  - Made the column `startTime` on table `Entry` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Entry" ALTER COLUMN "startTime" SET NOT NULL,
ALTER COLUMN "endTime" DROP NOT NULL;
