import { PaymentsRepository } from "@/repositories/payments-repository";
import { Payment } from "@prisma/client";

interface PaymentCaseRequest {
  userId: string;
  groupId: string;
  amount: number;
}
interface PaymentCaseResponse {
  payment: Payment;
}

export class PaymentUseCase {
  constructor(private paymentsRepository: PaymentsRepository) {}

  async execute({
    groupId,
    userId,
    amount,
  }: PaymentCaseRequest): Promise<PaymentCaseResponse> {

    const paymentOnSameDate = await this.paymentsRepository.findByUserIdOnDate(
      userId,
      new Date(),
    )
    if (paymentOnSameDate){
      throw new Error
    }

    const payment = await this.paymentsRepository.create({
      group_id: groupId,
      user_id: userId,
      amount,
    });

    return {
      payment,
    };
  }
}
