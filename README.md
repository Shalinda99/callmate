# CallMate - AI Healthcare Phone Call Agent

CallMate is an AI-powered Proof-of-Concept (POC) phone call answering agent for healthcare clinics. It automatically handles incoming phone calls, interacts with patients using natural voice conversation to understand their intent (booking, rescheduling, cancellations, inquiries), collects necessary appointment details, checks doctor availability, creates bookings, and provides confirmation using Twilio SMS.

It features a robust backend pipeline orchestrating Speech-To-Text (STT), Large Language Models (LLM), and Text-To-Speech (TTS), coupled with a modern React admin dashboard to oversee operations.

---

## 🏗️ Architecture Stack

- **Backend:** Python, FastAPI, Pipecat AI (Voice pipeline orchestration), SQLAlchemy (ORM)
- **Database:** MySQL (relational records) & Redis (in-memory multi-turn conversational session state)
- **Frontend:** React, TypeScript, Vite, Tailwind CSS, Lucide React (Icons)
- **AI/LLM:** OpenAI (GPT-4o-mini structured extraction, Whisper STT, TTS)
- **Telephony:** Twilio Programmable Voice & SMS webhook integration

---

## 🚀 Getting Started

### Prerequisites
Ensure your machine has the following installed:
- Python 3.10+
- Node.js 18+ and npm
- Homebrew (for Mac users)
- MySQL Server
- Redis Server
- Valid API Keys for OpenAI and Twilio

### 1. Database & Session Setup (macOS via Homebrew)
Start your local database and caching layers:
```bash
brew install mysql redis
brew services start mysql
brew services start redis

# Create the MySQL database for CallMate
mysql -u root -e "CREATE DATABASE IF NOT EXISTS callmate;"
```

### 2. Backend Setup
Navigate to the backend directory, set up your Python environment, install dependencies, and run database migrations.

```bash
cd backend

# Create and activate virtual environment
python3 -m venv venv
source venv/bin/activate

# Install requirements
pip install fastapi uvicorn sqlalchemy alembic pymysql cryptography redis "pipecat-ai[silero,openai,twilio]" python-dotenv pydantic-settings loguru

# Configure Environment Variables
cp .env.example .env
# Open the .env file and fill in your OPENAI_API_KEY and TWILIO configurations

# Run Alembic DB Migrations and Seed Initial Data
alembic upgrade head
export PYTHONPATH=.
python app/db_seed.py
```

#### Running the Backend Web Server
From within the `backend/` directory with the virtual environment activated:
```bash
uvicorn app.main:app --reload --port 8000
```
- API Docs accessible at: `http://localhost:8000/docs`

### 3. Frontend Setup
Navigate to the frontend directory, install dependencies, and launch the development server.

```bash
cd frontend

# Install Node modules
npm install

# Run the Vite Dev Server
npm run dev
```
- The React admin dashboard will be running at: `http://localhost:5173`

---

## 📂 Project Structure

```text
callmate/
├── backend/
│   ├── alembic/              # Database migration scripts
│   ├── app/
│   │   ├── api/              # FastAPI Routers (voice, doctors, appointments)
│   │   ├── core/             # Configuration and Database setup
│   │   ├── models/           # SQLAlchemy DB models (MySQL)
│   │   └── services/         # Pipecat pipeline and Redis session stores
│   ├── .env                  # Secrets and API credentials
│   └── alembic.ini           # Alembic configs
│
└── frontend/
    ├── src/
    │   ├── components/       # Reusable React components (e.g., Sidebar)
    │   ├── pages/            # Core views (Dashboard, Doctors, Calls, Appointments)
    │   └── App.tsx           # React Router implementation
    └── tailwind.config.ts    # Styling logic
```

---

## 🔮 Future Development Roadmap

To transition this POC into a robust, production-ready SaaS application, the following areas must be addressed:

### Phase 2: Live Telephony Pipeline (Current Immediate Next Step)
- **Twilio Voice Integration**: Expose the FastAPI local endpoints to the internet using `ngrok`. Wire Twilio webhook URLs to point to `/api/voice` to initiate the Pipecat pipeline when a phone call is received.
- **Audio I/O Tuning**: Calibrate Voice Activity Detection (VAD), barge-in tolerance, and conversational latency limits within Pipecat to prevent awkward interruptions.
- **SMS Triggering**: Wire successful appointment database commits to the Twilio Messages API to dispatch confirmation texts.

### Phase 3: Dashboard Completion
- **Dynamic Frontend Integration**: Replace the static mock data arrays currently present in `Appointments.tsx` and `Calls.tsx` with live `axios.get` calls hitting the respective FastAPI `/api/appointments` and `/api/calls` routes (similar to how `Doctors.tsx` fetches data).
- **CRUD Operations**: Wire the React "Add Doctor" and "Edit" frontend forms into POST/PUT backend API logic.

### Production Readiness & Advanced Features
- **EMR Integration**: Integrate the availability lookup with real Electronic Medical Record (EMR) APIs (like Epic, Cerner, or Athenahealth) instead of mock local loops.
- **Multi-tenant SaaS Model**: Modify the database architecture to support multiple clinic `Organization` IDs, allocating distinct Twilio numbers and operating hours per tenant.
- **Data Security & HIPAA Compliance**: Introduce end-to-end encryption for the database, ensure PII masking in LLM context logs, and isolate sessions strictly behind valid auth tokens on the dashboard.
