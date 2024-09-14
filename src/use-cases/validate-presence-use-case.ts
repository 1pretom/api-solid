import { Presence } from "@prisma/client";
import { PresencesRepository } from "../repositories/presences-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import dayjs from "dayjs";
import { LatePresenceValidateError } from "./errors/late-presence-validate-error";

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

    const distanceInMinutesFromPresenceCreation = dayjs(new Date()).diff(
      presence.created_at,
      "minutes"
    );
    if (distanceInMinutesFromPresenceCreation > 20) {
      throw new LatePresenceValidateError();
    }

    presence.validated_at = new Date();

    await this.presencesRepository.save(presence);

    return {
      presence,
    };
  }
}
