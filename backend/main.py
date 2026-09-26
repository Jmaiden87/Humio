import os

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.routes.cvs import router as cvs_router
from backend.routes.evaluations import router as evaluations_router
from backend.routes.shortlist import router as shortlist_router
from backend.routes.vacancies import router as vacancies_router

load_dotenv()

app = FastAPI(title="Humio Vacancy API", version="1.0.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv(
        "CORS_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173"
    ).split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(vacancies_router, prefix="/api")
app.include_router(cvs_router, prefix="/api")
app.include_router(evaluations_router, prefix="/api")
app.include_router(shortlist_router, prefix="/api")
