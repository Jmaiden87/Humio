import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { Vacancy } from '@/shared/types'
import { VacancyCard } from './VacancyCard'

describe('VacancyCard', () => {
  const mockVacancy: Vacancy = {
    id: 1,
    title: 'Frontend Developer',
    department: 'Technology',
    modality: 'Remote',
    location: 'Madrid',
    image: '/images/vacancies/frontend-developer.jpg',
    description: 'We are looking for a skilled frontend developer to join our team.',
  }
  const mockOnSelect = vi.fn()

  beforeEach(() => vi.clearAllMocks())

  it('renders vacancy information', () => {
    render(
      <VacancyCard
        vacancy={mockVacancy}
        onSelect={mockOnSelect}
      />,
    )

    expect(screen.getByText('Frontend Developer')).toBeInTheDocument()
    expect(screen.getByText('Technology')).toBeInTheDocument()
    expect(screen.getByText('Remote')).toBeInTheDocument()
    expect(screen.getByText('Madrid')).toBeInTheDocument()
    expect(screen.getByText('We are looking for a skilled frontend developer to join our team.')).toBeInTheDocument()
    expect(screen.getByText(mockVacancy.description)).toHaveClass('vacancy-summary')
  })

  it('calls onSelect when the vacancy is selected', async () => {
    const user = userEvent.setup()
    render(
      <VacancyCard
        vacancy={mockVacancy}
        onSelect={mockOnSelect}
      />,
    )

    await user.click(screen.getByRole('button', { name: /view vacancy/i }))

    expect(mockOnSelect).toHaveBeenCalledWith(mockVacancy)
  })
})
