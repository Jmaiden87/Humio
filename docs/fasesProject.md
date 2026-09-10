FASE 1 — Consolidación del Dominio y Requisitos Funcionales
Antes de escribir más código, define con precisión:

✔ Entidades principales
Vacante

Candidato

Evaluación

Shortlist

Reportes

✔ Flujo del reclutador
Crear vacante

Recibir CVs

Analizar CVs

Evaluar candidatos

Generar shortlist

Emitir reporte

✔ Reglas del negocio
Campos obligatorios de una vacante

Criterios de matching

Estructura del scoring

Estados de una vacante (activa, cerrada, en evaluación)

Salida de esta fase:  
Documento DESIGN.md actualizado con el flujo y entidades.

FASE 2 — Diseño de la Base de Datos (docs/DATABASE.md)
Define tablas y relaciones:

vacancies

candidates

candidate_scores

evaluations

shortlists

Incluye:

Tipos de datos

Índices

Relaciones

Validaciones

Salida:  
Esquema final de la BD + migraciones iniciales.

FASE 3 — Infraestructura y Servicios Base
Antes de seguir con UI:

✔ Configurar servicios en src/shared/lib/
api/ → cliente HTTP

database/ → adaptador (mock o real)

ai/ → wrapper para análisis de CVs

auth/ → login básico

✔ Configurar logger, env y monitoring
En src/infrastructure/.

✔ Configurar middleware global
En middleware.ts.

Salida:  
Infraestructura lista para soportar features.

FASE 4 — Feature Vacancies (CRUD completo)
Ya tienes las vistas, ahora toca completarlo con TDD.

4.1 Crear formulario de creación de vacantes
Orden recomendado con TDD:

Test del formulario vacío → debe fallar

Implementación mínima

Validaciones (tests primero)

Envío de datos al backend (mock)

Feedback visual (loading, success, error)

4.2 Listado de vacantes con datos reales
Test de fetch

Implementación mínima

Renderizado

Filtros y paginación (si aplica)

4.3 Edición y eliminación
Tests

Implementación mínima

Refactor

Salida:  
Feature Vacancies completamente funcional y testeada.

FASE 5 — Feature Candidates (Carga y Procesamiento de CVs)
Aquí empieza la parte “inteligente”.

5.1 Subida de CVs
Tests de carga

OCR básico

Extracción de texto

Normalización

5.2 Parsing de CVs
Tests de extracción de campos

Implementación mínima

Refactor

5.3 Asociación de candidatos a vacantes
Tests

Implementación mínima

Salida:  
Candidatos cargados y listos para análisis.

FASE 6 — Feature Evaluation (Matching + IA)
Esta es la parte estrella del proyecto.

6.1 Matching semántico
Tests del algoritmo de similitud

Implementación mínima

Ajustes de pesos y criterios

6.2 Scoring
Tests del cálculo

Implementación mínima

Refactor

6.3 Explicación del resultado
Tests

Implementación mínima

Salida:  
Evaluación automática funcionando.

FASE 7 — Feature Shortlist
Generación automática de la lista final.

7.1 Selección automática
Tests

Implementación mínima

7.2 Ajustes manuales
Tests

Implementación mínima

Salida:  
Shortlist funcional y editable.

FASE 8 — Feature Reports
Generación de informes para gerencia.

8.1 Reporte por vacante
Tests

Implementación mínima

8.2 Exportación (PDF opcional)
Tests

Implementación mínima

Salida:  
Reportes listos para presentación.

FASE 9 — Feature Dashboard
Resumen general del sistema.

Vacantes activas

Candidatos en proceso

Métricas de IA

Alertas

Salida:  
Dashboard funcional.

FASE 10 — E2E Tests (Playwright)
Recuerda:
1 test por feature

Login

Vacancies

Candidates

Evaluation

Shortlist

Dashboard

Salida:  
Suite E2E completa.

FASE 11 — Optimización, Refactor y Calidad Final
Ejecutar:

pnpm quality

pnpm verify

Debe pasar sin errores.