import { Presence } from "@prisma/client";
import { PresencesRepository } from "../repositories/presences-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface ValidatePresenceUseCaseRequest {
  presenceId: string;
}
interface ValidatePresenceUseCaseResponse {
  presence: Presence;
}

export class ValidatePresenceUseCase {
  constructor(private presencesRepository: PresencesRepository) {}

  async execute({
    presenceId,
  }: ValidatePresenceUseCaseRequest): Promise<ValidatePresenceUseCaseResponse> {
    const presence = await this.presencesRepository.findById(presenceId);
    if (!presence) {
      throw new ResourceNotFoundError();
    }
    presence.created_at = new Date();

    await this.presencesRepository.save(presence)

    return {
      presence,
    };
  }
}
