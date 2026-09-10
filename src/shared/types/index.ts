export type Vacancy = {
  id: number
  title: string
  department: string
  modality: string
  location: string
  image: string
  description: string
}

export type VacancyStatus = 'Activa' | 'Cerrada' | 'En evaluación'
export type VacancyModality = 'remoto' | 'presencial' | 'hibrido'

export type VacancyFormData = {
  title: string
  shortDescription: string
  department: string
  modality: VacancyModality | ''
  location: string
  requiredSkills: string[]
  optionalSkills: string[]
  experienceMin: number
  educationLevel: string
  description: string
  responsibilities: string[]
  benefits: string[]
  status: VacancyStatus
  createdAt: string
  updatedAt: string
}
