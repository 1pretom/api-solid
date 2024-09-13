import { Presence, Prisma } from "@prisma/client";
import { PresencesRepository } from "../presences-repository";
import { randomUUID } from "node:crypto";
import dayjs from "dayjs";

export class InMemoryPresencesRepository implements PresencesRepository {
  public items: Presence[] = [];
  
  async findManyByUserId(userId: string) {
    return this.items.filter((presence) => presence.user_id === userId);
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf("date");
    const endOfTheDay = dayjs(date).endOf("date");

    const presenceOnSameDate = this.items.find((presence) => {
      const presenceDate = dayjs(presence.created_at);
      const isOnSabeDate =
        presenceDate.isAfter(startOfTheDay) &&
        presenceDate.isBefore(endOfTheDay);

      return presence.user_id === userId && isOnSabeDate;
    });
    if (!presenceOnSameDate) {
      return null;
    }
    return presenceOnSameDate;
  }

  async create(data: Prisma.PresenceUncheckedCreateInput) {
    const presence = {
      id: randomUUID(),
      group_id: data.group_id,
      user_id: data.user_id,
      created_at: new Date(),
    };

    this.items.push(presence);

    return presence;
  }
}
