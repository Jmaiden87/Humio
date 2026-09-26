from sqlalchemy import select
from sqlalchemy.orm import Session

from backend.models.evaluation import Evaluation


class EvaluationRepository:
    def __init__(self, session: Session):
        self.session = session

    def create_or_update(self, cv_id: int, vacancy_id: int, result: dict) -> Evaluation:
        evaluation = self.session.scalar(
            select(Evaluation).where(
                Evaluation.cv_id == cv_id,
                Evaluation.vacancy_id == vacancy_id,
            )
        )
        if evaluation is None:
            evaluation = Evaluation(cv_id=cv_id, vacancy_id=vacancy_id, **result)
            self.session.add(evaluation)
        else:
            for key, value in result.items():
                setattr(evaluation, key, value)
        self.session.commit()
        self.session.refresh(evaluation)
        return evaluation

    def list_all(
        self, cv_id: int | None = None, vacancy_id: int | None = None
    ) -> list[Evaluation]:
        query = select(Evaluation)
        if cv_id is not None:
            query = query.where(Evaluation.cv_id == cv_id)
        if vacancy_id is not None:
            query = query.where(Evaluation.vacancy_id == vacancy_id)
        query = query.order_by(Evaluation.score.desc(), Evaluation.evaluated_at.desc())
        return list(self.session.scalars(query))

    def shortlist(self, vacancy_id: int, limit: int) -> list[Evaluation]:
        return list(
            self.session.scalars(
                select(Evaluation)
                .where(
                    Evaluation.vacancy_id == vacancy_id,
                    Evaluation.recommendation == "shortlist",
                )
                .order_by(Evaluation.score.desc(), Evaluation.evaluated_at.desc())
                .limit(limit)
            )
        )
