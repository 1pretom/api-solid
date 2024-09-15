import { Presence, Prisma } from "@prisma/client";
import { PresencesRepository } from "../presences-repository";
import { prisma } from "@/lib/prisma";

export class PrismaPresencesRepository implements PresencesRepository {
  async create(data: Prisma.PresenceUncheckedCreateInput) {
    throw new Error("Method not implemented.");
  }
  async save(presence: Presence) {
    throw new Error("Method not implemented.");
  }
  async countByUserId(userId: string) {
    throw new Error("Method not implemented.");
  }
  async findById(id: string) {
    const presence = await prisma.presence.findUnique({
        where:{
            id,
        },
    })
    return presence;
  }
  async findByUserIdOnDate(userId: string, date: Date) {
    throw new Error("Method not implemented.");
  }
  async findManyByUserId(userId: string, page: number) {
    throw new Error("Method not implemented.");
  }
}
