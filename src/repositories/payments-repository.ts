import { Payment, Prisma } from "@prisma/client";

export interface PaymentsRepository {
  create(data: Prisma.PaymentUncheckedCreateInput): Promise<Payment>;
  findByUserIdOnDate(userId: string, date: Date): Promise<Payment | null>;
}
