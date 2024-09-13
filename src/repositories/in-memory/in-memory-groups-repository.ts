import { Group, Prisma } from "@prisma/client";
import { GroupsRepository } from "../groups-repository";
import { randomUUID } from "node:crypto";

export class InMemoryGroupsRepository implements GroupsRepository {
  public items: Group[] = [];

  async findById(id: string) {
    const group = this.items.find((item) => item.id === id);

    if (!group) {
      return null;
    }

    return group;
  }

  async create(data: Prisma.GroupCreateInput) {
    const group = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      icon: data.icon ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
      created_at: new Date(),
      user_id: "" ?? data.user,
    };

    this.items.push(group);

    return group;
  }
}
