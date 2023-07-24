/*
  Warnings:

  - You are about to drop the `Weekdays` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_EntryToWeekdays` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "RepeatTypes" AS ENUM ('daily', 'weekly', 'monthly', 'yearly', 'none');

-- DropForeignKey
ALTER TABLE "_EntryToWeekdays" DROP CONSTRAINT "_EntryToWeekdays_A_fkey";

-- DropForeignKey
ALTER TABLE "_EntryToWeekdays" DROP CONSTRAINT "_EntryToWeekdays_B_fkey";

-- AlterTable
ALTER TABLE "Entry" ADD COLUMN     "repeatOn" "RepeatTypes" NOT NULL DEFAULT 'none';

-- DropTable
DROP TABLE "Weekdays";

-- DropTable
DROP TABLE "_EntryToWeekdays";

-- DropEnum
DROP TYPE "Days";
