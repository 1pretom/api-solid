import { registerUseCase } from "@/use-cases/register";
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

  try {
    await registerUseCase({
      dateOfBirth,
      email,
      name,
      password,
      shirtNumber,
    });
  } catch (error) {
    return reply.status(409).send();
  }
  return reply.status(201).send();
};
