import { useEffect, useState } from 'react'
import { getVacancies, type ApiVacancy } from '@/shared/api/vacancies'
import { vacancies } from '@/shared/data/vacancies'
import type { Vacancy } from '@/shared/types'
import { VacancyCard } from '@/features/vacancy-catalog/components/VacancyCard'

export function VacancyCatalog() {
  const [items, setItems] = useState<ApiVacancy[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    getVacancies().then(setItems).catch((reason: unknown) => {
      setError(reason instanceof Error ? reason.message : 'No se pudieron cargar las vacantes')
    })
  }, [])

  const catalog: Vacancy[] = items.length > 0
    ? items.map((vacancy) => ({
      id: vacancy.id,
      title: vacancy.title,
      department: vacancy.department,
      modality: vacancy.modality,
      location: vacancy.location,
      image: '',
      description: vacancy.description,
    }))
    : vacancies

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-8">
      <h2 className="mb-6 text-2xl font-bold text-[#212529]">Vacancies</h2>
      {error && <p role="alert" className="mb-4 text-red-700">{error}</p>}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {catalog.map((vacancy) => (
          <VacancyCard key={vacancy.id} vacancy={vacancy} onSelect={() => undefined} />
        ))}
      </div>
    </section>
  )
}
