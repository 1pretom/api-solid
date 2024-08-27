import { InMemoryUsersRepository } from "../../repositories/in-memory/in-memory-users-repository";
import { hash } from "bcryptjs";
import { expect, describe, it } from "vitest";
import { AuthenticateUseCase } from "../authenticate-use-case";
import { InvalidCredentialsError } from "../errors/invalid-credentials-error";


describe("Authenticate Use Case", () => {
  it("should be able to authenticate", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateUseCase(usersRepository);
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
    const usersRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateUseCase(usersRepository);

    expect(() =>
      sut.execute({
        email: "johndoe@example.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to authenticate with wrong email", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateUseCase(usersRepository);

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
