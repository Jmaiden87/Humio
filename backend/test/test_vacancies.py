from datetime import datetime, timezone

from fastapi.testclient import TestClient

from backend.main import app
from backend.routes.vacancies import get_vacancy_service


class FakeVacancyService:
    def __init__(self):
        self.items = []

    def create(self, vacancy):
        saved = {
            "id": len(self.items) + 1,
            **vacancy.model_dump(),
            "created_at": datetime.now(timezone.utc),
        }
        self.items.append(saved)
        return saved

    def list_all(self):
        return self.items


def test_post_and_get_vacancies():
    service = FakeVacancyService()
    app.dependency_overrides[get_vacancy_service] = lambda: service
    client = TestClient(app)
    payload = {
        "title": "Frontend Developer",
        "description": "Build accessible interfaces",
        "requirements": "Computer Science degree",
        "requiredSkills": ["React", "TypeScript"],
        "optionalSkills": ["Playwright"],
        "experience_level": 2,
        "department": "Technology",
        "modality": "hibrido",
        "location": "Madrid",
        "category": "semi-senior",
        "contractType": "full-time",
    }

    try:
        created = client.post("/api/vacancies", json=payload)
        assert created.status_code == 201
        assert created.json()["requiredSkills"] == ["React", "TypeScript"]
        assert created.json()["optionalSkills"] == ["Playwright"]

        catalog = client.get("/api/vacancies")
        assert catalog.status_code == 200
        assert len(catalog.json()) == 1
        assert catalog.json()[0]["title"] == payload["title"]
    finally:
        app.dependency_overrides.clear()


def test_post_rejects_invalid_category():
    app.dependency_overrides[get_vacancy_service] = lambda: FakeVacancyService()
    client = TestClient(app)

    response = client.post(
        "/api/vacancies",
        json={
            "title": "Developer",
            "description": "Description",
            "requirements": "Requirements",
            "requiredSkills": ["Python"],
            "optionalSkills": [],
            "experience_level": 1,
            "department": "Technology",
            "modality": "remoto",
            "location": "Madrid",
            "category": "lead",
            "contractType": "full-time",
        },
    )

    app.dependency_overrides.clear()
    assert response.status_code == 422
