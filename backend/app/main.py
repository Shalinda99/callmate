from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from loguru import logger

app = FastAPI(title="CallMate API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from app.api import voice

@app.get("/")
def read_root():
    return {"status": "ok", "app": "CallMate"}

app.include_router(voice.router)
from app.api import doctors, appointments
app.include_router(doctors.router)
app.include_router(appointments.router)

@app.on_event("startup")
def startup_event():
    logger.info("Starting CallMate API")
