import { InMemoryUsersRepository } from "../../repositories/in-memory/in-memory-users-repository";
import { hash } from "bcryptjs";
import { expect, describe, it, beforeEach } from "vitest";
import { GetUserProfileUseCase } from "../get-user-profile-use-case";
import { ResourceNotFountError } from "../errors/resource-not-found-error";

let usersRepository: InMemoryUsersRepository;
let sut: GetUserProfileUseCase;

describe("Get User Profile Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new GetUserProfileUseCase(usersRepository);
  });
  it("should be able to getUserProfile", async () => {
    const createdUser = await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("12345678", 8),
      date_of_birth: "sim",
      shirt_number: 2,
    });

    const { user } = await sut.execute({
      userId: createdUser.id,
    });

    expect(user.id).toEqual(expect.any(String));
    expect(user.name).toEqual("John Doe");
  });

  it("should not be able to getUserProfile with wrong id", async () => {
    await expect(() =>
      sut.execute({
        userId: "not-found-id2",
      })
    ).rejects.toBeInstanceOf(ResourceNotFountError);
  });
});
