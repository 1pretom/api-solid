import { hash } from "bcryptjs";
import { expect, describe, it, beforeEach } from "vitest";
import { InvalidCredentialsError } from "../errors/invalid-credentials-error";
import { InMemoryPaymentsRepository } from "../../repositories/in-memory/in-memory-payments-repository";
import { PaymentUseCase } from "../payment-use-case";

let PaymentsRepository: InMemoryPaymentsRepository;
let sut: PaymentUseCase;

describe("payment Use Case", () => {
  beforeEach(() => {
    PaymentsRepository = new InMemoryPaymentsRepository();
    sut = new PaymentUseCase(PaymentsRepository);
  });
  it.only("should be able to register payment", async () => {
    // await PaymentsRepository.create({
    //   id: 'data',
    //   amount: 32.2,
    //   group_id: 'group_id',
    //   user_id: 'user_id',
    // });

    const { payment } = await sut.execute({
      
      amount: 32.2,
      groupId: 'group_id',
      userId: 'user_id',
    });

    expect(payment.id).toEqual(expect.any(String));
  });

  it("should not be able to payment with wrong email", async () => {
    expect(() =>
      sut.execute({
        email: "johndoe@example.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to payment with wrong email", async () => {
    await PaymentsRepository.create({
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
