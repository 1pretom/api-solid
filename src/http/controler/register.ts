import { prisma } from "@/lib/prisma";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";


export const register = async (request:FastifyRequest, reply: FastifyReply) => {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
    shirtNumber: z.number(),
    dateOfBirth: z.string(),
  });
  const { dateOfBirth, email, name, password, shirtNumber } =
    registerBodySchema.parse(request.body);

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash: password,
      shirt_number: shirtNumber,
      date_of_birth: dateOfBirth,
    },
  });
  return reply.status(201).send()
};
