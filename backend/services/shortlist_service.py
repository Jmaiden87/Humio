from backend.repositories.evaluation_repository import EvaluationRepository


class ShortlistService:
    def __init__(self, repository: EvaluationRepository):
        self.repository = repository

    def get_for_vacancy(self, vacancy_id: int, limit: int):
        return self.repository.shortlist(vacancy_id=vacancy_id, limit=limit)
