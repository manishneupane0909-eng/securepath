# SecurePath Monorepo - Directory Reorganization Guide

This guide will help you reorganize your two separate repositories into a single monorepo structure.

## 📋 Current Structure

You currently have:
```
/Users/nish/
├── securepath-backend/     (separate Git repo)
└── securepath-dashboard/   (separate Git repo)
```

## 🎯 Target Structure

We want to create:
```
/Users/nish/securepath/
├── backend/               (Django backend)
├── frontend/              (React frontend)
├── README.md             (Main documentation)
├── docker-compose.yml    (Docker orchestration)
├── setup.sh              (Automated setup)
├── .gitignore            (Combined gitignore)
├── .env.example          (Environment template)
└── .git/                 (New Git repository)
```

## 🚀 Step-by-Step Instructions

### Option A: Manual Reorganization (Recommended for Learning)

#### Step 1: Create Parent Directory

```bash
cd /Users/nish
mkdir securepath
cd securepath
```

#### Step 2: Copy Backend Files

```bash
# Copy all backend files except .git
cp -r ../securepath-backend backend
rm -rf backend/.git
```

#### Step 3: Copy Frontend Files

```bash
# Copy all frontend files except .git
cp -r ../securepath-dashboard frontend
rm -rf frontend/.git
```

#### Step 4: Copy Monorepo Files

I've created the following files in `/Users/nish/securepath-backend/`:
- `MONOREPO_README.md` → Copy this to `/Users/nish/securepath/README.md`
- `docker-compose.yml` → Already in place, copy to root
- `setup.sh` → Already updated, copy to root
- `MONOREPO_GITIGNORE` → Copy this to `/Users/nish/securepath/.gitignore`
- `MONOREPO_ENV_EXAMPLE` → Copy this to `/Users/nish/securepath/.env.example`

```bash
# From /Users/nish/securepath/
cp backend/MONOREPO_README.md README.md
cp backend/docker-compose.yml .
cp backend/setup.sh .
cp backend/MONOREPO_GITIGNORE .gitignore
cp backend/MONOREPO_ENV_EXAMPLE .env.example

# Clean up temporary files
rm backend/MONOREPO_README.md
rm backend/MONOREPO_GITIGNORE
rm backend/MONOREPO_ENV_EXAMPLE
```

#### Step 5: Update Docker Compose Paths

The `docker-compose.yml` already has the correct paths (`./backend` and `./frontend`), so no changes needed!

#### Step 6: Update Setup Script Paths

The `setup.sh` already has the correct paths, so no changes needed!

#### Step 7: Initialize Git Repository

```bash
cd /Users/nish/securepath

# Initialize new Git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Combined backend and frontend into monorepo"
```

#### Step 8: Connect to GitHub

```bash
# Create a new repository on GitHub (do this in your browser)
# Then connect your local repo:

git remote add origin https://github.com/YOUR_USERNAME/securepath.git
git branch -M main
git push -u origin main
```

### Option B: Automated Script

I can create a script to automate this process. Would you like me to create an automated reorganization script?

## 🔧 Post-Reorganization Steps

### 1. Update Environment Files

```bash
cd /Users/nish/securepath

# Backend environment
cp backend/.env.example backend/.env
# Edit backend/.env with your configuration

# Frontend environment
cp frontend/.env.example frontend/.env.local
# Edit frontend/.env.local with your configuration
```

### 2. Test the Setup

```bash
# Run the setup script
chmod +x setup.sh
./setup.sh
```

### 3. Verify Everything Works

**Terminal 1 - Backend:**
```bash
cd /Users/nish/securepath/backend
source venv/bin/activate
python manage.py runserver
```

**Terminal 2 - Frontend:**
```bash
cd /Users/nish/securepath/frontend
npm start
```

**Terminal 3 - Docker (Alternative):**
```bash
cd /Users/nish/securepath
docker-compose up --build
```

## 📝 What to Tell Your Professor

When sharing the repository with your professor, provide:

1. **GitHub Repository URL**: `https://github.com/YOUR_USERNAME/securepath`

2. **Quick Start Instructions**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/securepath.git
   cd securepath
   chmod +x setup.sh
   ./setup.sh
   ```

3. **Documentation**: The README.md contains:
   - Complete project overview
   - Architecture diagram
   - Detailed setup instructions
   - API documentation
   - Testing instructions
   - Deployment guide

## 🎓 Academic Submission Checklist

- [ ] Repository is public (or professor has access)
- [ ] README.md is comprehensive and well-formatted
- [ ] All sensitive data removed (API keys, passwords, etc.)
- [ ] .env.example files are included with placeholders
- [ ] Code is well-commented
- [ ] Tests are included and documented
- [ ] Setup instructions are clear and tested
- [ ] Architecture diagram is included
- [ ] Both backend and frontend are documented

## ⚠️ Important Notes

1. **Backup First**: Before reorganizing, make sure you have backups of both repositories
2. **Git History**: This process creates a fresh Git repository. If you need to preserve history, use Git subtree or submodules instead
3. **Environment Files**: Never commit `.env` files with real credentials
4. **Database Files**: The `.gitignore` excludes database files - this is intentional
5. **Node Modules**: Don't commit `node_modules/` - let npm install handle this

## 🆘 Troubleshooting

### Issue: Permission Denied on setup.sh
```bash
chmod +x setup.sh
```

### Issue: Python Virtual Environment Not Activating
```bash
# On macOS/Linux:
source backend/venv/bin/activate

# On Windows:
backend\venv\Scripts\activate
```

### Issue: Port Already in Use
```bash
# Find and kill process on port 8000 (backend)
lsof -ti:8000 | xargs kill -9

# Find and kill process on port 3000 (frontend)
lsof -ti:3000 | xargs kill -9
```

### Issue: Docker Containers Won't Start
```bash
# Stop all containers
docker-compose down

# Remove volumes and rebuild
docker-compose down -v
docker-compose up --build
```

## 📞 Need Help?

If you encounter any issues during reorganization, check:
1. File permissions (`ls -la`)
2. Directory structure (`tree -L 2` or `ls -R`)
3. Git status (`git status`)
4. Environment variables (`cat .env`)

---

**Ready to reorganize?** Follow the steps above, and you'll have a clean monorepo ready for your professor! 🚀
