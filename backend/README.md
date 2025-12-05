# SecurePath Backend

Django backend for the fraud detection system. Handles transaction processing, ML-based fraud detection, and API endpoints.

## Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
python manage.py migrate
python manage.py runserver
```

## Environment Variables

Create a `.env` file:

```
SECRET_KEY=your-secret-key
DEBUG=True
DATABASE_URL=postgresql://user:password@localhost:5432/securepath
REDIS_URL=redis://localhost:6379/0
PLAID_CLIENT_ID=your-plaid-client-id
PLAID_SECRET=your-plaid-secret
API_TOKEN=your-api-token
```

## API Endpoints

- `GET /api/v1/dashboard/stats` - Get dashboard stats
- `POST /api/v1/upload` - Upload CSV file
- `POST /api/v1/detect-fraud` - Run fraud detection
- `GET /api/v1/audit-log` - Get audit logs
- `GET /api/v1/export/csv` - Export report

All endpoints require Bearer token authentication.

## Testing

```bash
pytest
```
