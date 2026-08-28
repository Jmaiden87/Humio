# Sistema Inteligente de Selección de Personal - LLM Instructions

## Stack

React + TypeScript + Vite + Tailwind CSS v4 + Vitest + Playwright

## TDD - MANDATORY

1. Write test FIRST → run → MUST FAIL
2. Implement MINIMUM code to pass
3. Refactor keeping tests green

## File Organization (Scope Rule)

- `src/shared/` → used by multiple features
- `src/features/X/` → specific to one feature

## Project Structure

```
src/
├── app/
├── shared/
│   ├── components/
│   ├── types/
│   ├── utils/
│   ├── hooks/
│   ├── constants/
│   ├── validators/
│   ├── services/
│   ├── lib/
│   │   ├── ai/
│   │   ├── api/
│   │   ├── auth/
│   │   └── database/
│   └── styles/
│
├── features/
│   ├── dashboard/
│   ├── vacancies/
│   ├── candidates/
│   ├── evaluation/
│   ├── shortlist/
│   ├── reports/
│   ├── settings/
│   └── auth/
│
├── context/                  # AuthContext, ThemeContext
│
├── infrastructure/           # logger.ts, monitoring.ts, env.ts
│
├── middleware.ts
│
└── test/
    ├── setup.ts
    ├── mocks/
    └── utils/

e2e/
├── pages/
│   ├── DashboardPage.ts
│   ├── VacancyPage.ts
│   ├── CandidatePage.ts
│   ├── ShortlistPage.ts
│   └── LoginPage.ts
│
├── auth.spec.ts
├── vacancies.spec.ts
├── candidates.spec.ts
├── evaluation.spec.ts
├── shortlist.spec.ts
└── dashboard.spec.ts

docs/
├── DESIGN.md
├── UI_DESIGN.md
├── AI_AGENT.md
├── API.md
└── DATABASE.md

public/
├── images/
├── icons/
└── favicon.ico

.husky/
├── pre-commit
└── pre-push
```

## Critical Configurations

### tsconfig.app.json

```json
{ "exclude": ["src/**/*.test.ts", "src/**/*.test.tsx", "src/test/**"] }
```

### react-refresh: Split Context into 3 files


NEVER use `allowExportNames` workaround.

### Husky: git init BEFORE husky init

## Scripts

- `pnpm test:run` - unit tests
- `pnpm test:e2e` - playwright
- `pnpm quality` - lint + typecheck + test:run
- `pnpm verify` - quality + test:e2e + build


## Expected Test Counts

- Unit/Integration: necesarios
- E2E: 1 por cada feture

## Validation

`pnpm verify` must pass: 0 lint errors, 0 type errors, all tests green, build success.