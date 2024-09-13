import { InMemoryPresencesRepository } from '../../repositories/in-memory/in-memory-presence-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { GetUserMetricsUseCase } from '../get-user-metrics-use-case'

let presencesRepository: InMemoryPresencesRepository
let sut: GetUserMetricsUseCase

describe('Fetch User Metrics History Use Case', () => {
  beforeEach(async () => {
    presencesRepository = new InMemoryPresencesRepository()
    sut = new GetUserMetricsUseCase(presencesRepository)
  })

  it('should be able to get presences count from metrics', async () => {
    await presencesRepository.create({
      group_id: 'group-01',
      user_id: 'user-01',
    })

    await presencesRepository.create({
      group_id: 'group-02',
      user_id: 'user-01',
    })

    const { presencesCount } = await sut.execute({
      userId: 'user-01',
    })

    expect(presencesCount).toEqual(0)
  })

})