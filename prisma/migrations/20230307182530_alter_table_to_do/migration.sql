/*
  Warnings:

  - Made the column `listId` on table `to_do` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "to_do" DROP CONSTRAINT "to_do_listId_fkey";

-- AlterTable
ALTER TABLE "to_do" ALTER COLUMN "listId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "to_do" ADD CONSTRAINT "to_do_listId_fkey" FOREIGN KEY ("listId") REFERENCES "list"("id") ON DELETE CASCADE ON UPDATE CASCADE;
