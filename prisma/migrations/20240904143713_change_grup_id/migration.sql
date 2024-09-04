/*
  Warnings:

  - Made the column `payment_id` on table `groups` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "groups" ALTER COLUMN "payment_id" SET NOT NULL;
