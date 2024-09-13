import { InMemoryPresencesRepository } from '../../repositories/in-memory/in-memory-presence-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { FetchUserPresencesHistoryUseCase } from '../fetch-user-presences-history-use-case'

let presencesRepository: InMemoryPresencesRepository
let sut: FetchUserPresencesHistoryUseCase

describe('Fetch User Presences History Use Case', () => {
  beforeEach(async () => {
    presencesRepository = new InMemoryPresencesRepository()
    sut = new FetchUserPresencesHistoryUseCase(presencesRepository as any)
  })

  it('should be able to fetch presences history', async () => {
    await presencesRepository.create({
      group_id: 'group-01',
      user_id: 'user-01',
    })

    await presencesRepository.create({
      group_id: 'group-02',
      user_id: 'user-01',
    })

    const { presences } = await sut.execute({
      userId: 'user-01',
      page: 1,
    })

    expect(presences).toHaveLength(2)
    expect(presences).toEqual([
      expect.objectContaining({ group_id: 'group-01' }),
      expect.objectContaining({ group_id: 'group-02' }),
    ])
  })

  it('should be able to fetch paginated presences history', async () => {
    for (let i = 1; i <= 22; i++) {
      await presencesRepository.create({
        group_id: `group-${i}`,
        user_id: 'user-01',
      })
    }

    const { presences } = await sut.execute({
      userId: 'user-01',
      page: 2,
    })

    expect(presences).toHaveLength(2)
    expect(presences).toEqual([
      expect.objectContaining({ group_id: 'group-21' }),
      expect.objectContaining({ group_id: 'group-22' }),
    ])
  })
})