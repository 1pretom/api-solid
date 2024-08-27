import { InMemoryUsersRepository } from "../../repositories/in-memory/in-memory-users-repository";
import { hash } from "bcryptjs";
import { expect, describe, it, beforeEach } from "vitest";
import { AuthenticateUseCase } from "../authenticate-use-case";
import { InvalidCredentialsError } from "../errors/invalid-credentials-error";

let usersRepository: InMemoryUsersRepository;
let sut: AuthenticateUseCase;

describe("Authenticate Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateUseCase(usersRepository);
  });
  it("should be able to authenticate", async () => {
    await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("12345678", 8),
      date_of_birth: "sim",
      shirt_number: 2,
    });

    const { user } = await sut.execute({
      email: "johndoe@example.com",
      password: "12345678",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should not be able to authenticate with wrong email", async () => {


    expect(() =>
      sut.execute({
        email: "johndoe@example.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to authenticate with wrong email", async () => {


    await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("12345678", 8),
      date_of_birth: "sim",
      shirt_number: 2,
    });

    expect(() =>
      sut.execute({
        email: "johndoe@example.com",
        password: "123123",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
