# Sistema Inteligente de Selección de Personal con IA

## Versión
1.0 (MVP)

---

# Descripción

Sistema web para automatizar el proceso de preselección de candidatos mediante un agente de Inteligencia Artificial.

El objetivo es que el departamento de Recursos Humanos pueda crear una vacante, subir los CV de los candidatos y dejar que un agente de IA analice cada perfil, compare sus competencias con los requisitos del puesto y genere una recomendación objetiva de los mejores candidatos.

El sistema no pretende sustituir al reclutador, sino actuar como un asistente inteligente que reduzca el tiempo de análisis y mejore la calidad de la selección.

---

# Objetivos

- Automatizar la preselección de candidatos.
- Reducir el tiempo dedicado al análisis manual de CV.
- Evaluar todos los candidatos utilizando los mismos criterios.
- Proporcionar una puntuación objetiva y justificable.
- Generar una lista corta (Shortlist) con los candidatos más adecuados.
- Explicar de forma transparente por qué un candidato es recomendado.

---

# Tipos de Usuario

## Administrador

Responsable de la administración general del sistema.

Permisos:

- Gestionar usuarios.
- Configurar parámetros globales.
- Configurar el umbral de recomendación por defecto.
- Consultar todas las vacantes.

---

## Recruiter (RRHH)

Responsable del proceso de selección.

Permisos:

- Crear vacantes.
- Editar vacantes.
- Cargar CV.
- Consultar evaluaciones.
- Revisar recomendaciones de la IA.
- Seleccionar candidatos para entrevista.

---

# Flujo General del Sistema

```text
Crear Vacante
        │
        ▼
Definir requisitos del puesto
        │
        ▼
Subir CVs
        │
        ▼
Extracción automática de información
        │
        ▼
Evaluación mediante IA
        │
        ▼
Comparación con requisitos
        │
        ▼
Cálculo de puntuación
        │
        ▼
Generación de justificación
        │
        ▼
Aplicación del umbral de recomendación
        │
        ▼
Generación de Shortlist
        │
        ▼
Selección para entrevista
```

---

# Casos de Uso

# UC-001 Crear Vacante

## Descripción

Permite crear una nueva oferta de empleo.

## Información de la Vacante

- Título
- Departamento
- Modalidad
- Ubicación
- Descripción
- Responsabilidades
- Experiencia requerida
- Estudios requeridos
- Idiomas
- Hard Skills
- Soft Skills
- Requisitos obligatorios
- Requisitos deseables

### Configuración de Evaluación

Cada vacante podrá definir:

- Peso de experiencia
- Peso de habilidades técnicas
- Peso de habilidades blandas
- Peso de idiomas
- Peso de formación
- Peso de certificaciones
- Umbral mínimo de recomendación (por defecto: 70%)

---

# UC-002 Subir Candidatos

## Descripción

Permite cargar uno o varios CV asociados a una vacante.

### Funcionalidades

- Subida múltiple
- PDF
- DOCX
- Asociación automática a la vacante

### Estado inicial

Pendiente de evaluación.

---

# UC-003 Evaluación Automática mediante IA

## Descripción

Una vez cargados los CV, el agente inicia automáticamente el análisis.

## Proceso

Para cada candidato:

1. Leer el CV.
2. Extraer datos personales.
3. Identificar experiencia laboral.
4. Detectar tecnologías.
5. Detectar herramientas.
6. Detectar idiomas.
7. Detectar formación.
8. Detectar certificaciones.
9. Calcular años de experiencia.
10. Identificar habilidades blandas.
11. Comparar el perfil con la vacante.
12. Calcular la puntuación final.
13. Generar una explicación detallada.

---

# UC-004 Generación de Shortlist de Candidatos

## Descripción

Una vez evaluados todos los candidatos, el sistema genera automáticamente una **Shortlist** con los perfiles recomendados.

El objetivo es que RRHH visualice únicamente los candidatos que realmente cumplen con los requisitos del puesto.

## Reglas de Negocio

### Umbral de recomendación

Solo serán considerados candidatos cuya puntuación sea igual o superior al umbral configurado para la vacante.

Por defecto:

**70 puntos sobre 100**

### Selección automática

- Si existen 3 o más candidatos que superan el umbral, se mostrarán únicamente los **3 mejores**.
- Si existen únicamente 2 candidatos válidos, se mostrarán esos 2.
- Si existe únicamente 1 candidato válido, se mostrará ese candidato.
- Si ningún candidato supera el umbral, la IA indicará que no existen candidatos recomendados para la vacante.

### Orden

Mayor puntuación → Menor puntuación.

---

# UC-005 Visualizar Evaluación

Al seleccionar un candidato se mostrará un informe completo.

## Información General

- Nombre
- Score
- Compatibilidad
- Estado

---

## Resumen Profesional

Descripción generada automáticamente por la IA.

---

## Puntuación

Ejemplo

95/100

Compatibilidad

95%

Nivel

⭐⭐⭐⭐⭐ Excelente

---

## Puntos Fuertes

Ejemplo

- Más de 8 años de experiencia.
- Amplio dominio de React.
- Experiencia en liderazgo técnico.
- Inglés C1.
- Experiencia con AWS.
- Certificaciones relevantes.

---

## Aspectos a Mejorar

Ejemplo

- No posee experiencia con Kubernetes.
- Escasa experiencia en arquitectura de microservicios.

---

## Comparativa con la Vacante

| Requisito | Resultado |
|------------|-----------|
| React | ✅ |
| NodeJS | ✅ |
| Docker | ✅ |
| AWS | ✅ |
| Kubernetes | ❌ |
| Inglés | ✅ |

---

## Justificación de la IA

El agente generará una explicación similar a:

> El candidato presenta una alta compatibilidad con el puesto debido a que cumple todos los requisitos obligatorios y la mayoría de los deseables. Destaca especialmente su experiencia en React, Node.js y AWS, además de contar con experiencia liderando equipos. La única carencia identificada es la falta de experiencia demostrable en Kubernetes, aunque este aspecto no afecta significativamente a la puntuación final.

---

# Pantallas

## Dashboard

Indicadores principales

- Vacantes activas
- Candidatos evaluados
- Evaluaciones pendientes
- Shortlists generadas
- Entrevistas programadas

---

## Gestión de Vacantes

Listado de vacantes.

Acciones

- Crear
- Editar
- Eliminar
- Ver candidatos

---

## Formulario de Vacante

Formulario para definir:

- Información general
- Requisitos
- Skills
- Pesos de evaluación
- Umbral de recomendación

---

## Gestión de Candidatos

Listado de CV asociados a la vacante.

Acciones

- Subir CV
- Eliminar
- Ver evaluación
- Reprocesar CV

---

# Shortlist IA (Vista Principal)

Esta será la pantalla principal para RRHH.

Mostrará únicamente los candidatos recomendados por la IA.

Máximo:

**3 candidatos**

Cada tarjeta mostrará:

- Nombre
- Score
- Compatibilidad
- Años de experiencia
- Hard Skills principales
- Soft Skills destacadas
- Idiomas
- Resumen profesional
- Botón "Ver evaluación"

Además incluirá un indicador visual según el nivel de recomendación.

| Score | Estado |
|--------|---------|
| 90 - 100 | ⭐ Recomendado |
| 80 - 89 | ✅ Muy recomendable |
| 70 - 79 | ✔️ Apto |
| <70 | ❌ No recomendado |

Al final aparecerá un mensaje generado por IA.

Ejemplo

"La IA recomienda estos candidatos por presentar la mayor compatibilidad con los requisitos definidos para esta vacante."

También existirá un botón:

**Ver todos los candidatos**

para permitir auditorías o revisión manual.

---

# Arquitectura

```text
                    Frontend (Next.js)

                           │

                API REST / Backend

                           │

                    PostgreSQL

                           │

────────────────────────────────────────────

                Agente Inteligente IA

            ┌─────────────────────────┐
            │ Extracción del CV        │
            ├─────────────────────────┤
            │ Comprensión del perfil   │
            ├─────────────────────────┤
            │ Comparación con vacante  │
            ├─────────────────────────┤
            │ Cálculo del Score        │
            ├─────────────────────────┤
            │ Generación explicación   │
            ├─────────────────────────┤
            │ Aplicación del umbral    │
            └─────────────────────────┘
```

---

# Modelo de Datos

## Vacante

- id
- título
- descripción
- responsabilidades
- requisitos
- hard_skills
- soft_skills
- experiencia_minima
- idiomas
- formación
- peso_experiencia
- peso_hard_skills
- peso_soft_skills
- peso_formación
- peso_idiomas
- peso_certificaciones
- umbral_recomendación
- estado
- fecha_creación

---

## Candidato

- id
- vacante_id
- nombre
- email
- teléfono
- cv
- fecha_subida

---

## Evaluación

- id
- candidato_id
- score
- compatibilidad
- fortalezas
- debilidades
- resumen
- explicación_ia
- recomendado
- fecha

---

# Algoritmo de Evaluación

Ponderación por defecto

| Criterio | Peso |
|----------|------|
| Experiencia | 30% |
| Hard Skills | 35% |
| Soft Skills | 10% |
| Formación | 10% |
| Idiomas | 10% |
| Certificaciones | 5% |

La puntuación final será configurable por vacante para adaptarse a diferentes perfiles profesionales.

---

# Requisitos No Funcionales

- Interfaz responsive.
- Procesamiento paralelo de múltiples CV.
- Evaluaciones auditables y justificables.
- Escalabilidad para miles de candidatos.
- Seguridad y protección de datos personales.
- Trazabilidad de todas las decisiones del agente de IA.
- Configuración flexible de pesos y umbral por vacante.

---

# Roadmap

## Fase 1 (MVP)

- Gestión de vacantes.
- Subida de CV.
- Evaluación automática.
- Shortlist automática.
- Informe individual.

## Fase 2

- Comparación entre candidatos.
- Exportación de informes PDF y Excel.
- Historial de evaluaciones.
- Filtros avanzados.
- Búsqueda inteligente.

## Fase 3

- Integración con LinkedIn y portales de empleo.
- Integración con ATS externos.
- Chat con el agente de IA para consultar candidatos.
- Generación automática de preguntas para entrevistas.
- Aprendizaje basado en decisiones de RRHH (feedback loop).
- Dashboard analítico con métricas de contratación.

---

# Visión del Producto

El sistema actuará como un **Recruitment AI Assistant**, capaz de analizar decenas o cientos de candidatos en pocos minutos y presentar únicamente los perfiles con mayor potencial para una vacante específica.

La decisión final siempre recaerá en el equipo de Recursos Humanos, mientras que la IA proporcionará una evaluación objetiva, explicable y configurable, optimizando el proceso de selección y mejorando la calidad de las contrataciones.