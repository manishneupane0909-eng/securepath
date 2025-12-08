# api/schemas.py
from ninja import Schema
from pydantic import EmailStr, Field

class UploadResponse(Schema):
    status: str
    message: str
    records_uploaded: int
    duplicates_removed: int
    duration_seconds: float

class TransactionOut(Schema):
    id: int
    transaction_id: str
    amount: float = None
    merchant: str = None
    date: str = None
    risk_score: float = None
    reason_code: str = None
    status: str
    risk_level: str

class DashboardStats(Schema):
    total_transactions: int
    high_risk_count: int
    medium_risk_count: int
    low_risk_count: int
    pending_count: int
    approved_count: int
    rejected_count: int
    avg_risk_score: float
    total_amount: float

class DecisionIn(Schema):
    transaction_id: str
    decision: str
    reason: str = ""

class FraudDetectionResult(Schema):
    total_processed: int
    flagged_count: int
    duration_seconds: float
    results: list

class PlaidExchangeRequest(Schema):
    public_token: str

# Authentication Schemas
class UserRegister(Schema):
    email: EmailStr
    password: str = Field(..., min_length=8)
    confirm_password: str = Field(..., min_length=8)

class UserLogin(Schema):
    email: EmailStr
    password: str

class UserResponse(Schema):
    id: int
    email: str
    is_active: bool
    created_at: str

class TokenResponse(Schema):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    user: UserResponse