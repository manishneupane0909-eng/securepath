# 🚀 Quick Start Guide

## Start the Backend Server

You have **3 options**:

### Option 1: Use python3 directly (Recommended)
```bash
cd backend
./venv/bin/python3 manage.py runserver
```

### Option 2: Activate virtual environment first
```bash
cd backend
source venv/bin/activate
python manage.py runserver
# When done, type: deactivate
```

### Option 3: Use the startup script
```bash
cd backend
./start_server.sh
```

## Start the Frontend

```bash
cd frontend
npm start
```

## Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000/api
- **Login Page**: http://localhost:3000/login
- **Register Page**: http://localhost:3000/register

## Troubleshooting

**If you get "no such file or directory" error:**
1. Make sure you're in the `backend` directory: `cd backend`
2. Check if venv exists: `ls -la venv/bin/`
3. Use `python3` instead of `python`: `./venv/bin/python3 manage.py runserver`

**If Django is not found:**
```bash
cd backend
source venv/bin/activate
pip install -r requirements.txt
```

