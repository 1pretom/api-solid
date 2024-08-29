import { UsersRepository } from "@/repositories/users-repository";
import { User } from "@prisma/client";
import { ResourceNotFountError } from "./errors/resource-not-found-error";

interface GetUserProfileUseCaseRequest {
  userId: string;
}
interface GetUserProfileUseCaseResponse {
  user: User;
}

export class GetUserProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
    const user = await this.usersRepository.fingById(userId);

    if (!user) {
      throw new ResourceNotFountError();
    }

    return {
      user,
    };
  }
}
