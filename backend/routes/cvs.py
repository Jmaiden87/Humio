from collections.abc import Generator
from pathlib import Path

from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, status
from sqlalchemy.orm import Session

from backend.database import SessionLocal
from backend.repositories.cv_repository import CVRepository
from backend.repositories.evaluation_repository import EvaluationRepository
from backend.repositories.vacancy_repository import VacancyRepository
from backend.schemas.cv import CVUploadRead, EvaluationRead, ProcessCVRequest
from backend.services.cv_service import (
    AIConfigurationError,
    CVNotFoundError,
    CVProcessingError,
    CVService,
    MAX_CV_BYTES,
    VacancyNotFoundError,
)

router = APIRouter(prefix="/cvs", tags=["cvs"])


def get_db() -> Generator[Session, None, None]:
    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()


def get_cv_service(session: Session = Depends(get_db)) -> CVService:
    return CVService(
        CVRepository(session),
        VacancyRepository(session),
        EvaluationRepository(session),
    )


@router.post("", response_model=CVUploadRead, status_code=status.HTTP_201_CREATED)
async def upload_cv(
    file: UploadFile = File(...),
    service: CVService = Depends(get_cv_service),
) -> CVUploadRead:
    filename = Path(file.filename or "").name
    if not filename.lower().endswith(".pdf") or file.content_type != "application/pdf":
        raise HTTPException(status_code=415, detail="Solo se aceptan archivos PDF")
    content = await file.read(MAX_CV_BYTES + 1)
    if len(content) > MAX_CV_BYTES:
        raise HTTPException(status_code=413, detail="El archivo supera el límite de 20 MB")
    try:
        return service.upload_cv(filename, file.content_type, content)
    except ValueError as error:
        raise HTTPException(status_code=400, detail=str(error)) from error
    finally:
        await file.close()


@router.post("/{cv_id}/process", response_model=EvaluationRead)
def process_cv(
    cv_id: int,
    request: ProcessCVRequest,
    service: CVService = Depends(get_cv_service),
) -> EvaluationRead:
    try:
        return service.process_cv(cv_id, request.vacancy_id)
    except CVNotFoundError as error:
        raise HTTPException(status_code=404, detail=str(error)) from error
    except VacancyNotFoundError as error:
        raise HTTPException(status_code=404, detail=str(error)) from error
    except AIConfigurationError as error:
        raise HTTPException(status_code=503, detail=str(error)) from error
    except CVProcessingError as error:
        raise HTTPException(status_code=502, detail=str(error)) from error
