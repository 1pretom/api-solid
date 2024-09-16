import { Presence, Prisma } from "@prisma/client";
import { PresencesRepository } from "../presences-repository";
import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";

export class PrismaPresencesRepository implements PresencesRepository {
  async create(data: Prisma.PresenceUncheckedCreateInput) {
    const presence = await prisma.presence.create({
      data,
    });
    return presence;
  }
  async save(data: Presence) {
    const presence = await prisma.presence.update({
      where: {
        id: data.id,
      },
      data,
    });
    return presence;
  }
  async countByUserId(userId: string) {
    const count = await prisma.presence.count({
      where: {
        user_id: userId,
      },
    });
    return count;
  }
  async findById(id: string) {
    const presence = await prisma.presence.findUnique({
      where: {
        id,
      },
    });
    return presence;
  }
  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf("date");
    const endOfTheDay = dayjs(date).endOf("date");
    const presences = await prisma.presence.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate(),
        },
      },
    });
    return presences;
  }
  async findManyByUserId(userId: string, page: number) {
    const presences = await prisma.presence.findMany({
      where: {
        user_id: userId,
      },
      take: 20,
      skip: (page - 1) * 20,
    });
    return presences;
  }
}
