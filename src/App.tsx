import './App.css'
import { VacancyCard } from './features/vacancies/components/VacancyCard'

const testVacancy = {
  id: 1,
  title: 'Frontend Developer',
  department: 'Technology',
  modality: 'Remote',
  location: 'Madrid',
  description: 'We are looking for a skilled frontend developer to join our team.',
}

function App() {
  return (
    <main className="mx-auto w-full max-w-xl p-8 text-left">
      <h1 className="mb-6 text-3xl font-bold text-slate-900">Vacancies</h1>
      <VacancyCard
        vacancy={testVacancy}
        onSelect={(vacancy) => console.log('Selected vacancy:', vacancy)}
      />
    </main>
  )
}

export default App
