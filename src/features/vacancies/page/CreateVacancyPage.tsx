import type { VacancyFormData } from '@/shared/types'
import { VacancyForm } from '../components/VacancyForm'

type Props = {
  onBack: () => void
}

export function CreateVacancyPage({ onBack }: Props) {
  const handleSubmit = (vacancy: VacancyFormData) => {
    console.log('Vacancy created:', vacancy)
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#212529]">
      <header className="border-b border-[#E9ECEF] bg-[#00509D]">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-5">
          <div>
            <p className="text-sm font-medium text-[#BDE3F7]">Vacancies</p>
            <h1 className="mt-1 text-3xl font-bold text-white">Create Vacancy</h1>
          </div>
          <button type="button" onClick={onBack} className="rounded-md bg-white px-4 py-2 font-semibold text-[#00509D] hover:bg-[#E9ECEF]">
            Volver al catálogo
          </button>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl px-4 py-8">
        <VacancyForm onSubmit={handleSubmit} />
      </main>
    </div>
  )
}
