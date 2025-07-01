-- AlterTable
ALTER TABLE "Candidate" ADD COLUMN     "post" TEXT NOT NULL DEFAULT 'General';

-- AlterTable
ALTER TABLE "Election" ADD COLUMN     "post" TEXT NOT NULL DEFAULT 'General';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;
