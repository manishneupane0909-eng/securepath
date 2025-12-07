# 🔧 Troubleshooting Guide - Common Errors

## Quick Fix (Run This First!)

```bash
cd /Users/nish/securepath-backend
./fix-errors.sh
```

This script will automatically:
- ✅ Create/verify Python virtual environment
- ✅ Install all backend dependencies
- ✅ Run database migrations
- ✅ Install all frontend dependencies
- ✅ Create environment files from templates

---

## Common Backend Errors

### Error: "ModuleNotFoundError: No module named 'django'"

**Cause:** Virtual environment not activated or Django not installed

**Fix:**
```bash
cd /Users/nish/securepath-backend

# Create virtual environment (if doesn't exist)
python3 -m venv venv

# Activate it
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py makemigrations
python manage.py migrate
```

**Then start the server:**
```bash
python manage.py runserver
```

---

### Error: "No such file or directory: '.env'"

**Cause:** Environment file missing

**Fix:**
```bash
cd /Users/nish/securepath-backend
cp .env.example .env

# Edit .env with your configuration
# At minimum, set:
# - SECRET_KEY (any random string)
# - API_TOKEN (any random string)
# - PLAID_CLIENT_ID and PLAID_SECRET (from Plaid dashboard)
```

---

### Error: "django.db.utils.OperationalError: no such table"

**Cause:** Database migrations not run

**Fix:**
```bash
cd /Users/nish/securepath-backend
source venv/bin/activate
python manage.py makemigrations
python manage.py migrate
```

---

## Common Frontend Errors

### Error: "Cannot find module 'react'" or similar

**Cause:** node_modules not installed

**Fix:**
```bash
cd /Users/nish/securepath-dashboard
npm install
```

---

### Error: "REACT_APP_API_BASE_URL is not defined"

**Cause:** Environment file missing

**Fix:**
```bash
cd /Users/nish/securepath-dashboard
cp .env.example .env.local

# Edit .env.local and set:
# REACT_APP_API_BASE_URL=http://localhost:8000/api
# REACT_APP_API_TOKEN=<same as backend API_TOKEN>
```

---

### Error: "Port 3000 is already in use"

**Cause:** Another process using port 3000

**Fix:**
```bash
# Kill the process on port 3000
lsof -ti:3000 | xargs kill -9

# Or run on a different port
PORT=3001 npm start
```

---

### Error: Network errors when calling API

**Cause:** Backend not running or wrong API URL

**Fix:**
1. Make sure backend is running on port 8000
2. Check `.env.local` has correct API URL:
   ```
   REACT_APP_API_BASE_URL=http://localhost:8000/api
   ```
3. Check that API_TOKEN matches in both backend and frontend

---

## Step-by-Step: Starting Both Services

### Terminal 1 - Backend

```bash
# Navigate to backend
cd /Users/nish/securepath-backend

# Activate virtual environment
source venv/bin/activate

# You should see (venv) in your prompt now

# Start server
python manage.py runserver

# You should see:
# Starting development server at http://127.0.0.1:8000/
```

### Terminal 2 - Frontend

```bash
# Navigate to frontend
cd /Users/nish/securepath-dashboard

# Start development server
npm start

# Browser should open automatically to http://localhost:3000
```

---

## Verification Checklist

### Backend Health Check
```bash
# With backend running, in a new terminal:
curl http://localhost:8000/api/v1/status

# Should return JSON with status: "ok"
```

### Frontend Health Check
- Open browser to `http://localhost:3000`
- You should see the SecurePath dashboard
- No console errors in browser DevTools (F12)

---

## Environment File Templates

### Backend `.env` (minimum required)
```env
SECRET_KEY=your-secret-key-change-this
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

DB_ENGINE=django.db.backends.sqlite3
DB_NAME=db.sqlite3

API_TOKEN=your-secure-token-123

# Optional: Plaid (if using Plaid features)
PLAID_CLIENT_ID=your_client_id
PLAID_SECRET=your_secret
PLAID_ENV=sandbox
```

### Frontend `.env.local` (minimum required)
```env
REACT_APP_API_BASE_URL=http://localhost:8000/api
REACT_APP_API_TOKEN=your-secure-token-123
REACT_APP_PLAID_ENV=sandbox
```

**Important:** The `API_TOKEN` must match in both files!

---

## Still Having Issues?

### Check Python Version
```bash
python3 --version
# Should be 3.9 or higher
```

### Check Node Version
```bash
node --version
# Should be 18 or higher
```

### Check if Ports are Available
```bash
# Check port 8000 (backend)
lsof -i:8000

# Check port 3000 (frontend)
lsof -i:3000
```

### View Backend Logs
```bash
cd /Users/nish/securepath-backend
source venv/bin/activate
python manage.py runserver
# Watch the output for errors
```

### View Frontend Logs
```bash
cd /Users/nish/securepath-dashboard
npm start
# Watch the output for errors
```

---

## Nuclear Option: Fresh Start

If nothing works, start completely fresh:

```bash
# Backend
cd /Users/nish/securepath-backend
rm -rf venv db.sqlite3
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
# Edit .env
python manage.py migrate
python manage.py runserver

# Frontend (in new terminal)
cd /Users/nish/securepath-dashboard
rm -rf node_modules package-lock.json
npm install
cp .env.example .env.local
# Edit .env.local
npm start
```

---

**Need more help?** Share the specific error message you're seeing!
