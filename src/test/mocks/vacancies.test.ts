import { describe, expect, it } from 'vitest'
import { mockVacancies } from './vacancies'

describe('mockVacancies', () => {
  it('contains six complete vacancies', () => {
    expect(mockVacancies).toHaveLength(6)

    for (const vacancy of mockVacancies) {
      expect(vacancy).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          title: expect.any(String),
          department: expect.any(String),
          modality: expect.any(String),
          location: expect.any(String),
          image: expect.any(String),
          description: expect.any(String),
        }),
      )
    }
  })
})
