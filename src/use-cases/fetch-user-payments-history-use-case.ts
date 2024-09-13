import { Presence } from "@prisma/client";
import { PaymentsRepository } from "@/repositories/payments-repository";

interface FetchUserPaymentsHistoryRequest {
  userId: string;
  page: number;
}
interface FetchUserPaymentsHistoryCaseUseCaseResponse {
  payments: Presence[];
}

export class FetchUserPaymentsHistoryUseCase {
  constructor(private paymentsRepository: PaymentsRepository) {}

  async execute({
    userId,
    page,
  }: FetchUserPaymentsHistoryRequest): Promise<FetchUserPaymentsHistoryCaseUseCaseResponse> {
    const payments = await this.paymentsRepository.findManyByUserId(
      userId,
      page
    );

    return {
      payments,
    };
  }
}
