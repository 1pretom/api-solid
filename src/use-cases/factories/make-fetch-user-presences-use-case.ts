import { PrismaPresencesRepository } from "@/repositories/prisma/prisma-presences-repository";
import { FetchUserPresencesHistoryUseCase } from "../fetch-user-presences-history-use-case";

export const makeFetchUserPresencesUseCase = () => {
    const prismaPresencesRepository = new PrismaPresencesRepository();
    const fetchUserPresencesHistoryUseCase = new FetchUserPresencesHistoryUseCase(prismaPresencesRepository);
    return fetchUserPresencesHistoryUseCase
}