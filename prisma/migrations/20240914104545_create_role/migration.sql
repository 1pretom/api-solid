/*
  Warnings:

  - You are about to drop the column `created_at` on the `groups` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'MEMBER');

-- AlterTable
ALTER TABLE "groups" DROP COLUMN "created_at",
ALTER COLUMN "icon" DROP NOT NULL;

-- AlterTable
ALTER TABLE "presence" ALTER COLUMN "validated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'MEMBER';
