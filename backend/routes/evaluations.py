from collections.abc import Generator

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from backend.database import SessionLocal
from backend.repositories.evaluation_repository import EvaluationRepository
from backend.schemas.cv import EvaluationRead
from backend.services.evaluation_service import EvaluationService

router = APIRouter(prefix="/evaluations", tags=["evaluations"])


def get_db() -> Generator[Session, None, None]:
    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()


def get_evaluation_service(
    session: Session = Depends(get_db),
) -> EvaluationService:
    return EvaluationService(EvaluationRepository(session))


@router.get("", response_model=list[EvaluationRead])
def get_evaluations(
    cv_id: int | None = Query(default=None, gt=0),
    vacancy_id: int | None = Query(default=None, gt=0),
    service: EvaluationService = Depends(get_evaluation_service),
) -> list[EvaluationRead]:
    return service.list_all(cv_id=cv_id, vacancy_id=vacancy_id)
