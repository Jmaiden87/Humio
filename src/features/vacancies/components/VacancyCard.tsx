export type Vacancy = {
  id: number
  title: string
  department: string
  modality: string
  location: string
  description: string
}

type VacancyCardProps = {
  vacancy: Vacancy
  onSelect: (vacancy: Vacancy) => void
}

export function VacancyCard({ vacancy, onSelect }: VacancyCardProps) {
  return (
    <article className="vacancy-card">
      <h2 className="vacancy-title">{vacancy.title}</h2>
      <dl className="vacancy-meta vacancy-description">
        <div>
          <dt className="sr-only "></dt>
          <dd>Department: {vacancy.department}</dd>
        </div>
        <div>
          <dt className="sr-only"></dt>
          <dd>Modality: {vacancy.modality}</dd>
        </div>
        <div>
          <dt className="sr-only"></dt>
          <dd>Location: {vacancy.location}</dd>
        </div>
                <div>
          <dt className="sr-only"></dt>
          <dd>Description: {vacancy.description}</dd>
        </div>
      </dl>
      <button type="button" className="vacancy-button" onClick={() => onSelect(vacancy)}>
        View vacancy
      </button>
    </article>
  )
}
