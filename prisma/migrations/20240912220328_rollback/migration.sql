/*
  Warnings:

  - You are about to drop the column `description` on the `groups` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `groups` table. All the data in the column will be lost.
  - You are about to drop the column `group_id` on the `users` table. All the data in the column will be lost.
  - Added the required column `name` to the `groups` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `groups` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_group_id_fkey";

-- AlterTable
ALTER TABLE "groups" DROP COLUMN "description",
DROP COLUMN "title",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "group_id";

-- AddForeignKey
ALTER TABLE "groups" ADD CONSTRAINT "groups_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
