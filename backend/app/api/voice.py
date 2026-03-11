from fastapi import APIRouter, HTTPException, BackgroundTasks
from pydantic import BaseModel
from typing import Dict, Any
import uuid

from app.services.voice_assistant import CallAssistant
from app.services.redis_store import store

router = APIRouter(prefix="/api/voice", tags=["Voice"])

class CallStatusResponse(BaseModel):
    call_id: str
    status: str
    state: Dict[str, Any]

@router.post("/start_local", response_model=CallStatusResponse)
async def start_local_call(background_tasks: BackgroundTasks):
    """
    Simulates starting a local Pipecat session. 
    (In real life, this triggers the Twilio media stream or local PyAudio).
    """
    call_id = f"local-{str(uuid.uuid4())[:8]}"
    assistant = CallAssistant(call_id=call_id)
    state = assistant.initialize_session()
    
    # Ideally, we would start the pipecat pipeline here in background, 
    # but PyAudio requires main thread usually or specific handling.
    # For now, we mock the start.
    
    return {"call_id": call_id, "status": "started", "state": state}

@router.get("/status/{call_id}", response_model=CallStatusResponse)
def get_call_status(call_id: str):
    """Fetch current state of a call."""
    state = store.get_session(call_id)
    if not state:
        raise HTTPException(status_code=404, detail="Call session not found")
    
    return {"call_id": call_id, "status": state.get("status", "unknown"), "state": state}
