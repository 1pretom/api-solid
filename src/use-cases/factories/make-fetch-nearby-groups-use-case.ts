import { FetchNearbyGroupsUseCase } from "../fetch-nearby-groups-use-case";
import { PrismaGroupsRepository } from "@/repositories/prisma/prisma-groups-repository";

export const makeFetchNearbyGroupsUseCase = () => {
    const prismaGroupsRepository = new PrismaGroupsRepository();
    const fetchNearbyGroupsUseCase = new FetchNearbyGroupsUseCase(prismaGroupsRepository);
    return fetchNearbyGroupsUseCase
}