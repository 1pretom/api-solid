import { GroupsRepository } from "@/repositories/groups-repository";
import { Group } from "@prisma/client";

interface FetchNearbyGroupsUseCaseRequest {
  userLatitude: number;
  userLongitude: number;
}
interface FetchNearbyGroupsUseCaseResponse {
  groups: Group[];
}

export class FetchNearbyGroupsUseCase {
  constructor(private groupsRepository: GroupsRepository) {}
  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearbyGroupsUseCaseRequest): Promise<FetchNearbyGroupsUseCaseResponse> {
    const groups = await this.groupsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    });
    return {
      groups,
    };
  }
}
