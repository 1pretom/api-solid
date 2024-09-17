import { Prisma, Group } from "@prisma/client";
import { FindManyNearbyParams, GroupsRepository } from "../groups-repository";
import { prisma } from "@/lib/prisma";
import { group } from "console";

export class PrismaGroupsRepository implements GroupsRepository {
  async create(data: Prisma.GroupCreateInput) {
    const group = await prisma.group.create({
      data,
    });
    return group;
  }
  async findById(id: string) {
    const group = await prisma.group.findUnique({
      where: {
        id,
      },
    });
    return group;
  }
  async findManyNearby({ latitude, longitude }: FindManyNearbyParams) {
    const gyms = await prisma.$queryRaw<Group[]>`
    SELECT * from gyms
    WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10 
   `;
    return gyms;
  }
  async searchMany(query: string, page: number) {
    const groups = await prisma.group.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    });
    return groups;
  }
}
