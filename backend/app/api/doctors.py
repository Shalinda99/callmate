from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from pydantic import BaseModel
from datetime import time

from app.core.database import get_db
from app.models.doctor import Doctor

router = APIRouter(prefix="/api/doctors", tags=["Doctors"])

class DoctorResponse(BaseModel):
    id: int
    name: str
    specialty: str
    working_days: str
    working_hours_start: time
    working_hours_end: time

    class Config:
        orm_mode = True

@router.get("/", response_model=List[DoctorResponse])
def get_doctors(db: Session = Depends(get_db)):
    return db.query(Doctor).all()
