-- DropForeignKey
ALTER TABLE "to_do" DROP CONSTRAINT "to_do_listId_fkey";

-- AlterTable
ALTER TABLE "to_do" ALTER COLUMN "listId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "to_do" ADD CONSTRAINT "to_do_listId_fkey" FOREIGN KEY ("listId") REFERENCES "list"("id") ON DELETE SET NULL ON UPDATE CASCADE;
