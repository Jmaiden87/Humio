from datetime import datetime

from pydantic import BaseModel, ConfigDict


class CVUploadRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    filename: str
    status: str
    created_at: datetime


class ProcessCVRequest(BaseModel):
    vacancy_id: int


class EvaluationRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    cv_id: int
    vacancy_id: int
    candidate_name: str
    score: int
    summary: str
    matched_skills: list[str]
    missing_required_skills: list[str]
    recommendation: str
    evaluated_at: datetime
