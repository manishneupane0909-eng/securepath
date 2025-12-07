#!/bin/bash

# SecurePath - Fix Common Errors Script
# This script fixes common setup and runtime errors

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_header() {
    echo ""
    echo -e "${BLUE}═══════════════════════════════════════════════════${NC}"
    echo -e "${BLUE}  $1${NC}"
    echo -e "${BLUE}═══════════════════════════════════════════════════${NC}"
    echo ""
}

print_info() { echo -e "${BLUE}ℹ ${NC}$1"; }
print_success() { echo -e "${GREEN}✓${NC} $1"; }
print_error() { echo -e "${RED}✗${NC} $1"; }
print_warning() { echo -e "${YELLOW}⚠${NC} $1"; }

# Determine the base directory
if [ -d "/Users/nish/securepath" ]; then
    BASE_DIR="/Users/nish/securepath"
    print_info "Using monorepo structure at $BASE_DIR"
else
    BASE_DIR="/Users/nish"
    print_info "Using separate repos structure at $BASE_DIR"
fi

BACKEND_DIR="$BASE_DIR/securepath-backend"
FRONTEND_DIR="$BASE_DIR/securepath-dashboard"

# If monorepo exists, use that
if [ -d "$BASE_DIR/securepath/backend" ]; then
    BACKEND_DIR="$BASE_DIR/securepath/backend"
    FRONTEND_DIR="$BASE_DIR/securepath/frontend"
fi

print_header "SecurePath Error Fix Script"

echo "Backend directory: $BACKEND_DIR"
echo "Frontend directory: $FRONTEND_DIR"
echo ""

# Fix Backend
print_header "Fixing Backend Issues"

cd "$BACKEND_DIR"

# Check if venv exists
if [ ! -d "venv" ]; then
    print_warning "Virtual environment not found. Creating..."
    python3 -m venv venv
    print_success "Virtual environment created"
fi

# Activate venv and install dependencies
print_info "Activating virtual environment and installing dependencies..."
source venv/bin/activate

print_info "Upgrading pip..."
pip install --upgrade pip -q

print_info "Installing Django and dependencies..."
pip install -r requirements.txt -q

print_success "Backend dependencies installed"

# Check for .env file
if [ ! -f ".env" ]; then
    print_warning ".env file not found. Creating from example..."
    if [ -f ".env.example" ]; then
        cp .env.example .env
        print_success "Created .env file"
        print_warning "Please edit .env with your configuration"
    else
        print_error ".env.example not found"
    fi
fi

# Run migrations
print_info "Running database migrations..."
python manage.py makemigrations
python manage.py migrate

print_success "Backend is ready!"

deactivate

# Fix Frontend
print_header "Fixing Frontend Issues"

cd "$FRONTEND_DIR"

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    print_warning "node_modules not found. Installing..."
    npm install
    print_success "Frontend dependencies installed"
else
    print_info "Checking for missing dependencies..."
    npm install
    print_success "Dependencies verified"
fi

# Check for .env.local
if [ ! -f ".env.local" ]; then
    print_warning ".env.local not found. Creating from example..."
    if [ -f ".env.example" ]; then
        cp .env.example .env.local
        print_success "Created .env.local file"
        print_warning "Please edit .env.local with your configuration"
    else
        print_error ".env.example not found"
    fi
fi

print_header "Fix Complete!"

echo ""
print_success "Both backend and frontend are ready to run!"
echo ""
print_info "To start the backend:"
echo "  ${GREEN}cd $BACKEND_DIR${NC}"
echo "  ${GREEN}source venv/bin/activate${NC}"
echo "  ${GREEN}python manage.py runserver${NC}"
echo ""
print_info "To start the frontend (in a new terminal):"
echo "  ${GREEN}cd $FRONTEND_DIR${NC}"
echo "  ${GREEN}npm start${NC}"
echo ""
