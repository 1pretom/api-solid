import { Group, Prisma } from "@prisma/client";

export interface GroupsRepository {
  fingById(id: string): Promise<Group | null>;
  create(data: Prisma.GroupCreateInput): Promise<Group>;
}
