import { ValidatePresenceUseCase } from "../validate-presence-use-case";
import { PrismaPresencesRepository } from "@/repositories/prisma/prisma-presences-repository";

export const makeValidatePresenceUseCase = () => {
    const prismaValidatePresenceRepository = new PrismaPresencesRepository();
    const validatePresenceUseCase = new ValidatePresenceUseCase(prismaValidatePresenceRepository);
    return validatePresenceUseCase
}