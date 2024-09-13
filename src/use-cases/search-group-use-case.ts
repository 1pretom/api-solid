import { GroupsRepository } from "@/repositories/groups-repository";
import { Group } from "@prisma/client";

interface SearchGroupsUseCaseRequest {
  query: string;
  page: number;
}
interface SearchGroupsUseCaseResponse {
  groups: Group[];
}

export class SearchGroupsUseCase {
  constructor(private groupsRepository: GroupsRepository) {}
  async execute({
    query,
    page,
  }: SearchGroupsUseCaseRequest): Promise<SearchGroupsUseCaseResponse> {
    const groups = await this.groupsRepository.searchMany(query, page);
    return {
      groups,
    };
  }
}
