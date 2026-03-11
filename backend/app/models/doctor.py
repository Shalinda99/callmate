from sqlalchemy import Column, Integer, String, Text, ARRAY, Time
from .base import Base

class Doctor(Base):
    __tablename__ = "doctors"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), index=True)
    specialty = Column(String(255))
    
    # comma separated string or ARRAY for simplicity
    working_days = Column(String(255), default="Monday,Tuesday,Wednesday,Thursday,Friday") 
    working_hours_start = Column(Time)
    working_hours_end = Column(Time)
