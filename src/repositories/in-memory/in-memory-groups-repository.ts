import { Group, Prisma } from "@prisma/client";
import { FindManyNearbyParams, GroupsRepository } from "../groups-repository";
import { randomUUID } from "node:crypto";
import { getDistanceBetweenCoordinates } from "../../utils/get-distance-between-coordinates";

export class InMemoryGroupsRepository implements GroupsRepository {
  public items: Group[] = [];

  async searchMany(query: string, page: number) {
    return this.items
      .filter((item) => item.title.includes(query))
      .slice((page - 1) * 20, page * 20);
  }

  async findManyNearby(params: FindManyNearbyParams) {
    return this.items.filter((item) => {
      const distance = getDistanceBetweenCoordinates(
        { latitude: params.latitude, longitude: params.longitude },
        {
          latitude: item.latitude.toNumber(),
          longitude: item.longitude.toNumber(),
        }
      );
      return distance < 10;
    });
  }

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
