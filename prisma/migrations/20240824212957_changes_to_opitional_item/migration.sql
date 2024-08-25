/*
  Warnings:

  - Made the column `icon` on table `groups` required. This step will fail if there are existing NULL values in that column.
  - Made the column `date_of_birth` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "groups" ALTER COLUMN "icon" SET NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "date_of_birth" SET NOT NULL;
