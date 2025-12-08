#!/bin/bash
# Activate virtual environment and start server
cd "$(dirname "$0")"
source venv/bin/activate
echo "✅ Virtual environment activated!"
echo "Python: $(which python)"
echo "Django: $(python -c 'import django; print(django.get_version())' 2>/dev/null || echo 'Not installed')"
echo ""
echo "Starting Django server..."
python manage.py runserver

