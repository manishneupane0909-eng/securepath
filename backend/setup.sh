#!/bin/bash

# SecurePath Setup Script
# This script automates the setup process for both backend and frontend

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Print colored output
print_info() {
    echo -e "${BLUE}ℹ ${NC}$1"
}

print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

print_header() {
    echo ""
    echo -e "${BLUE}═══════════════════════════════════════════════════${NC}"
    echo -e "${BLUE}  $1${NC}"
    echo -e "${BLUE}═══════════════════════════════════════════════════${NC}"
    echo ""
}

# Check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Main setup function
main() {
    print_header "SecurePath - Automated Setup"
    
    # Check prerequisites
    print_info "Checking prerequisites..."
    
    if ! command_exists python3; then
        print_error "Python 3 is not installed. Please install Python 3.9 or higher."
        exit 1
    fi
    print_success "Python 3 found: $(python3 --version)"
    
    if ! command_exists node; then
        print_error "Node.js is not installed. Please install Node.js 18 or higher."
        exit 1
    fi
    print_success "Node.js found: $(node --version)"
    
    if ! command_exists npm; then
        print_error "npm is not installed. Please install npm."
        exit 1
    fi
    print_success "npm found: $(npm --version)"
    
    # Optional checks
    if command_exists redis-server; then
        print_success "Redis found (optional)"
    else
        print_warning "Redis not found (optional - needed for Celery)"
    fi
    
    if command_exists psql; then
        print_success "PostgreSQL found (optional)"
    else
        print_warning "PostgreSQL not found (optional - SQLite will be used for development)"
    fi
    
    # Setup backend
    print_header "Setting up Backend"
    
    cd backend
    
    # Create virtual environment
    if [ ! -d "venv" ]; then
        print_info "Creating Python virtual environment..."
        python3 -m venv venv
        print_success "Virtual environment created"
    else
        print_success "Virtual environment already exists"
    fi
    
    # Activate virtual environment
    print_info "Activating virtual environment..."
    source venv/bin/activate
    
    # Install dependencies
    print_info "Installing Python dependencies..."
    pip install --upgrade pip -q
    pip install -r requirements.txt -q
    print_success "Python dependencies installed"
    
    # Setup environment file
    if [ ! -f ".env" ]; then
        print_info "Creating .env file from template..."
        cp .env.example .env
        print_warning "Please edit backend/.env with your configuration"
    else
        print_success ".env file already exists"
    fi
    
    # Run migrations
    print_info "Running database migrations..."
    python manage.py makemigrations
    python manage.py migrate
    print_success "Database migrations completed"
    
    # Deactivate virtual environment
    deactivate
    
    cd ..
    
    # Setup frontend
    print_header "Setting up Frontend"
    
    cd frontend
    
    # Install dependencies
    print_info "Installing Node.js dependencies (this may take a few minutes)..."
    npm install
    print_success "Node.js dependencies installed"
    
    # Setup environment file
    if [ ! -f ".env.local" ]; then
        print_info "Creating .env.local file from template..."
        cp .env.example .env.local
        print_warning "Please edit frontend/.env.local with your configuration"
    else
        print_success ".env.local file already exists"
    fi
    
    cd ..
    
    # Final instructions
    print_header "Setup Complete!"
    
    echo ""
    print_success "Backend and frontend are ready to run!"
    echo ""
    print_info "Next steps:"
    echo ""
    echo "  1. Configure environment variables:"
    echo "     - Edit backend/.env"
    echo "     - Edit frontend/.env.local"
    echo ""
    echo "  2. Start the backend (in one terminal):"
    echo "     ${GREEN}cd backend${NC}"
    echo "     ${GREEN}source venv/bin/activate${NC}  # On Windows: venv\\Scripts\\activate"
    echo "     ${GREEN}python manage.py runserver${NC}"
    echo ""
    echo "  3. Start the frontend (in another terminal):"
    echo "     ${GREEN}cd frontend${NC}"
    echo "     ${GREEN}npm start${NC}"
    echo ""
    echo "  4. Access the application:"
    echo "     - Frontend: ${BLUE}http://localhost:3000${NC}"
    echo "     - Backend API: ${BLUE}http://localhost:8000/api${NC}"
    echo "     - API Docs: ${BLUE}http://localhost:8000/api/docs${NC}"
    echo ""
    print_info "Optional: Start Celery worker for background tasks"
    echo "     ${GREEN}cd backend${NC}"
    echo "     ${GREEN}source venv/bin/activate${NC}"
    echo "     ${GREEN}celery -A backend worker -l info${NC}"
    echo ""
    print_info "Or use Docker Compose to run everything:"
    echo "     ${GREEN}docker-compose up --build${NC}"
    echo ""
}

# Run main function
main
