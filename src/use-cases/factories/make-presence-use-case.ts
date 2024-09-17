import { PrismaGroupsRepository } from "@/repositories/prisma/prisma-groups-repository";
import { PrismaPresencesRepository } from "@/repositories/prisma/prisma-presences-repository";
import { PresenceUseCase } from "../presence-use-case";

export const makePresencesUseCase = () => {
  const prismaPresencesRepository = new PrismaPresencesRepository();
  const prismaGroupsRepository = new PrismaGroupsRepository();
  
  const getPresencesUseCase = new PresenceUseCase(
    prismaPresencesRepository,
    prismaGroupsRepository
  );
  return getPresencesUseCase;
};
