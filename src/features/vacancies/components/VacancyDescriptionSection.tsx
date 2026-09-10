type Props = {
  values: {
    description: string
    responsibilities: string
    benefits: string
  }
  onChange: (field: keyof Props['values'], value: string) => void
}

export function VacancyDescriptionSection({ values, onChange }: Props) {
  return (
    <fieldset className="space-y-4 rounded-lg border border-slate-200 bg-white p-6">
      <legend className="px-2 text-lg font-semibold text-slate-900">Descripción</legend>
      <label className="block text-sm font-medium text-slate-700">
        Descripción completa
        <textarea required rows={4} value={values.description} onChange={(event) => onChange('description', event.target.value)} className="mt-1 w-full rounded-md border border-slate-300 p-2" />
      </label>
      <label className="block text-sm font-medium text-slate-700">
        Responsabilidades
        <textarea required placeholder="Una responsabilidad por línea" value={values.responsibilities} onChange={(event) => onChange('responsibilities', event.target.value)} className="mt-1 w-full rounded-md border border-slate-300 p-2" />
      </label>
      <label className="block text-sm font-medium text-slate-700">
        Beneficios
        <textarea required placeholder="Un beneficio por línea" value={values.benefits} onChange={(event) => onChange('benefits', event.target.value)} className="mt-1 w-full rounded-md border border-slate-300 p-2" />
      </label>
    </fieldset>
  )
}
