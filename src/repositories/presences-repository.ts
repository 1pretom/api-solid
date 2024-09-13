import { Presence, Prisma } from "@prisma/client";

export interface PresencesRepository {
  create(data: Prisma.PresenceUncheckedCreateInput): Promise<Presence>;
  findByUserIdOnDate(userId: string, date: Date): Promise<Presence | null>;
  findManyByUserId(userId: string): Promise<Presence[]>;
}
