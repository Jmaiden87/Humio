CREATE TABLE IF NOT EXISTS cv_documents (
  id BIGSERIAL PRIMARY KEY,
  filename VARCHAR(255) NOT NULL,
  content_type VARCHAR(100) NOT NULL,
  content BYTEA NOT NULL,
  status VARCHAR(32) NOT NULL DEFAULT 'uploaded'
    CHECK (status IN ('uploaded', 'processing', 'processed', 'failed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS evaluations (
  id BIGSERIAL PRIMARY KEY,
  cv_id BIGINT NOT NULL REFERENCES cv_documents(id) ON DELETE CASCADE,
  vacancy_id BIGINT NOT NULL REFERENCES vacancies(id) ON DELETE CASCADE,
  candidate_name TEXT NOT NULL,
  score INTEGER NOT NULL CHECK (score BETWEEN 0 AND 100),
  summary TEXT NOT NULL,
  matched_skills TEXT[] NOT NULL,
  missing_required_skills TEXT[] NOT NULL,
  recommendation VARCHAR(16) NOT NULL
    CHECK (recommendation IN ('shortlist', 'review', 'reject')),
  evaluated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT evaluations_cv_vacancy_unique UNIQUE (cv_id, vacancy_id)
);

CREATE INDEX IF NOT EXISTS evaluations_vacancy_score_idx
  ON evaluations (vacancy_id, score DESC);
