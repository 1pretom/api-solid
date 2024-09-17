import { SearchGroupsUseCase } from "../search-group-use-case";
import { PrismaGroupsRepository } from "@/repositories/prisma/prisma-groups-repository";

export const makeSearchGroupsUseCase = () => {
    const prismaGroupsRepository = new PrismaGroupsRepository();
    const searchGroupsUseCase = new SearchGroupsUseCase(prismaGroupsRepository);
    return searchGroupsUseCase
}