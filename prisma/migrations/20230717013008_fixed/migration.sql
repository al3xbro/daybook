/*
  Warnings:

  - The primary key for the `entryWeekdays` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `entryWeekdays` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "entryWeekdays" DROP CONSTRAINT "entryWeekdays_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "entryWeekdays_pkey" PRIMARY KEY ("weekdayId", "entrydayId");
