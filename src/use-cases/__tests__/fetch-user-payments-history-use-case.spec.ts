import { InMemoryPaymentsRepository } from "../../repositories/in-memory/in-memory-payments-repository";
import { expect, describe, it, beforeEach } from "vitest";
import { FetchUserPaymentsHistoryUseCase } from "../fetch-user-payments-history-use-case";

let paymentsRepository: InMemoryPaymentsRepository;
let sut: FetchUserPaymentsHistoryUseCase;

describe("Fetch User Payments History Use Case", () => {
  beforeEach(async () => {
    paymentsRepository = new InMemoryPaymentsRepository();
    sut = new FetchUserPaymentsHistoryUseCase(paymentsRepository);
  });

  it("should be able to fetch paginated payments history", async () => {
    for (let i = 1; i <= 22; i++) {
      await paymentsRepository.create({
        group_id: `group-${i}`,
        user_id: "user-01",
        amount: 12.3,
      });
    }

    const { payments } = await sut.execute({
      userId: "user-01",
      page: 2,
    });

    expect(payments).toHaveLength(2);
    expect(payments).toEqual([
      expect.objectContaining({ group_id: "group-21" }),
      expect.objectContaining({ group_id: "group-22" }),
    ]);
  });
});
