import { describe, expect, it } from "vitest";
import { RegisterUseCase } from "../register";
import { compare } from "bcryptjs";

describe("Register Use Case", () => {
  it("should first", async () => {
    const registerUseCase = new RegisterUseCase({
      async findByEmail(email) {
        return null;
      },

      async create(data) {
        return {
          id: "user-1",
          name: data.name,
          email: data.email,
          password_hash: data.password_hash,
          shirt_number: data.shirt_number,
          created_at: new Date(),
          date_of_birth: "data.date_of_birth",
        };
      },
    });
    const { user } = await registerUseCase.execute({
      name: "Wash",
      dateOfBirth: "",
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
});
