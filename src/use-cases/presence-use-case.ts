import { Presence } from "@prisma/client";
import { PresencesRepository } from "../repositories/presences-repository";
import { GroupsRepository } from "@/repositories/groups-repository";
import { ResourceNotFountError } from "./errors/resource-not-found-error";

interface PresenceCaseRequest {
  userId: string;
  groupId: string;
  userLatitude: number;
  userLongitude: number;
}
interface PresenceCaseResponse {
  presence: Presence;
}

export class PresenceUseCase {
  constructor(
    private presencesRepository: PresencesRepository,
    private groupsRepository: GroupsRepository
  ) {}

  async execute({
    groupId,
    userId,
  }: PresenceCaseRequest): Promise<PresenceCaseResponse> {
    const group = await this.groupsRepository.fingById(groupId);

    if (!group) {
      throw new ResourceNotFountError();
    }

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
