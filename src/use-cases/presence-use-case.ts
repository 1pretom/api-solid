import { Presence } from "@prisma/client";
import { PresencesRepository } from "../repositories/presences-repository";

interface PresenceCaseRequest {
  userId: string;
  groupId: string;
  amount: number;
}
interface PresenceCaseResponse {
  presence: Presence;
}

export class PresenceUseCase {
  constructor(private presencesRepository: PresencesRepository) {}

  async execute({
    groupId,
    userId,
    amount,
  }: PresenceCaseRequest): Promise<PresenceCaseResponse> {
    const presenceOnSameDate =
      await this.presencesRepository.findByUserIdOnDate(userId, new Date());
    if (presenceOnSameDate) {
      throw new Error();
    }

    const presence = await this.presencesRepository.create({
      group_id: groupId,
      user_id: userId,
      
    });

    return {
      presence,
    };
  }
}
