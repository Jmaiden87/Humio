import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import type { VacancyFormData, VacancyStatus } from '@/shared/types'
import { VacancyDescriptionSection } from './VacancyDescriptionSection'
import { VacancyGeneralSection } from './VacancyGeneralSection'
import { VacancyRequirementsSection } from './VacancyRequirementsSection'

type Props = {
  onSubmit: (vacancy: VacancyFormData) => void | Promise<void>
}

const initialValues = {
  title: '',
  shortDescription: '',
  department: '',
  modality: '' as const,
  location: '',
  requiredSkills: '',
  optionalSkills: '',
  experienceMin: '',
  educationLevel: '',
  description: '',
  responsibilities: '',
  benefits: '',
}

const splitList = (value: string) => value.split(/[,\n]/).map((item) => item.trim()).filter(Boolean)

export function VacancyForm({ onSubmit }: Props) {
  const [values, setValues] = useState(initialValues)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const isValid = useMemo(() => (
    values.title.trim() &&
    values.shortDescription.trim() &&
    values.department.trim() &&
    values.modality &&
    values.location.trim() &&
    splitList(values.requiredSkills).length > 0 &&
    Number(values.experienceMin) >= 0 &&
    values.educationLevel.trim() &&
    values.description.trim() &&
    splitList(values.responsibilities).length > 0 &&
    splitList(values.benefits).length > 0
  ), [values])

  const update = (field: string, value: string) => {
    setStatus('idle')
    setValues((current) => ({ ...current, [field]: value }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!isValid) return
    setStatus('loading')
    const now = new Date().toISOString()
    const data: VacancyFormData = {
      title: values.title.trim(),
      shortDescription: values.shortDescription.trim(),
      department: values.department.trim(),
      modality: values.modality,
      location: values.location.trim(),
      requiredSkills: splitList(values.requiredSkills),
      optionalSkills: splitList(values.optionalSkills),
      experienceMin: Number(values.experienceMin),
      educationLevel: values.educationLevel.trim(),
      description: values.description.trim(),
      responsibilities: splitList(values.responsibilities),
      benefits: splitList(values.benefits),
      status: 'Activa' satisfies VacancyStatus,
      createdAt: now,
      updatedAt: now,
    }
    try {
      await onSubmit(data)
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="mx-auto max-w-4xl space-y-6">
      <VacancyGeneralSection values={values} onChange={update} />
      <VacancyRequirementsSection values={values} onChange={update} />
      <VacancyDescriptionSection values={values} onChange={update} />
      <div className="flex items-center justify-between gap-4">
        <div role="status" aria-live="polite" className="text-sm">
          {status === 'success' && <span className="text-emerald-700">Vacante guardada correctamente.</span>}
          {status === 'error' && <span className="text-red-700">No se pudo guardar la vacante.</span>}
          {status === 'loading' && <span className="text-slate-600">Guardando...</span>}
        </div>
        <button type="submit" disabled={!isValid || status === 'loading'} className="rounded-md bg-blue-600 px-5 py-2 font-semibold text-white enabled:hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50">
          Guardar
        </button>
      </div>
    </form>
  )
}
