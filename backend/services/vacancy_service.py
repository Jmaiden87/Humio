from backend.models.vacancy import Vacancy
from backend.repositories.vacancy_repository import VacancyRepository
from backend.schemas.vacancy import VacancyCreate


class VacancyService:
    def __init__(self, repository: VacancyRepository):
        self.repository = repository

    def create(self, data: VacancyCreate) -> Vacancy:
        return self.repository.create(data)

    def list_all(self) -> list[Vacancy]:
        return self.repository.list_all()
