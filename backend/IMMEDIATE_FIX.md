# 🚨 IMMEDIATE FIX - Run These Commands

## Option 1: Automated Fix (Easiest)

```bash
cd /Users/nish/securepath-backend
./fix-errors.sh
```

This will fix everything automatically!

---

## Option 2: Manual Fix

### Fix Backend (Terminal 1)

```bash
# 1. Go to backend directory
cd /Users/nish/securepath-backend

# 2. Activate virtual environment
source venv/bin/activate

# 3. Install dependencies (if needed)
pip install -r requirements.txt

# 4. Run migrations
python manage.py migrate

# 5. Start server
python manage.py runserver
```

**Expected output:** `Starting development server at http://127.0.0.1:8000/`

---

### Fix Frontend (Terminal 2 - New Terminal Window)

```bash
# 1. Go to frontend directory
cd /Users/nish/securepath-dashboard

# 2. Install dependencies (if needed)
npm install

# 3. Start server
npm start
```

**Expected output:** Browser opens to `http://localhost:3000`

---

## Quick Environment Setup

If you don't have `.env` files:

### Backend `.env`
```bash
cd /Users/nish/securepath-backend
cp .env.example .env
```

Then edit `.env` and set at minimum:
```
SECRET_KEY=any-random-string-here
API_TOKEN=my-secure-token-123
```

### Frontend `.env.local`
```bash
cd /Users/nish/securepath-dashboard
cp .env.example .env.local
```

Then edit `.env.local` and set:
```
REACT_APP_API_BASE_URL=http://localhost:8000/api
REACT_APP_API_TOKEN=my-secure-token-123
```

**Make sure API_TOKEN matches in both files!**

---

## Still Getting Errors?

Share the exact error message and I'll help you fix it!

Common errors:
- ❌ "command not found: python" → Use `python3` instead
- ❌ "ModuleNotFoundError: No module named 'django'" → Run `pip install -r requirements.txt`
- ❌ "Port 3000 already in use" → Run `lsof -ti:3000 | xargs kill -9`
- ❌ Network errors in frontend → Make sure backend is running first
