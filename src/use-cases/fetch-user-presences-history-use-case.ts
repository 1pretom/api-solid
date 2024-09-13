import { Presence } from "@prisma/client";
import { PresencesRepository } from "@/repositories/presences-repository";

interface FetchUserPresencesHistoryUseCaseRequest {
  userId: string;
}
interface FetchUserPresencesHistoryCaseUseCaseResponse {
  presences: Presence[];
}

export class FetchUserPresencesHistoryUseCase {
  constructor(private presencesRepository: PresencesRepository) {}

  async execute({
    userId,
  }: FetchUserPresencesHistoryUseCaseRequest): Promise<FetchUserPresencesHistoryCaseUseCaseResponse> {
    const presences = await this.presencesRepository.findManyByUserId(userId);

    return {
      presences,
    };
  }
}
