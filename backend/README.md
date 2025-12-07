# This repository has been consolidated

This backend-only repo is deprecated. The project has been moved to a monorepo structure.

Go to the main repository: [securepath](https://github.com/manishneupane0909-eng/securepath)

The main repo contains both the backend and frontend in a single repository for easier development and deployment.

---

# SecurePath - Fraud Detection System (Backend)

Fraud detection system built with Django and React. Features transaction monitoring, ML-based risk scoring, and automated fraud detection.

## Features

- Real-time transaction monitoring
- ML-based fraud detection using scikit-learn
- Bulk CSV file processing
- Audit logging
- Report generation (CSV and PDF)
- RESTful API
- Rate limiting
- Dashboard UI

## Prerequisites

- Python 3.9+
- Node.js 18+
- PostgreSQL 15+ (or SQLite for dev)
- Redis 7+ (for Celery)
- Docker (optional)

## Setup

### Backend

```bash
git clone https://github.com/manishneupane0909-eng/securepath.git
cd securepath/backend

python -m venv venv
source venv/bin/activate
pip install -r requirements.txt

cp .env.example .env
python manage.py migrate
python manage.py runserver
```

### Frontend

```bash
cd securepath/frontend
npm install
cp .env.example .env.local
npm start
```

## Environment Variables

Create a `.env` file in `backend/`:

```
SECRET_KEY=your-secret-key
DEBUG=True
DATABASE_URL=postgresql://user:password@localhost:5432/securepath
REDIS_URL=redis://localhost:6379/0
PLAID_CLIENT_ID=your-plaid-client-id
PLAID_SECRET=your-plaid-secret
PLAID_ENV=sandbox
API_TOKEN=your-api-token
```

## API Endpoints

- `GET /api/v1/dashboard/stats` - Get dashboard stats
- `POST /api/v1/upload` - Upload CSV file
- `POST /api/v1/detect-fraud` - Run fraud detection
- `GET /api/v1/export/csv` - Export report

All endpoints require Bearer token authentication (set in .env as API_TOKEN).

## Notes

- ML model is basic right now, just heuristics and a simple classifier
- Plaid integration works but needs sandbox keys to test
- Docker setup exists but haven't tested it much in production

