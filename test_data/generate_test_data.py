#!/usr/bin/env python3
"""
Test Data Generator for SecurePath
Generates sample transaction CSV files for testing
"""

import csv
import random
from datetime import datetime, timedelta

# Sample merchants
MERCHANTS = [
    'Amazon', 'Starbucks', 'Target', 'Walmart', 'Best Buy', 'McDonald\'s',
    'Home Depot', 'CVS Pharmacy', 'Costco', 'Apple Store', 'Subway',
    'Nike Store', 'Whole Foods', 'Petco', 'Office Depot', 'Trader Joe\'s',
    'GameStop', 'REI', 'Panera Bread', 'Uber', 'Netflix', 'Spotify',
    'Shell Gas Station', 'BP Gas Station', 'Chevron', 'Exxon'
]

# Sample countries
COUNTRIES = ['US', 'CA', 'MX', 'GB', 'FR', 'DE', 'JP', 'CN']

# Sample currencies
CURRENCIES = ['USD', 'CAD', 'EUR', 'GBP', 'JPY', 'CNY']

def generate_transaction_id(index):
    """Generate a unique transaction ID"""
    timestamp = int(datetime.now().timestamp())
    return f"TXN_{timestamp}_{index:04d}"

def generate_date(days_ago=0):
    """Generate a date string"""
    date = datetime.now() - timedelta(days=days_ago)
    hour = random.randint(8, 20)
    minute = random.randint(0, 59)
    return date.replace(hour=hour, minute=minute).strftime('%Y-%m-%d %H:%M:%S')

def generate_amount():
    """Generate a random transaction amount"""
    # 70% small transactions (< $100), 20% medium ($100-$500), 10% large (> $500)
    rand = random.random()
    if rand < 0.7:
        return round(random.uniform(5.00, 99.99), 2)
    elif rand < 0.9:
        return round(random.uniform(100.00, 499.99), 2)
    else:
        return round(random.uniform(500.00, 2000.00), 2)

def generate_card_number():
    """Generate a masked card number"""
    last_four = random.randint(1000, 9999)
    return f"****{last_four}"

def generate_transactions(count=50, filename='test_transactions.csv'):
    """Generate a CSV file with test transactions"""
    transactions = []
    
    for i in range(count):
        transactions.append({
            'transaction_id': generate_transaction_id(i),
            'date': generate_date(days_ago=random.randint(0, 30)),
            'merchant': random.choice(MERCHANTS),
            'amount': generate_amount(),
            'card_number': generate_card_number(),
            'country': random.choice(COUNTRIES),
            'currency': random.choice(CURRENCIES),
            'status': 'pending'
        })
    
    # Write to CSV
    with open(filename, 'w', newline='') as csvfile:
        fieldnames = ['transaction_id', 'date', 'merchant', 'amount', 'card_number', 'country', 'currency', 'status']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(transactions)
    
    print(f"✓ Generated {count} transactions in {filename}")
    return filename

def generate_high_risk_transactions(count=10, filename='test_high_risk.csv'):
    """Generate transactions that are likely to be flagged as high risk"""
    transactions = []
    
    # High-risk patterns: large amounts, unusual countries, etc.
    high_risk_merchants = ['Unknown Merchant', 'International Transfer', 'Cryptocurrency Exchange']
    high_risk_countries = ['CN', 'RU', 'NG', 'BR', 'XX']
    
    for i in range(count):
        transactions.append({
            'transaction_id': generate_transaction_id(i + 1000),
            'date': generate_date(days_ago=random.randint(0, 7)),
            'merchant': random.choice(high_risk_merchants) if random.random() < 0.5 else random.choice(MERCHANTS),
            'amount': round(random.uniform(1000.00, 10000.00), 2),  # Large amounts
            'card_number': generate_card_number(),
            'country': random.choice(high_risk_countries) if random.random() < 0.7 else 'US',
            'currency': random.choice(CURRENCIES),
            'status': 'pending'
        })
    
    # Write to CSV
    with open(filename, 'w', newline='') as csvfile:
        fieldnames = ['transaction_id', 'date', 'merchant', 'amount', 'card_number', 'country', 'currency', 'status']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(transactions)
    
    print(f"✓ Generated {count} high-risk transactions in {filename}")
    return filename

if __name__ == '__main__':
    print("SecurePath Test Data Generator")
    print("=" * 40)
    
    # Generate standard test file
    generate_transactions(50, 'test_data/generated_standard.csv')
    
    # Generate high-risk test file
    generate_high_risk_transactions(10, 'test_data/generated_high_risk.csv')
    
    # Generate small test file
    generate_transactions(10, 'test_data/generated_small.csv')
    
    print("\n✓ All test files generated successfully!")
    print("\nFiles created:")
    print("  - test_data/generated_standard.csv (50 transactions)")
    print("  - test_data/generated_high_risk.csv (10 high-risk transactions)")
    print("  - test_data/generated_small.csv (10 transactions)")
    print("\nYou can now upload these files to test the system.")

