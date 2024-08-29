import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error";
import { makeRegisterUseCase } from "@/use-cases/factories/make-register-use-case";
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
    const registerUseCase = makeRegisterUseCase();
    await registerUseCase.execute({
      dateOfBirth,
      email,
      name,
      password,
      shirtNumber,
    });
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    }
    throw error;
  }
  return reply.status(201).send();
};
