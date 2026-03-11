from sqlalchemy import Column, Integer, String, DateTime, Text
from sqlalchemy.sql import func
from .base import Base

class CallSessionLog(Base):
    __tablename__ = "call_sessions"
    
    call_id = Column(String(100), primary_key=True, index=True)
    
    start_time = Column(DateTime(timezone=True), server_default=func.now())
    end_time = Column(DateTime(timezone=True), nullable=True)
    
    conversation_summary = Column(Text, nullable=True)
    booking_outcome = Column(String(50), nullable=True)  # success, failed, inquiry
