/*
  Warnings:

  - You are about to drop the column `name` on the `groups` table. All the data in the column will be lost.
  - Added the required column `title` to the `groups` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "groups" DROP CONSTRAINT "groups_user_id_fkey";

-- AlterTable
ALTER TABLE "groups" DROP COLUMN "name",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "title" TEXT NOT NULL,
ALTER COLUMN "user_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "groups" ADD CONSTRAINT "groups_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
