-- DropIndex
DROP INDEX "Message_userId_key";

-- AlterTable
ALTER TABLE "Message" ALTER COLUMN "content" SET DATA TYPE TEXT,
ALTER COLUMN "chatroomId" DROP DEFAULT;
DROP SEQUENCE "Message_chatroomId_seq";

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sid" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Session_sid_key" ON "Session"("sid");
