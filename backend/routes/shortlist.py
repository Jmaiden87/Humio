from collections.abc import Generator

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from backend.database import SessionLocal
from backend.repositories.evaluation_repository import EvaluationRepository
from backend.schemas.cv import EvaluationRead
from backend.services.shortlist_service import ShortlistService

router = APIRouter(prefix="/shortlist", tags=["shortlist"])


def get_db() -> Generator[Session, None, None]:
    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()


def get_shortlist_service(
    session: Session = Depends(get_db),
) -> ShortlistService:
    return ShortlistService(EvaluationRepository(session))


@router.get("", response_model=list[EvaluationRead])
def get_shortlist(
    vacancy_id: int = Query(gt=0),
    limit: int = Query(default=10, ge=1, le=100),
    service: ShortlistService = Depends(get_shortlist_service),
) -> list[EvaluationRead]:
    return service.get_for_vacancy(vacancy_id=vacancy_id, limit=limit)
