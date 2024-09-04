import { Payment, Prisma } from "@prisma/client";
import { PaymentsRepository } from "../payments-repository";
import { randomUUID } from "node:crypto";

export class InMemoryPaymentsRepository implements PaymentsRepository {
  public items: Payment[] = [];

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
