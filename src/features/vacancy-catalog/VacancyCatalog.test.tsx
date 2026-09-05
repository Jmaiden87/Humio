import { render, screen } from '@testing-library/react'
import { VacancyCatalog } from './VacancyCatalog'

describe('VacancyCatalog', () => {
  it('renders the vacancy catalog', () => {
    render(<VacancyCatalog />)

    expect(screen.getByRole('heading', { name: /vacancies/i })).toBeInTheDocument()
  })
})
