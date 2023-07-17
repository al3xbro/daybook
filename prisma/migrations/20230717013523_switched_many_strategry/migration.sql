/*
  Warnings:

  - You are about to drop the `entryWeekdays` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "entryWeekdays" DROP CONSTRAINT "entryWeekdays_entrydayId_fkey";

-- DropForeignKey
ALTER TABLE "entryWeekdays" DROP CONSTRAINT "entryWeekdays_weekdayId_fkey";

-- DropTable
DROP TABLE "entryWeekdays";

-- CreateTable
CREATE TABLE "_EntryToWeekdays" (
    "A" TEXT NOT NULL,
    "B" "Days" NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_EntryToWeekdays_AB_unique" ON "_EntryToWeekdays"("A", "B");

-- CreateIndex
CREATE INDEX "_EntryToWeekdays_B_index" ON "_EntryToWeekdays"("B");

-- AddForeignKey
ALTER TABLE "_EntryToWeekdays" ADD CONSTRAINT "_EntryToWeekdays_A_fkey" FOREIGN KEY ("A") REFERENCES "Entry"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EntryToWeekdays" ADD CONSTRAINT "_EntryToWeekdays_B_fkey" FOREIGN KEY ("B") REFERENCES "Weekdays"("days") ON DELETE CASCADE ON UPDATE CASCADE;
