import { expect, describe, it, beforeEach } from "vitest";
import { CreateGroupUseCase } from "../create-group-use-case";
import { InMemoryGroupsRepository } from "../../repositories/in-memory/in-memory-groups-repository";

let groupsRepository: InMemoryGroupsRepository;
let sut: CreateGroupUseCase;

describe("Create Group Use Case", () => {
  beforeEach(() => {
    groupsRepository = new InMemoryGroupsRepository();
    sut = new CreateGroupUseCase(groupsRepository as any);
  });

  it("should to create group", async () => {
    const { group } = await sut.execute({
      title: "JavaScript Group",
      description: null,
      icon: "null",
      latitude: -27.2092052,
      longitude: -49.6401091,
    });

    expect(group.id).toEqual(expect.any(String));
  });
});
