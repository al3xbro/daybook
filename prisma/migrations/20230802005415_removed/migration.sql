/*
  Warnings:

  - Made the column `notes` on table `Entry` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Entry" ALTER COLUMN "notes" SET NOT NULL;
