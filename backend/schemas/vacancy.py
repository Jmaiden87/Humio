from datetime import datetime
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field


class VacancyCreate(BaseModel):
    model_config = ConfigDict(populate_by_name=True, extra="forbid")

    title: str = Field(min_length=1, max_length=300)
    description: str = Field(min_length=1)
    requirements: str = Field(min_length=1)
    required_skills: list[str] = Field(alias="requiredSkills", min_length=1)
    optional_skills: list[str] = Field(alias="optionalSkills")
    experience_level: int = Field(ge=0)
    department: str = Field(min_length=1)
    modality: Literal["remoto", "presencial", "hibrido"]
    location: str = Field(min_length=1)
    category: Literal["junior", "semi-senior", "senior"]
    contract_type: Literal["full-time", "part-time"] = Field(alias="contractType")


class VacancyRead(BaseModel):
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)

    id: int
    title: str
    description: str
    requirements: str
    required_skills: list[str] = Field(serialization_alias="requiredSkills")
    optional_skills: list[str] = Field(serialization_alias="optionalSkills")
    experience_level: int
    department: str
    modality: str
    location: str
    category: str
    contract_type: str = Field(serialization_alias="contractType")
    created_at: datetime
