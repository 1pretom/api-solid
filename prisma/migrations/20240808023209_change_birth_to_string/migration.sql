-- DropForeignKey
ALTER TABLE "groups" DROP CONSTRAINT "groups_payment_id_fkey";

-- AlterTable
ALTER TABLE "groups" ALTER COLUMN "payment_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "date_of_birth" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "groups" ADD CONSTRAINT "groups_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "payments"("id") ON DELETE SET NULL ON UPDATE CASCADE;
