/*
  Warnings:

  - Added the required column `reoccuringDays` to the `Entry` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Days" AS ENUM ('sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday');

-- AlterTable
ALTER TABLE "Entry" ADD COLUMN     "reoccuringDays" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Weekdays" (
    "days" "Days" NOT NULL,

    CONSTRAINT "Weekdays_pkey" PRIMARY KEY ("days")
);

-- CreateTable
CREATE TABLE "entryWeekdays" (
    "id" TEXT NOT NULL,
    "weekdayId" "Days" NOT NULL,
    "entrydayId" TEXT NOT NULL,

    CONSTRAINT "entryWeekdays_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "entryWeekdays" ADD CONSTRAINT "entryWeekdays_weekdayId_fkey" FOREIGN KEY ("weekdayId") REFERENCES "Weekdays"("days") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "entryWeekdays" ADD CONSTRAINT "entryWeekdays_entrydayId_fkey" FOREIGN KEY ("entrydayId") REFERENCES "Entry"("id") ON DELETE CASCADE ON UPDATE CASCADE;
