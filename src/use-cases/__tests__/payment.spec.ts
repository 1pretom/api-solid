import { expect, describe, it, beforeEach, vi, afterEach } from "vitest";
import { InMemoryPaymentsRepository } from "../../repositories/in-memory/in-memory-payments-repository";
import { PaymentUseCase } from "../payment-use-case";

let PaymentsRepository: InMemoryPaymentsRepository;
let sut: PaymentUseCase;

describe("payment Use Case", () => {
  beforeEach(() => {
    PaymentsRepository = new InMemoryPaymentsRepository();
    sut = new PaymentUseCase(PaymentsRepository);
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });
  it("should be able to register payment", async () => {
    const { payment } = await sut.execute({
      amount: 32.2,
      groupId: "group_id",
      userId: "user_id",
    });

    expect(payment.id).toEqual(expect.any(String));
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
    
    const { payment } = await sut.execute({
      amount: 32.2,
      groupId: "group_id",
      userId: "user_id",
    });

    expect(payment.id).toEqual(expect.any(String));
  });
});
