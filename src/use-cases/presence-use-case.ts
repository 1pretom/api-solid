import { Presence } from "@prisma/client";
import { PresencesRepository } from "../repositories/presences-repository";
import { GroupsRepository } from "@/repositories/groups-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { getDistanceBetweenCoordinates } from "../utils/get-distance-between-coordinates";
import { MaxNumberOfPresencesError } from "./errors/max-number-of-presences-error";
import { MaxDistanceError } from "./errors/max-distance-error";

interface PresenceUseCaseRequest {
  userId: string;
  groupId: string;
  userLatitude: number;
  userLongitude: number;
}
interface PresenceUseCaseResponse {
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
    userLatitude,
    userLongitude,
  }: PresenceUseCaseRequest): Promise<PresenceUseCaseResponse> {
    const group = await this.groupsRepository.findById(groupId);

    if (!group) {
      throw new ResourceNotFoundError();
    }
    const distance = getDistanceBetweenCoordinates(
      { latitude: userLatitude, longitude: userLongitude },
      {
        latitude: group.latitude.toNumber(),
        longitude: group.longitude.toNumber(),
      }
    );
    const MAX_DISTANCE_IN_KM = 0.1;
    if (distance > MAX_DISTANCE_IN_KM) {
      throw new MaxDistanceError();
    }

    const presenceOnSameDate =
      await this.presencesRepository.findByUserIdOnDate(userId, new Date());
    if (presenceOnSameDate) {
      throw new MaxNumberOfPresencesError();
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
