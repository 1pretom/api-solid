import { expect, describe, it, beforeEach, vi, afterEach } from "vitest";
import { PresenceUseCase } from "../presence-use-case";
import { InMemoryPresencesRepository } from "../../repositories/in-memory/in-memory-presence-repository";
import { InMemoryGroupsRepository } from "../../repositories/in-memory/in-memory-groups-repository";
import { Decimal } from "@prisma/client/runtime/library";

let presencesRepository: InMemoryPresencesRepository;
let groupsRepository: InMemoryGroupsRepository;
let sut: PresenceUseCase;

describe("presence Use Case", () => {
  beforeEach(() => {
    presencesRepository = new InMemoryPresencesRepository();
    groupsRepository = new InMemoryGroupsRepository();
    sut = new PresenceUseCase(presencesRepository, groupsRepository);

    groupsRepository.items.push({
      id: "group_id",
      name: "Baba europeu",
      icon: "does_not_have.com",
      user_id: "",
      created_at: new Date(Date.now()),
      latitude: new Decimal(-12.91915642530577),
      longitude: new Decimal(-38.428171065849604),
    });

    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });
  it("should be able to register presence", async () => {
    const { presence } = await sut.execute({
      groupId: "group_id",
      userId: "user_id",
      userLatitude: -12.91915642530577,
      userLongitude: -38.428171065849604,
    });

    expect(presence.id).toEqual(expect.any(String));
  });

  it("should not be able to register presence twice in the same day", async () => {
    vi.setSystemTime(new Date(2024, 0, 1, 13, 0, 0));

    await sut.execute({
      groupId: "group_id",
      userId: "user_id",
      userLatitude: -12.91915642530577,
      userLongitude: -38.428171065849604,
    });
    await expect(() =>
      sut.execute({
        groupId: "group_id",
        userId: "user_id",
        userLatitude: -12.91915642530577,
        userLongitude: -38.428171065849604,
      })
    ).rejects.toBeInstanceOf(Error);
  });
  it("should be able to register presence in different days", async () => {
    vi.setSystemTime(new Date(2024, 0, 1, 13, 0, 0));

    await sut.execute({
      groupId: "group_id",
      userId: "user_id",
      userLatitude: -12.91915642530577,
      userLongitude: -38.428171065849604,
    });

    vi.setSystemTime(new Date(2024, 0, 2, 13, 0, 0));

    const { presence } = await sut.execute({
      groupId: "group_id",
      userId: "user_id",
      userLatitude: -12.91915642530577,
      userLongitude: -38.428171065849604,
    });

    expect(presence.id).toEqual(expect.any(String));
  });

  it("should'n be able to register presence in distant group", async () => {
    groupsRepository.items.push({
      id: "group_id_2",
      name: "Academia ponto alto",
      icon: "does_not_have.com",
      user_id: "",
      created_at: new Date(Date.now()),
      latitude: new Decimal(-12.9330066799359),
      longitude: new Decimal(-38.426607653070896),
    });

    await expect(() =>
      sut.execute({
        groupId: "group_id_2",
        userId: "user_id",
        userLatitude: -12.91915642530577,
        userLongitude: -38.428171065849604,
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
