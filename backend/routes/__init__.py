from backend.routes.vacancies import router
from backend.routes.cvs import router as cvs_router
from backend.routes.evaluations import router as evaluations_router
from backend.routes.shortlist import router as shortlist_router

__all__ = ["router", "cvs_router", "evaluations_router", "shortlist_router"]
