import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeGetUserProfileUseCase } from "@/use-cases/factories/make-get-user-profile-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export const getUserProfile = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const getUserProfileBodySchema = z.object({
    userId: z.string(),
  });
  const { userId } = getUserProfileBodySchema.parse(request.body);

  try {
    const getUserProfileUseCase = makeGetUserProfileUseCase();
    await getUserProfileUseCase.execute({
      userId
    });
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }
    throw error;
  }
  return reply.status(200).send();
};
