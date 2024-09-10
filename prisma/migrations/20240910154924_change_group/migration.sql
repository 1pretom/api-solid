/*
  Warnings:

  - You are about to drop the column `presence_id` on the `groups` table. All the data in the column will be lost.
  - Added the required column `group_id` to the `presence` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "groups" DROP CONSTRAINT "groups_presence_id_fkey";

-- AlterTable
ALTER TABLE "groups" DROP COLUMN "presence_id";

-- AlterTable
ALTER TABLE "presence" ADD COLUMN     "group_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "presence" ADD CONSTRAINT "presence_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
