#!/usr/bin/env python
"""
Script to clear all transaction and audit log data from the database.
This will delete all transactions and audit logs, but keep user accounts.

Usage:
    python clear_database.py

Or to clear everything including users:
    python clear_database.py --all
"""

import os
import sys
import django

# Setup Django
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from api.models import Transaction, AuditLog, User

def clear_transactions_and_logs():
    """Clear all transactions and audit logs"""
    transaction_count = Transaction.objects.count()
    audit_log_count = AuditLog.objects.count()
    
    Transaction.objects.all().delete()
    AuditLog.objects.all().delete()
    
    print(f"✅ Deleted {transaction_count} transactions")
    print(f"✅ Deleted {audit_log_count} audit logs")
    print(f"✅ User accounts preserved ({User.objects.count()} users)")

def clear_all():
    """Clear everything including users"""
    transaction_count = Transaction.objects.count()
    audit_log_count = AuditLog.objects.count()
    user_count = User.objects.count()
    
    Transaction.objects.all().delete()
    AuditLog.objects.all().delete()
    User.objects.all().delete()
    
    print(f"✅ Deleted {transaction_count} transactions")
    print(f"✅ Deleted {audit_log_count} audit logs")
    print(f"✅ Deleted {user_count} user accounts")

if __name__ == '__main__':
    if '--all' in sys.argv:
        print("⚠️  WARNING: This will delete ALL data including user accounts!")
        response = input("Are you sure? Type 'yes' to confirm: ")
        if response.lower() == 'yes':
            clear_all()
            print("\n✅ Database cleared completely!")
        else:
            print("❌ Cancelled.")
    else:
        print("Clearing transactions and audit logs (preserving user accounts)...")
        clear_transactions_and_logs()
        print("\n✅ Database cleared! User accounts preserved.")
        print("\nTo clear everything including users, run:")
        print("  python clear_database.py --all")

