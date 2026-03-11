from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from datetime import date, time
from typing import List, Optional
import uuid

from app.core.database import get_db
from app.models.appointment import Appointment
from app.models.doctor import Doctor

router = APIRouter(prefix="/api/appointments", tags=["Appointments"])

class AvailabilityRequest(BaseModel):
    doctor_id: int
    date: date

class AvailabilityResponse(BaseModel):
    available_slots: List[str]

class BookingRequest(BaseModel):
    doctor_id: int
    patient_name: str
    phone_number: str
    date: date
    time: time

class BookingResponse(BaseModel):
    booking_id: str
    status: str

@router.post("/availability", response_model=AvailabilityResponse)
def check_availability(req: AvailabilityRequest, db: Session = Depends(get_db)):
    """Mock checking availability (returns all slots between 9am and 5pm minus existing appointments)."""
    # Simple POC mock logic:
    doctor = db.query(Doctor).filter(Doctor.id == req.doctor_id).first()
    if not doctor:
        raise HTTPException(status_code=404, detail="Doctor not found")
        
    booked = db.query(Appointment).filter(
        Appointment.doctor_id == req.doctor_id,
        Appointment.date == req.date,
        Appointment.status == "confirmed"
    ).all()
    
    booked_times = [app.time.strftime("%H:%M") for app in booked]
    
    # Generate mock slots (9am to 4pm hourly)
    all_slots = [time(h, 0).strftime("%H:%M") for h in range(9, 17)]
    available = [slot for slot in all_slots if slot not in booked_times]
    
    return {"available_slots": available}

@router.post("/book", response_model=BookingResponse)
def create_booking(req: BookingRequest, db: Session = Depends(get_db)):
    """Mock creating a booking in the database."""
    booking_id = f"BKG-{str(uuid.uuid4())[:6].upper()}"
    new_app = Appointment(
        booking_id=booking_id,
        patient_name=req.patient_name,
        phone_number=req.phone_number,
        doctor_id=req.doctor_id,
        date=req.date,
        time=req.time,
        status="confirmed"
    )
    db.add(new_app)
    db.commit()
    db.refresh(new_app)
    
    # Ideally trigger SMS here via a background task
    
    return {"booking_id": booking_id, "status": "confirmed"}
