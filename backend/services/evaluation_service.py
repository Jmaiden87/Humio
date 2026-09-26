from backend.repositories.evaluation_repository import EvaluationRepository


class EvaluationService:
    def __init__(self, repository: EvaluationRepository):
        self.repository = repository

    def list_all(
        self, cv_id: int | None = None, vacancy_id: int | None = None
    ):
        return self.repository.list_all(cv_id=cv_id, vacancy_id=vacancy_id)
