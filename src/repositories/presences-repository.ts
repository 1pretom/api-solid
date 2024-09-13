import { Presence, Prisma } from "@prisma/client";

export interface PresencesRepository {
  create(data: Prisma.PresenceUncheckedCreateInput): Promise<Presence>;
  save(presence: Presence): Promise<Presence>;
  countByUserId(userId: string): Promise<number>;
  findById(id: string): Promise<Presence | null>;
  findByUserIdOnDate(userId: string, date: Date): Promise<Presence | null>;
  findManyByUserId(userId: string, page: number): Promise<Presence[]>;
}
