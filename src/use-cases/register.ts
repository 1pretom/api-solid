import { prisma } from "@/lib/prisma";
import { PrismaUsersRepository } from "@/repositories/prisma-users-repository";
import { hash } from "bcryptjs";

interface RegisterUseCaseRequest {
  password: string;
  email: string;
  name: string;
  shirtNumber: number;
  dateOfBirth: string;
}

export class RegisterUseCase {
  constructor(private usersRepository: any) {}
  execute = async ({
    password,
    email,
    name,
    shirtNumber,
    dateOfBirth,
  }: RegisterUseCaseRequest) => {
    const password_hash = await hash(password, 6); //6 é o valor de rounds que o hash é gerado, e 6 é um valor bom para aplicações web

    const userWithSameEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

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
