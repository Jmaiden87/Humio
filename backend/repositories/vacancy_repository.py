from sqlalchemy import select
from sqlalchemy.orm import Session

from backend.models.vacancy import Vacancy
from backend.schemas.vacancy import VacancyCreate


class VacancyRepository:
    def __init__(self, session: Session):
        self.session = session

    def create(self, data: VacancyCreate) -> Vacancy:
        vacancy = Vacancy(**data.model_dump(by_alias=False))
        self.session.add(vacancy)
        self.session.commit()
        self.session.refresh(vacancy)
        return vacancy

    def list_all(self) -> list[Vacancy]:
        return list(
            self.session.scalars(
                select(Vacancy).order_by(Vacancy.created_at.desc(), Vacancy.id.desc())
            )

    def get(self, vacancy_id: int) -> Vacancy | None:
            return self.session.get(Vacancy, vacancy_id)
        )
