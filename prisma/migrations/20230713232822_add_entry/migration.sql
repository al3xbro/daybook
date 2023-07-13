-- CreateTable
CREATE TABLE "Entry" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "notes" TEXT,
    "startTime" TIMESTAMP(3),
    "endTime" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Entry_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Entry" ADD CONSTRAINT "Entry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
