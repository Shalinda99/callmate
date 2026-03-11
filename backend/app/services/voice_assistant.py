import json
import asyncio
from typing import Dict, Any, Optional

from loguru import logger
from app.services.redis_store import store

# Pipecat imports
from pipecat.pipeline.pipeline import Pipeline
from pipecat.pipeline.task import PipelineParams, PipelineTask
from pipecat.services.openai import OpenAILLMService, OpenAILLMContext
from pipecat.audio.vad.silero import SileroVADAnalyzer

from app.core.config import settings

class CallAssistant:
    def __init__(self, call_id: str):
        self.call_id = call_id
        
        # System prompt setting up the receptionist persona
        self.system_prompt = (
            "You are an AI receptionist for ABC Clinic. "
            "Your job is to greet patients, extract their intent (book, reschedule, cancel, or inquire), "
            "and collect booking details: Patient Name, Phone Number, Doctor Name/Specialty, Date, and Time. "
            "Always be concise, polite, and professional. Ask one question at a time. "
            "If they want to book, ask for any missing details."
        )

    def initialize_session(self):
        initial_state = {
            "intent": None,
            "patient_name": None,
            "phone_number": None,
            "doctor": None,
            "date": None,
            "time": None,
            "booking_confirmed": False,
            "status": "in_progress"
        }
        store.save_session(self.call_id, initial_state)
        return initial_state
        
    def get_llm_service(self):
        """Configure OpenAI LLM with function calling for structured extraction."""
        llm = OpenAILLMService(
            api_key=settings.OPENAI_API_KEY,
            model="gpt-4o-mini"
        )
        # Function to register state updates during the talk
        @llm.function("update_booking_state", "Updates the current collected information for the appointment.")
        async def update_booking_state(
            intent: str, 
            patient_name: str = "", 
            phone_number: str = "", 
            doctor: str = "", 
            date: str = "", 
            time: str = ""
        ):
            updates = {k: v for k, v in locals().items() if v}
            store.update_session(self.call_id, updates)
            logger.info(f"State Updated: {updates}")
            return f"State updated successfully. Missing fields are now re-evaluated."

        return llm

    async def run_local(self):
        """Run the assistant in local mode with mock I/O or terminal I/O (later)."""
        pass
