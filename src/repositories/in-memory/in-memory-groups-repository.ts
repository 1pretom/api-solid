import { Group, Prisma } from "@prisma/client";
import { GroupsRepository } from "../groups-repository";
import { randomUUID } from "node:crypto";

export class InMemoryGroupsRepository implements GroupsRepository {
  public items: Group[] = [];

  async fingById(id: string) {
    const group = this.items.find((item) => item.id === id);

    if (!group) {
      return null;
    }

    return group;
  }
  
}
