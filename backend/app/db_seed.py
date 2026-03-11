from app.core.database import SessionLocal
from app.models.doctor import Doctor
from datetime import time

def seed_db():
    db = SessionLocal()
    
    if db.query(Doctor).count() > 0:
        print("Database already seeded")
        db.close()
        return

    doctors = [
        Doctor(
            name="Dr. Sarah Perera",
            specialty="General Physician",
            working_days="Monday,Tuesday,Wednesday,Thursday,Friday",
            working_hours_start=time(9, 0),
            working_hours_end=time(17, 0)
        ),
        Doctor(
            name="Dr. James Fernando",
            specialty="Cardiologist",
            working_days="Monday,Wednesday,Friday",
            working_hours_start=time(10, 0),
            working_hours_end=time(15, 0)
        ),
        Doctor(
            name="Dr. Emily Silva",
            specialty="Pediatrician",
            working_days="Tuesday,Thursday,Saturday",
            working_hours_start=time(9, 0),
            working_hours_end=time(14, 0)
        )
    ]
    
    db.add_all(doctors)
    db.commit()
    print("Database seeded with mock doctors.")
    db.close()

if __name__ == "__main__":
    seed_db()
