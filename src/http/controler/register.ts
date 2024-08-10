import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export const register = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
    shirtNumber: z.number(),
    dateOfBirth: z.string(),
  });
  const { dateOfBirth, email, name, password, shirtNumber } =
    registerBodySchema.parse(request.body);

  const password_hash = await hash(password, 6); //6 é o valor de rounds que o hash é gerado, e 6 é um valor bom para aplicações web

  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userWithSameEmail) {
    return reply.status(409).send({ error: "Email already registered" });
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
  return reply.status(201).send();
};
