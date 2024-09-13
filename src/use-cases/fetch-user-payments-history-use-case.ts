import { Presence } from "@prisma/client";
import { PaymentsRepository } from "@/repositories/payments-repository";

interface FetchUserPaymentsHistoryRequest {
  userId: string;
}
interface FetchUserPaymentsHistoryCaseUseCaseResponse {
  payments: Presence[];
}

export class FetchUserPaymentsHistory {
  constructor(private paymentsRepository: PaymentsRepository) {}

  async execute({
    userId,
  }: FetchUserPaymentsHistoryRequest): Promise<FetchUserPaymentsHistoryCaseUseCaseResponse> {
    const payments = await this.paymentsRepository.findManyByUserId(userId);
    
    return {
      payments,
    };
  }
}
