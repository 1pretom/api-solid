import { UsersRepository } from "@/repositories/users-repository";
import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";
import { User } from "@prisma/client";

interface CreateGymUseCaseRequest {
  title: string;
  description: string | null;
}
interface CreateGymUseCaseResponse {
  user: User;
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}
  async execute({
    title,
    description,
  }: CreateGymUseCaseRequest): Promise<CreateGymUseCaseRequest> {
    const password_hash = await hash(password, 6); //6 é o valor de rounds que o hash é gerado, e 6 é um valor bom para aplicações web

    const userWithSameEmail = await this.usersRepository.findByEmail(email);
    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const gym = await this.usersRepository.create({

    });
    return {
      gym
    };
  }
}
