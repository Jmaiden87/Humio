from datetime import datetime, timezone

from fastapi.testclient import TestClient

from backend.main import app
from backend.routes.cvs import get_cv_service
from backend.routes.evaluations import get_evaluation_service
from backend.routes.shortlist import get_shortlist_service


class FakeMvpService:
    def __init__(self):
        self.evaluations = [
            {
                "id": 1,
                "cv_id": 1,
                "vacancy_id": 2,
                "candidate_name": "Alex Candidate",
                "score": 92,
                "summary": "Strong frontend experience",
                "matched_skills": ["React"],
                "missing_required_skills": [],
                "recommendation": "shortlist",
                "evaluated_at": datetime.now(timezone.utc),
            }
        ]

    def upload_cv(self, filename, content_type, content):
        return {
            "id": 1,
            "filename": filename,
            "status": "uploaded",
            "created_at": datetime.now(timezone.utc),
        }

    def process_cv(self, cv_id, vacancy_id):
        return self.evaluations[0]

    def list_evaluations(self, cv_id=None, vacancy_id=None):
        return self.evaluations

    def get_for_vacancy(self, vacancy_id, limit):
        return self.evaluations[:limit]


def test_upload_process_evaluations_and_shortlist():
    service = FakeMvpService()
    app.dependency_overrides[get_cv_service] = lambda: service
    app.dependency_overrides[get_evaluation_service] = lambda: service
    app.dependency_overrides[get_shortlist_service] = lambda: service
    client = TestClient(app)

    try:
        uploaded = client.post(
            "/api/cvs",
            files={"file": ("resume.pdf", b"%PDF-1.4 resume", "application/pdf")},
        )
        assert uploaded.status_code == 201
        assert uploaded.json()["status"] == "uploaded"

        processed = client.post("/api/cvs/1/process", json={"vacancy_id": 2})
        assert processed.status_code == 200
        assert processed.json()["score"] == 92

        evaluations = client.get("/api/evaluations", params={"vacancy_id": 2})
        assert evaluations.status_code == 200
        assert evaluations.json()[0]["candidate_name"] == "Alex Candidate"

        shortlist = client.get("/api/shortlist", params={"vacancy_id": 2})
        assert shortlist.status_code == 200
        assert shortlist.json()[0]["recommendation"] == "shortlist"
    finally:
        app.dependency_overrides.clear()


def test_upload_rejects_non_pdf():
    service = FakeMvpService()
    app.dependency_overrides[get_cv_service] = lambda: service
    client = TestClient(app)
    try:
        response = client.post(
            "/api/cvs",
            files={"file": ("resume.txt", b"resume", "text/plain")},
        )
        assert response.status_code == 415
    finally:
        app.dependency_overrides.clear()
