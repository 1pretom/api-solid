import { CreateGroupUseCase } from "../create-group-use-case";
import { PrismaGroupsRepository } from "@/repositories/prisma/prisma-groups-repository";

export const makeCreateGroupUseCase = () => {
    const prismaGroupsRepository = new PrismaGroupsRepository();
    const createGroupUseCase = new CreateGroupUseCase(prismaGroupsRepository);
    return createGroupUseCase
}