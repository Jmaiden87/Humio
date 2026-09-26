from datetime import datetime

from sqlalchemy import (
    ARRAY,
    BigInteger,
    DateTime,
    ForeignKey,
    Integer,
    Text,
    UniqueConstraint,
    func,
)
from sqlalchemy.orm import Mapped, mapped_column

from backend.database import Base


class Evaluation(Base):
    __tablename__ = "evaluations"
    __table_args__ = (UniqueConstraint("cv_id", "vacancy_id"),)

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, index=True)
    cv_id: Mapped[int] = mapped_column(
        BigInteger, ForeignKey("cv_documents.id", ondelete="CASCADE"), nullable=False
    )
    vacancy_id: Mapped[int] = mapped_column(
        BigInteger, ForeignKey("vacancies.id", ondelete="CASCADE"), nullable=False
    )
    candidate_name: Mapped[str] = mapped_column(Text, nullable=False)
    score: Mapped[int] = mapped_column(Integer, nullable=False)
    summary: Mapped[str] = mapped_column(Text, nullable=False)
    matched_skills: Mapped[list[str]] = mapped_column(ARRAY(Text), nullable=False)
    missing_required_skills: Mapped[list[str]] = mapped_column(ARRAY(Text), nullable=False)
    recommendation: Mapped[str] = mapped_column(String(32), nullable=False)
    evaluated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), nullable=False, server_default=func.now()
    )
