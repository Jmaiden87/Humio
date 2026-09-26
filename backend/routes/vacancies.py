from collections.abc import Generator

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from backend.database import SessionLocal
from backend.repositories.vacancy_repository import VacancyRepository
from backend.schemas.vacancy import VacancyCreate, VacancyRead
from backend.services.vacancy_service import VacancyService

router = APIRouter(prefix="/vacancies", tags=["vacancies"])


def get_db() -> Generator[Session, None, None]:
    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()


def get_vacancy_service(
    session: Session = Depends(get_db),
) -> VacancyService:
    return VacancyService(VacancyRepository(session))


@router.post("", response_model=VacancyRead, status_code=201)
def create_vacancy(
    data: VacancyCreate,
    service: VacancyService = Depends(get_vacancy_service),
) -> VacancyRead:
    return service.create(data)


@router.get("", response_model=list[VacancyRead])
def list_vacancies(
    service: VacancyService = Depends(get_vacancy_service),
) -> list[VacancyRead]:
    return service.list_all()
