import './App.css'
import { useState } from 'react'
import { VacancyCatalog } from './features/vacancy-catalog/VacancyCatalog'
import { CreateVacancyPage } from './features/vacancies/page/CreateVacancyPage'

function App() {
  const [isCreating, setIsCreating] = useState(false)

  if (isCreating) {
    return <CreateVacancyPage onBack={() => setIsCreating(false)} />
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#212529]">
      <header className="border-b border-[#E9ECEF] bg-[#00509D]">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-5">
          <h1 className="text-3xl font-bold text-white">Vacancies List</h1>
          <button
            type="button"
            onClick={() => setIsCreating(true)}
            className="rounded-md bg-[#4EA8DE] px-4 py-2 font-semibold text-white transition hover:bg-[#3d96cb]"
          >
            Crear Vacante
          </button>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl px-4 py-8">
        <VacancyCatalog />
      </main>
    </div>
  )
}

export default App
