import { Group, Prisma } from "@prisma/client";

export interface FindManyNearbyParams {
  latitute: number;
  longitude: number;
}
export interface GroupsRepository {
  create(data: Prisma.GroupCreateInput): Promise<Group>;
  findById(id: string): Promise<Group | null>;
  findManyNearby(params: FindManyNearbyParams): Promise<Group[]>;
  searchMany(query: string, page: number): Promise<Group[]>;
}
