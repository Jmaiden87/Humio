import { vacancies } from '@/shared/data/vacancies'
import { VacancyCard } from '@/features/vacancy-catalog/components/VacancyCard'

export function VacancyCatalog() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold text-slate-900">Vacancies</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {vacancies.map((vacancy) => (
          <VacancyCard key={vacancy.id} vacancy={vacancy} onSelect={() => undefined} />
        ))}
      </div>
    </section>
  )
}
