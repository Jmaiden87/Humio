from sqlalchemy import select
from sqlalchemy.orm import Session

from backend.models.cv_document import CVDocument


class CVRepository:
    def __init__(self, session: Session):
        self.session = session

    def create(self, filename: str, content_type: str, content: bytes) -> CVDocument:
        document = CVDocument(
            filename=filename,
            content_type=content_type,
            content=content,
            status="uploaded",
        )
        self.session.add(document)
        self.session.commit()
        self.session.refresh(document)
        return document

    def get(self, cv_id: int) -> CVDocument | None:
        return self.session.get(CVDocument, cv_id)

    def set_status(self, document: CVDocument, status: str) -> None:
        document.status = status
        self.session.commit()
