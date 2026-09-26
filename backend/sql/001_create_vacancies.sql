CREATE TABLE vacancies (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  requirements TEXT NOT NULL,
  required_skills TEXT[] NOT NULL,
  optional_skills TEXT[] NOT NULL,
  experience_level INTEGER NOT NULL CHECK (experience_level >= 0),
  department TEXT NOT NULL,
  modality TEXT NOT NULL,
  location TEXT NOT NULL,
  category TEXT NOT NULL
    CONSTRAINT vacancies_category_check CHECK (category IN ('junior', 'semi-senior', 'senior')),
  contract_type TEXT NOT NULL
    CONSTRAINT vacancies_contract_type_check CHECK (contract_type IN ('full-time', 'part-time')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
