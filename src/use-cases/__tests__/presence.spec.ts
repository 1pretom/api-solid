import { expect, describe, it, beforeEach, vi, afterEach } from "vitest";
import { PresenceUseCase } from "../presence-use-case";
import { InMemoryPresencesRepository } from "@/repositories/in-memory/in-memory-presence-repository";

let PresencesRepository: InMemoryPresencesRepository;
let sut: PresenceUseCase;

describe("presence Use Case", () => {
  beforeEach(() => {
    PresencesRepository = new InMemoryPresencesRepository();
    sut = new PresenceUseCase(PresencesRepository);
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });
  it("should be able to register presence", async () => {
    const { presence } = await sut.execute({
      amount: 32.2,
      groupId: "group_id",
      userId: "user_id",
    });

    expect(presence.id).toEqual(expect.any(String));
  });

  it("should not be able to pay twice in the same day", async () => {
    vi.setSystemTime(new Date(2024, 0, 1, 13, 0, 0));

    await sut.execute({
      amount: 32.2,
      groupId: "group_id",
      userId: "user_id",
    });
    await expect(() =>
      sut.execute({
        amount: 32.2,
        groupId: "group_id",
        userId: "user_id",
      })
    ).rejects.toBeInstanceOf(Error);
  });
  it("should be able to pay twice in different days", async () => {
    vi.setSystemTime(new Date(2024, 0, 1, 13, 0, 0));

    await sut.execute({
      amount: 32.2,
      groupId: "group_id",
      userId: "user_id",
    });

    vi.setSystemTime(new Date(2024, 0, 2, 13, 0, 0));

    const { presence } = await sut.execute({
      amount: 32.2,
      groupId: "group_id",
      userId: "user_id",
    });

    expect(presence.id).toEqual(expect.any(String));
  });
});
