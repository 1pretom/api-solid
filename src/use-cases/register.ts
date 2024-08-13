import { prisma } from "@/lib/prisma";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { UsersRepository } from "@/repositories/users-repository";
import { hash } from "bcryptjs";

interface RegisterUseCaseRequest {
  password: string;
  email: string;
  name: string;
  shirtNumber: number;
  dateOfBirth: string;
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}
  execute = async ({
    password,
    email,
    name,
    shirtNumber,
    dateOfBirth,
  }: RegisterUseCaseRequest) => {
    const password_hash = await hash(password, 6); //6 é o valor de rounds que o hash é gerado, e 6 é um valor bom para aplicações web

    const userWithSameEmail = await this.usersRepository.findByEmail(email);
    if (userWithSameEmail) {
      throw new Error("Email already registered");
    }
    // const prismaUsersRepository = new PrismaUsersRepository();

    await this.usersRepository.create({
      email,
      name,
      password_hash,
      shirt_number: shirtNumber,
      date_of_birth: dateOfBirth,
    });
  };
}
