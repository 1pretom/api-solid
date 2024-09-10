import { Payment, Prisma } from "@prisma/client";
import { PaymentsRepository } from "../payments-repository";
import { randomUUID } from "node:crypto";
import dayjs from "dayjs";

export class InMemoryPaymentsRepository implements PaymentsRepository {
  public items: Payment[] = [];

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf("date");
    const endOfTheDay = dayjs(date).endOf("date");

    const paymentOnSameDate = this.items.find((payment) => {
      const paymentDate = dayjs(payment.created_at);
      const isOnSabeDate = paymentDate.isAfter(startOfTheDay) && paymentDate.isBefore(endOfTheDay)

      return payment.user_id === userId && isOnSabeDate;
    });
    if (!paymentOnSameDate) {
      return null;
    }
    return paymentOnSameDate;
  }

  async create(data: Prisma.PaymentUncheckedCreateInput) {
    const payment = {
      id: randomUUID(),
      amount: data.amount,
      group_id: data.group_id,
      user_id: data.user_id,
      created_at: new Date(),
    };

    this.items.push(payment);

    return payment;
  }
}
