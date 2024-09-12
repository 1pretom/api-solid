import { GroupsRepository } from "@/repositories/groups-repository";
import { hash } from "bcryptjs";
import { Group } from "@prisma/client";

interface CreateGroupUseCaseRequest {
  title: string;
  description?: string | null;
  icon: string;
  latitude: number;
  longitude: number;
}
interface CreateGroupUseCaseResponse {
  group: Group;
}

export class CreateGroupUseCase {
  constructor(private groupsRepository: GroupsRepository) {}
  async execute({
    title,
    description,
    icon,
    latitude,
    longitude,
  }: CreateGroupUseCaseRequest): Promise<CreateGroupUseCaseResponse> {
    const group = await this.groupsRepository.create({
      title,
      description,
      icon,
      latitude,
      longitude,
    });
    return {
      group,
    };
  }
}
