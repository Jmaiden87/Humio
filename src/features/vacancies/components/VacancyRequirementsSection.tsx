type Props = {
  values: {
    requiredSkills: string
    optionalSkills: string
    experienceMin: string
    educationLevel: string
  }
  onChange: (field: keyof Props['values'], value: string) => void
}

export function VacancyRequirementsSection({ values, onChange }: Props) {
  return (
    <fieldset className="space-y-4 rounded-lg border border-slate-200 bg-white p-6">
      <legend className="px-2 text-lg font-semibold text-slate-900">Requisitos</legend>
      <label className="block text-sm font-medium text-slate-700">
        Habilidades obligatorias
        <input required placeholder="React, TypeScript" value={values.requiredSkills} onChange={(event) => onChange('requiredSkills', event.target.value)} className="mt-1 w-full rounded-md border border-slate-300 p-2" />
      </label>
      <label className="block text-sm font-medium text-slate-700">
        Habilidades deseables
        <input placeholder="Jest, Docker" value={values.optionalSkills} onChange={(event) => onChange('optionalSkills', event.target.value)} className="mt-1 w-full rounded-md border border-slate-300 p-2" />
      </label>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block text-sm font-medium text-slate-700">
          Años mínimos de experiencia
          <input required min="0" type="number" value={values.experienceMin} onChange={(event) => onChange('experienceMin', event.target.value)} className="mt-1 w-full rounded-md border border-slate-300 p-2" />
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Nivel educativo
          <input required value={values.educationLevel} onChange={(event) => onChange('educationLevel', event.target.value)} className="mt-1 w-full rounded-md border border-slate-300 p-2" />
        </label>
      </div>
    </fieldset>
  )
}
