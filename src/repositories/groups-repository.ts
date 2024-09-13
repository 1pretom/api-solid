import { Group, Prisma } from "@prisma/client";

export interface GroupsRepository {
  create(data: Prisma.GroupCreateInput): Promise<Group>;
  findById(id: string): Promise<Group | null>;
  searchMany(query: string, page: number): Promise<Group[]>;
}
