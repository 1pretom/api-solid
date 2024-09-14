import { InMemoryPresencesRepository } from '../../repositories/in-memory/in-memory-presence-repository'
import { ResourceNotFoundError } from '../../use-cases/errors/resource-not-found-error'
import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest'
import { ValidatePresenceUseCase } from '../validate-presence-use-case'

let presencesRepository: InMemoryPresencesRepository
let sut: ValidatePresenceUseCase
describe('Validate Check-in Use Case', () => {
  beforeEach(async () => {
    presencesRepository = new InMemoryPresencesRepository()
    sut = new ValidatePresenceUseCase(presencesRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to validate the presence', async () => {
    const createdPresence = await presencesRepository.create({
      group_id: 'group-01',
      user_id: 'user-01',
      validated_at: new Date()
    })
    const { presence } = await sut.execute({
      presenceId: createdPresence.id,
    })
    expect(presence.validated_at).toEqual(expect.any(Date))
    expect(presencesRepository.items[0].validated_at).toEqual(expect.any(Date))
  })
  it('should not be able to validate an inexistent presence', async () => {
    await expect(() =>
      sut.execute({
        presenceId: 'inexistent-presence-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to validate the presence after 20 minutes of its creation', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40))

    const createdPresence = await presencesRepository.create({
      group_id: 'group-01',
      user_id: 'user-01',
    })

    const twentyOneMinutesInMs = 1000 * 60 * 21

    vi.advanceTimersByTime(twentyOneMinutesInMs)

    await expect(() =>
      sut.execute({
        presenceId: createdPresence.id,
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})