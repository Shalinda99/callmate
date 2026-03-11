from sqlalchemy import Column, Integer, String, Date, Time, ForeignKey, DateTime
from sqlalchemy.sql import func
from .base import Base

class Appointment(Base):
    __tablename__ = "appointments"
    
    id = Column(Integer, primary_key=True, index=True)
    booking_id = Column(String(100), unique=True, index=True)
    
    patient_name = Column(String(255))
    phone_number = Column(String(50))
    
    doctor_id = Column(Integer, ForeignKey("doctors.id"))
    
    date = Column(Date)
    time = Column(Time)
    
    status = Column(String(50), default="confirmed") # confirmed, cancelled
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
