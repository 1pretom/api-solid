import { Presence } from "@prisma/client";
import { PresencesRepository } from "@/repositories/presences-repository";

interface GetUserMetricsUseCaseRequest {
  userId: string;
}
interface GetUserMetricsCaseUseCaseResponse {
  presencesCount: number;
}

export class GetUserMetricsUseCase {
  constructor(private presencesRepository: PresencesRepository) {}

  async execute({
    userId,
  }: GetUserMetricsUseCaseRequest): Promise<GetUserMetricsCaseUseCaseResponse> {
    const presencesCount = await this.presencesRepository.countByUserId(userId);

    return {
      presencesCount,
    };
  }
}
