import { Prisma, Group } from "@prisma/client";
import { FindManyNearbyParams, GroupsRepository } from "../groups-repository";

export class PrismaGroupsRepository implements GroupsRepository {
  async create(data: Prisma.GroupCreateInput) {
    throw new Error("Method not implemented.");
  }
  async findById(id: string) {
    throw new Error("Method not implemented.");
  }
  async findManyNearby(params: FindManyNearbyParams) {
    throw new Error("Method not implemented.");
  }
  async searchMany(query: string, page: number) {
    throw new Error("Method not implemented.");
  }
}
