import { Presence } from "@prisma/client";
import { PresencesRepository } from "@/repositories/presences-repository";

interface FetchUserPresencesHistoryUseCaseRequest {
  userId: string;
  page: number;
}
interface FetchUserPresencesHistoryCaseUseCaseResponse {
  presences: Presence[];
}

export class FetchUserPresencesHistoryUseCase {
  constructor(private presencesRepository: PresencesRepository) {}

  async execute({
    userId,
    page
  }: FetchUserPresencesHistoryUseCaseRequest): Promise<FetchUserPresencesHistoryCaseUseCaseResponse> {
    const presences = await this.presencesRepository.findManyByUserId(
      userId,
      page
    );

    return {
      presences,
    };
  }
}
