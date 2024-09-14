/*
  Warnings:

  - Added the required column `validated_at` to the `presence` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "presence" ADD COLUMN     "validated_at" TIMESTAMP(3) NOT NULL;
