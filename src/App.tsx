import './App.css'
import { VacancyCatalog } from './features/vacancy-catalog/VacancyCatalog'

function App() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <h1 className="text-3xl font-bold">Vacancies List</h1>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl px-4 py-8">
        <VacancyCatalog />
      </main>
    </div>
  )
}

export default App
