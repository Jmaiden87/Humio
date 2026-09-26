import type { VacancyFormData } from '@/shared/types'

export type ApiVacancy = {
  id: number
  title: string
  description: string
  requirements: string
  requiredSkills: string[]
  optionalSkills: string[]
  experience_level: number
  department: string
  modality: string
  location: string
  category: string
  contractType: string
  created_at: string
}

const apiUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:8000/api'

export async function createVacancy(data: VacancyFormData): Promise<ApiVacancy> {
  const response = await fetch(`${apiUrl}/vacancies`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: data.title,
      description: data.description,
      requirements: data.educationLevel,
      requiredSkills: data.requiredSkills,
      optionalSkills: data.optionalSkills,
      experience_level: data.experienceMin,
      department: data.department,
      modality: data.modality,
      location: data.location,
      category: data.category,
      contractType: data.contractType,
    }),
  })
  if (!response.ok) throw new Error('No se pudo crear la vacante')
  return response.json() as Promise<ApiVacancy>
}

export async function getVacancies(): Promise<ApiVacancy[]> {
  const response = await fetch(`${apiUrl}/vacancies`)
  if (!response.ok) throw new Error('No se pudieron cargar las vacantes')
  return response.json() as Promise<ApiVacancy[]>
}
