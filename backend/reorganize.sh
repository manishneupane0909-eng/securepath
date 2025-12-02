#!/bin/bash

# SecurePath Monorepo Reorganization Script
# This script automates the process of combining backend and frontend into a monorepo

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
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
    echo -e "${CYAN}═══════════════════════════════════════════════════${NC}"
    echo -e "${CYAN}  $1${NC}"
    echo -e "${CYAN}═══════════════════════════════════════════════════${NC}"
    echo ""
}

print_step() {
    echo -e "${GREEN}▶${NC} $1"
}

# Main reorganization function
main() {
    print_header "SecurePath Monorepo Reorganization"
    
    # Confirm with user
    echo "This script will:"
    echo "  1. Create a new 'securepath' directory"
    echo "  2. Copy backend files to securepath/backend/"
    echo "  3. Copy frontend files to securepath/frontend/"
    echo "  4. Set up monorepo configuration files"
    echo "  5. Initialize a new Git repository"
    echo ""
    print_warning "This will NOT delete your original directories"
    echo ""
    read -p "Do you want to continue? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        print_error "Reorganization cancelled"
        exit 1
    fi
    
    # Set paths
    BASE_DIR="/Users/nish"
    BACKEND_SRC="$BASE_DIR/securepath-backend"
    FRONTEND_SRC="$BASE_DIR/securepath-dashboard"
    MONOREPO_DIR="$BASE_DIR/securepath"
    
    # Check if source directories exist
    print_step "Checking source directories..."
    
    if [ ! -d "$BACKEND_SRC" ]; then
        print_error "Backend directory not found: $BACKEND_SRC"
        exit 1
    fi
    print_success "Backend directory found"
    
    if [ ! -d "$FRONTEND_SRC" ]; then
        print_error "Frontend directory not found: $FRONTEND_SRC"
        exit 1
    fi
    print_success "Frontend directory found"
    
    # Check if monorepo directory already exists
    if [ -d "$MONOREPO_DIR" ]; then
        print_warning "Directory $MONOREPO_DIR already exists"
        read -p "Do you want to remove it and continue? (y/n) " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            rm -rf "$MONOREPO_DIR"
            print_success "Removed existing directory"
        else
            print_error "Reorganization cancelled"
            exit 1
        fi
    fi
    
    # Create monorepo directory
    print_header "Creating Monorepo Structure"
    
    print_step "Creating parent directory..."
    mkdir -p "$MONOREPO_DIR"
    print_success "Created $MONOREPO_DIR"
    
    # Copy backend
    print_step "Copying backend files..."
    cp -r "$BACKEND_SRC" "$MONOREPO_DIR/backend"
    
    # Remove backend .git directory
    if [ -d "$MONOREPO_DIR/backend/.git" ]; then
        rm -rf "$MONOREPO_DIR/backend/.git"
        print_success "Removed backend .git directory"
    fi
    
    print_success "Backend files copied"
    
    # Copy frontend
    print_step "Copying frontend files..."
    cp -r "$FRONTEND_SRC" "$MONOREPO_DIR/frontend"
    
    # Remove frontend .git directory
    if [ -d "$MONOREPO_DIR/frontend/.git" ]; then
        rm -rf "$MONOREPO_DIR/frontend/.git"
        print_success "Removed frontend .git directory"
    fi
    
    print_success "Frontend files copied"
    
    # Set up root-level files
    print_header "Setting Up Monorepo Files"
    
    cd "$MONOREPO_DIR"
    
    # Move monorepo files to root
    print_step "Setting up root configuration files..."
    
    if [ -f "backend/MONOREPO_README.md" ]; then
        mv backend/MONOREPO_README.md README.md
        print_success "Created README.md"
    fi
    
    if [ -f "backend/docker-compose.yml" ]; then
        # docker-compose.yml is already in the right place
        print_success "docker-compose.yml ready"
    fi
    
    if [ -f "backend/setup.sh" ]; then
        cp backend/setup.sh setup.sh
        chmod +x setup.sh
        print_success "Created setup.sh"
    fi
    
    if [ -f "backend/MONOREPO_GITIGNORE" ]; then
        mv backend/MONOREPO_GITIGNORE .gitignore
        print_success "Created .gitignore"
    fi
    
    if [ -f "backend/MONOREPO_ENV_EXAMPLE" ]; then
        mv backend/MONOREPO_ENV_EXAMPLE .env.example
        print_success "Created .env.example"
    fi
    
    # Clean up temporary files
    print_step "Cleaning up temporary files..."
    rm -f backend/MONOREPO_README.md
    rm -f backend/MONOREPO_GITIGNORE
    rm -f backend/MONOREPO_ENV_EXAMPLE
    rm -f backend/REORGANIZATION_GUIDE.md
    print_success "Cleanup complete"
    
    # Initialize Git repository
    print_header "Initializing Git Repository"
    
    print_step "Initializing Git..."
    git init
    print_success "Git repository initialized"
    
    print_step "Adding files to Git..."
    git add .
    print_success "Files staged"
    
    print_step "Creating initial commit..."
    git commit -m "Initial commit: Combined backend and frontend into monorepo

- Backend: Django fraud detection system
- Frontend: React dashboard with Plaid integration
- Docker Compose configuration for all services
- Automated setup script
- Comprehensive documentation"
    print_success "Initial commit created"
    
    # Final summary
    print_header "Reorganization Complete!"
    
    echo ""
    print_success "Your monorepo is ready at: ${CYAN}$MONOREPO_DIR${NC}"
    echo ""
    print_info "Directory structure:"
    echo "  securepath/"
    echo "  ├── backend/          (Django backend)"
    echo "  ├── frontend/         (React frontend)"
    echo "  ├── README.md         (Main documentation)"
    echo "  ├── docker-compose.yml"
    echo "  ├── setup.sh"
    echo "  ├── .gitignore"
    echo "  └── .env.example"
    echo ""
    print_info "Next steps:"
    echo ""
    echo "  1. Review the README.md:"
    echo "     ${GREEN}cd $MONOREPO_DIR${NC}"
    echo "     ${GREEN}cat README.md${NC}"
    echo ""
    echo "  2. Run the setup script:"
    echo "     ${GREEN}./setup.sh${NC}"
    echo ""
    echo "  3. Create a GitHub repository and push:"
    echo "     ${GREEN}git remote add origin https://github.com/YOUR_USERNAME/securepath.git${NC}"
    echo "     ${GREEN}git branch -M main${NC}"
    echo "     ${GREEN}git push -u origin main${NC}"
    echo ""
    echo "  4. Share with your professor:"
    echo "     ${CYAN}https://github.com/YOUR_USERNAME/securepath${NC}"
    echo ""
    print_success "Original directories are still intact at:"
    echo "  - $BACKEND_SRC"
    echo "  - $FRONTEND_SRC"
    echo ""
}

# Run main function
main
