import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";


interface RegisterUseCaseRequest {
  password: string;
  email: string;
  name: string;
  shirtNumber: number;
  dateOfBirth: string;
}

export const registerUseCase = async ({
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
  await prisma.user.create({
    data: {
      name,
      email,
      password_hash,
      shirt_number: shirtNumber,
      date_of_birth: dateOfBirth,
    },
  });
};
