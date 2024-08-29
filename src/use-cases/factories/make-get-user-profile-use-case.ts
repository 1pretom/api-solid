import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { GetUserProfileUseCase } from "../get-user-profile-use-case";

export const makeGetUserProfileUseCase = () => {
  const prismaUsersRepository = new PrismaUsersRepository();
  const authenticateUseCase = new GetUserProfileUseCase(prismaUsersRepository);
  return authenticateUseCase;
};
