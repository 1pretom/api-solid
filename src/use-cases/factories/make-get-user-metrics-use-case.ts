
import { GetUserMetricsUseCase } from "../get-user-metrics-use-case";
import { PrismaPresencesRepository } from "@/repositories/prisma/prisma-presences-repository";

export const makeGetUserMetricsUseCase = () => {
    const prismaPresencesRepository = new PrismaPresencesRepository();
    const getUserMetricsUseCase = new GetUserMetricsUseCase(prismaPresencesRepository);
    return getUserMetricsUseCase
}