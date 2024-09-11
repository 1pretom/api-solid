/*
  Warnings:

  - You are about to drop the column `user_id` on the `groups` table. All the data in the column will be lost.
  - Made the column `created_at` on table `groups` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `groupId` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `group_id` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "groups" DROP CONSTRAINT "groups_user_id_fkey";

-- AlterTable
ALTER TABLE "groups" DROP COLUMN "user_id",
ALTER COLUMN "created_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "groupId" TEXT NOT NULL,
ADD COLUMN     "group_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
