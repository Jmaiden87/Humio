import type { Vacancy } from '@/shared/types'

type VacancyCardProps = {
  vacancy: Vacancy
  onSelect: (vacancy: Vacancy) => void
}

export function VacancyCard({ vacancy, onSelect }: VacancyCardProps) {
  return (
    <article className="vacancy-card">
      <h2 className="vacancy-title">{vacancy.title}</h2>
      <p className="vacancy-summary">{vacancy.description}</p>
      <dl className="vacancy-meta">
        <div>
          <dt className="sr-only">Department</dt>
          <dd>{vacancy.department}</dd>
        </div>
        <div>
          <dt className="sr-only">Modality</dt>
          <dd>{vacancy.modality}</dd>
        </div>
        <div>
          <dt className="sr-only">Location</dt>
          <dd>{vacancy.location}</dd>
        </div>
      </dl>
      <button type="button" className="vacancy-button" onClick={() => onSelect(vacancy)}>
        View vacancy
      </button>
    </article>
  )
}
