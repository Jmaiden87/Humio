import type { VacancyModality } from '@/shared/types'

type Props = {
  values: {
    title: string
    shortDescription: string
    department: string
    modality: VacancyModality | ''
    location: string
  }
  onChange: (field: keyof Props['values'], value: string) => void
}

export function VacancyGeneralSection({ values, onChange }: Props) {
  return (
    <fieldset className="space-y-4 rounded-lg border border-slate-200 bg-white p-6">
      <legend className="px-2 text-lg font-semibold text-slate-900">Datos generales</legend>
      <label className="block text-sm font-medium text-slate-700">
        Título de la vacante
        <input required value={values.title} onChange={(event) => onChange('title', event.target.value)} className="mt-1 w-full rounded-md border border-slate-300 p-2" />
      </label>
      <label className="block text-sm font-medium text-slate-700">
        Descripción breve
        <input required value={values.shortDescription} onChange={(event) => onChange('shortDescription', event.target.value)} className="mt-1 w-full rounded-md border border-slate-300 p-2" />
      </label>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block text-sm font-medium text-slate-700">
          Departamento
          <input required value={values.department} onChange={(event) => onChange('department', event.target.value)} className="mt-1 w-full rounded-md border border-slate-300 p-2" />
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Modalidad
          <select required value={values.modality} onChange={(event) => onChange('modality', event.target.value)} className="mt-1 w-full rounded-md border border-slate-300 bg-white p-2">
            <option value="">Selecciona una modalidad</option>
            <option value="remoto">Remoto</option>
            <option value="presencial">Presencial</option>
            <option value="hibrido">Híbrido</option>
          </select>
        </label>
      </div>
      <label className="block text-sm font-medium text-slate-700">
        Ubicación
        <input required value={values.location} onChange={(event) => onChange('location', event.target.value)} className="mt-1 w-full rounded-md border border-slate-300 p-2" />
      </label>
    </fieldset>
  )
}
