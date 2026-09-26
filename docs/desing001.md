# Sistema Inteligente de Selección de Personal con IA

## Versión

1.1 (MVP)

---

# Descripción

Sistema web para automatizar el proceso de preselección de candidatos mediante un agente de Inteligencia Artificial.

El objetivo es que el departamento de Recursos Humanos pueda crear una vacante, recibir postulaciones de candidatos y dejar que un agente de IA analice cada perfil, compare sus competencias con los requisitos del puesto y genere una recomendación objetiva de los candidatos más adecuados.

El sistema no pretende sustituir al reclutador, sino actuar como un asistente inteligente que reduzca el tiempo de análisis y mejore la calidad de la selección.

---

# Objetivos

* Automatizar la preselección de candidatos.
* Reducir el tiempo dedicado al análisis manual de CV.
* Evaluar todos los candidatos utilizando los mismos criterios.
* Proporcionar una puntuación objetiva y justificable.
* Generar una lista corta (Shortlist) con los candidatos más adecuados.
* Explicar de forma transparente por qué un candidato es recomendado.

---

# Tipos de Usuario

## Administrador

Responsable de la administración general del sistema.

### Permisos

* Gestionar usuarios.
* Configurar parámetros globales.
* Configurar el umbral de recomendación por defecto.
* Consultar todas las vacantes.

---

## Recruiter (RRHH)

Responsable del proceso de selección.

### Permisos

* Crear vacantes.
* Editar vacantes.
* Cargar CV.
* Consultar evaluaciones.
* Revisar recomendaciones de la IA.
* Seleccionar candidatos para entrevista.

## Candidato (RRHH)

Aspirante a un puesto de trabajo.

### Permisos

* Ver Vacantes disponibles.
* Cargar CV al puesto que desea postularse.

---

# Entidades Principales

* **Vacante**
* **Candidato**
* **Evaluación**
* **Shortlist**
* **Reporte**

---

# Flujo General del Sistema

```text
Crear Vacante
        │
        ▼
Definir requisitos del puesto
        │
        ▼
Subir CVs/ recibir postulaciones
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

### Datos generales

* `title` — nombre del puesto.
* `shortDdescription` — breve descipcion del puesto
* `department` — área o unidad de negocio.
* `madality` — presencial, remoto o híbrido.
* `contractType` — full-time, part-time.
* `ubication` — ciudad, pais.
* `seniority` — junior, semi senior o senior.

### Requisitos

* `requiredSkills[]` — habilidades obligatorias.
* `optionsSkills[]` — habilidades deseables.
* `experienceMin` — años mínimos de experiencia.
* `educationLevel` — nivel educativo requerido.
* Idiomas.
* Hard Skills.
* Soft Skills.
* Requisitos obligatorios.
* Requisitos deseables.

### Descripción

* `description` — texto largo con detalles del puesto.
* `responsibilities[]` — lista de responsabilidades principales.
* `benefits[]` — lista de beneficios del puestos.

### Metadatos

* `status` — activa, en evaluación o cerrada.
* `createdAt` — generado automáticamente.
* `updatedAt` — generado automáticamente.

### Configuración de Evaluación

Cada vacante podrá definir:

* Peso de experiencia.
* Peso de habilidades técnicas.
* Peso de habilidades blandas.
* Peso de idiomas.
* Peso de formación.
* Peso de certificaciones.
* Umbral mínimo de recomendación.

Por defecto, el umbral será de **70 puntos sobre 100**.

### Regla

> Una vacante no puede publicarse si falta algún campo obligatorio.

---

# UC-002 Subir Candidatos

## Descripción

Permite cargar uno o varios CV asociados a una vacante.

## Funcionalidades

* Subida múltiple.
* PDF.
* Asociación automática a la vacante.

## Estado inicial

Pendiente de evaluación.

---

# UC-003 Recibir postulacion

## Descripción

Permite recibir el CV de un candidato y asociarlo a una vacante.

## Funcionalidades

* Subida de cv.
* PDF.
* Asociación automática a la vacante.

## Estado inicial

Pendiente de evaluación.

---

# UC-004 Evaluación Automática mediante IA

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

# UC-005 Generación de Shortlist de Candidatos

## Descripción

Una vez evaluados todos los candidatos, el sistema genera automáticamente una **Shortlist** con los perfiles recomendados.

El objetivo es que RRHH pueda identificar rápidamente los candidatos que cumplen con los requisitos del puesto.

---

## Criterios de Matching

El matching compara la información del CV con los requisitos de la vacante en tres dimensiones:

### A) Skills Match

Comparación entre:

* `requiredSkills[]`
* Habilidades detectadas en el CV.

### Reglas

* Falta de una habilidad obligatoria → penalización fuerte.
* Coincidencia → suma.
* Habilidades adicionales → suma ligera.

---

### B) Experience Match

Comparación entre:

* `experienceMin`
* Años de experiencia detectados en el CV.

### Reglas

* Experiencia < mínima → penalización.
* Experiencia ≥ mínima → suma proporcional.
* Experiencia muy superior → suma moderada.

---

### C) Semantic Match

Comparación entre:

* `description` + `responsibilities[]`
* Experiencia laboral del CV.

### Reglas

* Tareas similares → suma.
* Tareas distintas → penalización.
* Roles relacionados → suma moderada.

### Regla

> El matching debe considerar habilidades, experiencia y similitud semántica. Ninguna dimensión por sí sola determina el ajuste.

---

# Estructura del Scoring

El scoring es un valor numérico entre 0 y 100 que representa el ajuste del candidato.

## A) Ponderaciones por defecto

| Criterio        | Peso |
| --------------- | ---- |
| Experiencia     | 30%  |
| Hard Skills     | 35%  |
| Soft Skills     | 10%  |
| Formación       | 10%  |
| Idiomas         | 10%  |
| Certificaciones | 5%   |

### Regla

> La puntuación final será configurable por vacante.
> Si el reclutador no define pesos personalizados, se utilizarán los valores por defecto.

## B) Fórmula

```text
score =
(experienceScore     * 0.30) +
(hardSkillsScore     * 0.35) +
(softSkillsScore     * 0.10) +
(educationScore      * 0.10) +
(languagesScore      * 0.10) +
(certificationsScore * 0.05)
```

---

## C) Rangos de Interpretación

| Score  | Interpretación      |
| ------ | ------------------- |
| 90–100 | Excelente candidato |
| 75–89  | Muy buen candidato  |
| 60–74  | Aceptable           |
| <60    | No recomendado      |

---

## D) Reglas adicionales del Scoring

* Si falta una **hard skill obligatoria**, el score máximo permitido es **60**.
* Si la experiencia del candidato es **menor a la mínima requerida**, el score máximo permitido es **50**.
* Si el candidato no cumple con un **idioma obligatorio**, el score máximo permitido es **65**.
* Si el candidato no cumple con una **certificación obligatoria**, el score máximo permitido es **70**.
* Si `semanticScore < 0.4`, el score máximo permitido es **70**.

---

## E) Transparencia del Scoring

Cada candidato debe incluir un desglose detallado:

* `experienceScore`
* `hardSkillsScore`
* `softSkillsScore`
* `educationScore`
* `languagesScore`
* `certificationsScore`
* `penalizacionAplicada`


### Regla

> El sistema debe ser capaz de explicar cada decisión del scoring de forma clara y auditable.

---

# Umbral de Recomendación

Solo serán considerados candidatos recomendados aquellos cuya puntuación sea igual o superior al umbral configurado para la vacante.

Por defecto:

**70 puntos sobre 100**

---

# Selección Automática

* Los candidatos con scoring **≥ 75** entran automáticamente en la Shortlist.
* Si existen únicamente 2 candidatos válidos, se mostrarán esos 2.
* Si existe únicamente 1 candidato válido, se mostrará ese candidato.
* Si ningún candidato alcanza el mínimo necesario para entrar en la Shortlist, la IA indicará que no existen candidatos recomendados para la vacante.

## Orden

Mayor puntuación → Menor puntuación.

---

# UC-006 Visualizar Evaluación

Al seleccionar un candidato se mostrará un informe completo.

## Información General

* Nombre.
* Score.
* Compatibilidad.
* Estado.

---

## Resumen Profesional

Descripción generada automáticamente por la IA.

---

## Puntuación

Ejemplo:

**90/100**

### Compatibilidad

| Score  | Nivel                   |
| ------ | ----------------------- |
| 90–100 | ⭐⭐⭐⭐⭐ Excelente         |
| 75–89  | ⭐⭐⭐⭐ Muy buen candidato |
| 60–74  | ⭐⭐⭐ Aceptable           |
| <60    | No recomendado          |

---

## Puntos Fuertes

Ejemplo:

* Más de 8 años de experiencia.
* Amplio dominio de React.
* Experiencia en liderazgo técnico.
* Inglés C1.
* Experiencia con AWS.
* Certificaciones relevantes.

---

## Aspectos a Mejorar

Ejemplo:

* No posee experiencia con Kubernetes.
* Escasa experiencia en arquitectura de microservicios.

---

## Comparativa con la Vacante

| Requisito  | Resultado |
| ---------- | --------- |
| React      | ✅         |
| NodeJS     | ✅         |
| Docker     | ✅         |
| AWS        | ✅         |
| Kubernetes | ❌         |
| Inglés     | ✅         |

---

## Justificación de la IA

El agente generará una explicación similar a:

> El candidato presenta una alta compatibilidad con el puesto debido a que cumple todos los requisitos obligatorios y la mayoría de los deseables. Destaca especialmente su experiencia en React, Node.js y AWS, además de contar con experiencia liderando equipos. La única carencia identificada es la falta de experiencia demostrable en Kubernetes, aunque este aspecto no afecta significativamente a la puntuación final.

---

# Pantallas

## Dashboard

### Indicadores principales

* Vacantes activas.
* Candidatos evaluados.
* Evaluaciones pendientes.
* Shortlists generadas.
* Entrevistas programadas.

---

# Gestión de Vacantes

Listado de vacantes.

## Acciones

* Crear.
* Editar.
* Eliminar.
* Ver candidatos.

## Estados de una Vacante

### 1) Activa

* Recibe CVs.
* Permite análisis.
* Permite evaluación.

#### Regla

* Solo las vacantes activas pueden recibir candidatos.

---

### 2) En evaluación

* No recibe CVs.
* Se genera el ranking.
* Se prepara la Shortlist.

#### Regla

* Se bloquea la edición de campos críticos.

---

### 3) Cerrada

* No recibe CVs.
* No permite evaluación.
* Solo permite ver reportes.

#### Regla

* Una vacante cerrada no puede volver a activa; solo puede duplicarse.

---

# Formulario de Vacante

Formulario para definir:

* Información general.
* Requisitos.
* Skills.
* Pesos de evaluación.
* Umbral de recomendación.

---

# Gestión de Candidatos

Listado de CV asociados a la vacante.

## Acciones

* Subir CV.
* Eliminar.
* Ver evaluación.
* Reprocesar CV.

---

# Shortlist IA (Vista Principal)

Esta será la pantalla principal para RRHH.

Mostrará únicamente los candidatos que hayan alcanzado el criterio definido para entrar en la Shortlist.


## Cada tarjeta mostrará

* Nombre.
* Score.
* Compatibilidad.
* Años de experiencia.
* Hard Skills principales.
* Soft Skills destacadas.
* Idiomas.
* Resumen profesional.
* Botón "Ver evaluación".

Además, incluirá un indicador visual según el nivel de recomendación.

| Score  | Estado             |
| ------ | ------------------ |
| 90–100 | ⭐ Recomendado      |
| 75–89  | ✅ Muy recomendable |
| 70–74  | ✔️ Apto            |
| <70    | ❌ No recomendado   |

Al final aparecerá un mensaje generado por IA.

### Ejemplo

> La IA recomienda estos candidatos por presentar la mayor compatibilidad con los requisitos definidos para esta vacante.

También existirá un botón:

**Ver todos los candidatos**

para permitir auditorías o revisión manual.

---

# Arquitectura

```text
                    Frontend (React. JS)

                           │

                           ▼

                 API Python / Backend

                           │

                           ▼

                       PostgreSQL

                           │

                           ▼

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

* `id`
* `title`
* `description`
* `responsibilities`
* `requirements`
* `hard_skills`
* `soft_skills`
* `experience_minima`
* `idiomas`
* `formacion`
* `peso_experiencia`
* `peso_hard_skills`
* `peso_soft_skills`
* `peso_formacion`
* `peso_idiomas`
* `peso_certificaciones`
* `umbral_recomendacion`
* `estado`
* `fecha_creacion`

---

## Candidato

* `id`
* `vacante_id`
* `nombre`
* `email`
* `telefono`
* `cv_url`
* `fecha_subida`

---

## Evaluación

* `id`
* `candidato_id`
* `score`
* `compatibilidad`
* `fortalezas`
* `debilidades`
* `resumen`
* `explicacion_ia`
* `recomendado`
* `embedding_candidato`
* `fecha`

---

# Requisitos No Funcionales

* Interfaz responsive.
* Procesamiento paralelo de múltiples CV.
* Evaluaciones auditables y justificables.
* Escalabilidad para miles de candidatos.
* Seguridad y protección de datos personales.
* Trazabilidad de todas las decisiones del agente de IA.
* Configuración flexible de pesos y umbral por vacante.

---

# Roadmap

## Fase 1 (MVP)

* Gestión de vacantes.
* Subida de CV.
* Evaluación automática.
* Shortlist automática.
* Informe individual.

---

## Fase 2

* Comparación entre candidatos.
* Exportación de informes PDF y Excel.
* Historial de evaluaciones.
* Filtros avanzados.
* Búsqueda inteligente.

---

## Fase 3

* Integración con LinkedIn y portales de empleo.
* Integración con ATS externos.
* Chat con el agente de IA para consultar candidatos.
* Generación automática de preguntas para entrevistas.
* Aprendizaje basado en decisiones de RRHH (feedback loop).
* Dashboard analítico con métricas de contratación.

---

# Visión del Producto

El sistema actuará como un **Recruitment AI Assistant**, capaz de analizar decenas o cientos de candidatos en pocos minutos y presentar los perfiles con mayor compatibilidad para una vacante específica.

La decisión final siempre recaerá en el equipo de Recursos Humanos, mientras que la IA proporcionará una evaluación objetiva, explicable y configurable, optimizando el proceso de selección y mejorando la calidad de las contrataciones.
