# Library of Alexander

React TypeScript + FastAPI project template.

## Quick Start

```bash
./start.sh
```

This starts both frontend and backend. Press `Ctrl+C` to stop.

## Structure

```
├── frontend/          # React + TypeScript + Vite
│   └── src/
└── backend/           # FastAPI
    ├── app/
    └── tests/
```

## Setup

### Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Testing

### Backend

```bash
cd backend
pytest
```

### Frontend

```bash
cd frontend
npm test
```

## Ports

- Frontend: http://localhost:5173
- Backend: http://localhost:8000
- API Docs: http://localhost:8000/docs
