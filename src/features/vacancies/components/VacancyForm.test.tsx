import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { VacancyForm } from './VacancyForm'

describe('VacancyForm', () => {
  it('keeps save disabled until the required fields are valid', async () => {
    const user = userEvent.setup()

    render(<VacancyForm onSubmit={vi.fn()} />)

    const saveButton = screen.getByRole('button', { name: /guardar/i })
    expect(saveButton).toBeDisabled()

    await user.type(screen.getByLabelText(/título/i), 'Frontend Developer')
    await user.type(screen.getByLabelText(/descripción breve/i), 'Build web experiences')
    await user.type(screen.getByLabelText(/departamento/i), 'Technology')
    await user.selectOptions(screen.getByLabelText(/modalidad/i), 'remoto')
    await user.type(screen.getByLabelText(/ubicación/i), 'Madrid')
    await user.type(screen.getByLabelText(/habilidades obligatorias/i), 'React, TypeScript')
    await user.type(screen.getByLabelText(/años mínimos/i), '2')
    await user.type(screen.getByLabelText(/nivel educativo/i), 'Computer Science')
    await user.type(screen.getByLabelText(/descripción completa/i), 'Build accessible products')
    await user.type(screen.getByLabelText(/responsabilidades/i), 'Develop interfaces')
    await user.type(screen.getByLabelText(/beneficios/i), 'Health insurance')

    expect(saveButton).toBeEnabled()
  })

  it('submits the form and shows success feedback', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()

    render(<VacancyForm onSubmit={onSubmit} />)

    await user.type(screen.getByLabelText(/título/i), 'Backend Engineer')
    await user.type(screen.getByLabelText(/descripción breve/i), 'Build APIs')
    await user.type(screen.getByLabelText(/departamento/i), 'Technology')
    await user.selectOptions(screen.getByLabelText(/modalidad/i), 'hibrido')
    await user.type(screen.getByLabelText(/ubicación/i), 'Barcelona')
    await user.type(screen.getByLabelText(/habilidades obligatorias/i), 'Node.js')
    await user.type(screen.getByLabelText(/años mínimos/i), '3')
    await user.type(screen.getByLabelText(/nivel educativo/i), 'Engineering')
    await user.type(screen.getByLabelText(/descripción completa/i), 'Build reliable APIs')
    await user.type(screen.getByLabelText(/responsabilidades/i), 'Design services')
    await user.type(screen.getByLabelText(/beneficios/i), 'Flexible hours')
    await user.click(screen.getByRole('button', { name: /guardar/i }))

    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Backend Engineer',
        modality: 'hibrido',
        requiredSkills: ['Node.js'],
        experienceMin: 3,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      }),
    )
    expect(screen.getByRole('status')).toHaveTextContent(/guardada correctamente/i)
  })
})
