import { beforeEach, describe, expect, it } from "vitest";
import { RegisterUseCase } from "../register-use-case";
import { compare } from "bcryptjs";
import { UserAlreadyExistsError } from "../errors/user-already-exists-error";
import { InMemoryUsersRepository } from "../../repositories/in-memory/in-memory-users-repository";

let usersRepository: InMemoryUsersRepository;
let sut: RegisterUseCase;
describe("Register Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new RegisterUseCase(usersRepository);
  });
  it("should hash user password upon registration", async () => {
    const registerUseCase = new RegisterUseCase({
      async findByEmail(email) {
        return null;
      },

      async create(data) {
        return {
          id: data.id,
          name: data.name,
          email: data.email,
          password_hash: data.password_hash,
          shirt_number: data.shirt_number,
          created_at: data.created_at,
          date_of_birth: data.date_of_birth,
        };
      },
    });
    const { user } = await registerUseCase.execute({
      name: "Wash",
      dateOfBirth: String(Date.now()),
      email: "wash@example.com",
      password: "123456",
      shirtNumber: 1,
    });
    const isPasswordCorrectlyHashed = await compare(
      "123456",
      user.password_hash
    );
    expect(isPasswordCorrectlyHashed).toBeTruthy();
  });
  it("should not be able to register with same email twice", async () => {
    await sut.execute({
      name: "Washington",
      dateOfBirth: "",
      email: "wash@example.com",
      password: "123456",
      shirtNumber: 1,
    });

    await expect(() =>
      sut.execute({
        name: "Wash",
        dateOfBirth: "",
        email: "wash@example.com",
        password: "123456",
        shirtNumber: 1,
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
