# FastAPI backend

## Local setup

From the repository root, create a virtual environment and install the backend dependencies:

```powershell
py -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r backend\requirements.txt
Copy-Item .env.example .env
# Set OPENAI_API_KEY in .env before processing uploaded CVs.
pnpm db:up
pnpm backend:dev
```

The API is available at `http://localhost:8000`; interactive API docs are at
`http://localhost:8000/docs`.

Run the backend tests with:

```powershell
pnpm backend:test
```

The endpoints are:

- `POST /api/vacancies` and `GET /api/vacancies`
- `POST /api/cvs` (PDF upload, maximum 20 MB)
- `POST /api/cvs/{cv_id}/process` with `{"vacancy_id": 1}`
- `GET /api/evaluations` (optional `cv_id` and `vacancy_id` filters)
- `GET /api/shortlist?vacancy_id=1&limit=10`

CV PDFs are stored in PostgreSQL and sent to OpenAI Responses API only when
processing is requested. Configure `OPENAI_API_KEY` and optionally `OPENAI_MODEL`.
The shortlist includes evaluations for the selected vacancy whose AI
recommendation is `shortlist`, ordered by score.

The SQL files in `backend/sql` run automatically only when PostgreSQL initializes
an empty data volume. For an existing database, apply `003_create_cv_evaluations.sql`
with `psql` before using CV, evaluation, or shortlist endpoints.
