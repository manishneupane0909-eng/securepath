# SecurePath

**Full-stack monorepo** - This is the main repository containing both backend and frontend.

Full-stack fraud detection system I built for a class project. Uses Django for the backend and React for the frontend. Integrates with Plaid to get transaction data and runs ML models to detect fraud.

## What it does

- Upload CSV files with transactions or connect bank accounts via Plaid
- Runs fraud detection on transactions using scikit-learn
- Shows risk scores and flags suspicious transactions
- Dashboard to view stats and export reports

## Tech Stack

**Backend:**
- Django REST Framework
- PostgreSQL (or SQLite for dev)
- scikit-learn for ML models
- Celery + Redis for background tasks
- Plaid API integration

**Frontend:**
- React
- TailwindCSS
- Chart.js for visualizations

## Setup

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Copy .env.example to .env and fill in your keys
cp .env.example .env

# Run migrations
python manage.py migrate

# Start server
python manage.py runserver
```

### Frontend

```bash
cd frontend
npm install

# Copy .env.example to .env.local
cp .env.example .env.local

# Start dev server
npm start
```

## Environment Variables

You'll need:
- Plaid API keys (get from plaid.com)
- Django SECRET_KEY
- Database credentials (or use SQLite for dev)

See `.env.example` files for what's needed.

## API Endpoints

Main ones:
- `GET /api/v1/dashboard/stats` - Get dashboard stats
- `POST /api/v1/upload` - Upload CSV file
- `POST /api/v1/detect-fraud` - Run fraud detection
- `GET /api/v1/export/csv` - Export report

All endpoints need Bearer token auth (set in .env as API_TOKEN).

## Notes

- The ML model is pretty basic right now, just using some heuristics and a simple classifier
- Plaid integration works but you need sandbox keys to test
- Frontend is a bit messy, still cleaning up some components
- Docker setup exists but I haven't tested it much in production

## Future improvements

- Better ML model training
- Real-time notifications
- User accounts and auth
- More visualization options
