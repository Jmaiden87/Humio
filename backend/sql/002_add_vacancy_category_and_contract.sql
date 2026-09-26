ALTER TABLE vacancies
  ADD COLUMN IF NOT EXISTS category TEXT NOT NULL DEFAULT 'junior',
  ADD COLUMN IF NOT EXISTS contract_type TEXT NOT NULL DEFAULT 'full-time';

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'vacancies_category_check') THEN
    ALTER TABLE vacancies
      ADD CONSTRAINT vacancies_category_check
      CHECK (category IN ('junior', 'semi-senior', 'senior'));
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'vacancies_contract_type_check') THEN
    ALTER TABLE vacancies
      ADD CONSTRAINT vacancies_contract_type_check
      CHECK (contract_type IN ('full-time', 'part-time'));
  END IF;
END
$$;
