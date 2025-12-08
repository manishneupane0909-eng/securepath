# api/auth.py - JWT and API Token authentication
from ninja.security import HttpBearer
from django.conf import settings
import os
from api.jwt_auth import verify_token
from api.models import User

# Get the API token from settings (which reads from env or defaults)
def get_api_token():
    """Get API token from settings, with fallback"""
    return getattr(settings, 'API_TOKEN', os.getenv('API_TOKEN', 'root'))


class AuthBearer(HttpBearer):
    """
    Supports both JWT tokens and legacy API tokens
    - First tries to verify as JWT token
    - Falls back to API token for backward compatibility
    """
    def authenticate(self, request, token):
        # Try JWT authentication first
        payload = verify_token(token, token_type="access")
        if payload:
            user_id = payload.get("sub")
            user = User.objects.filter(id=user_id, is_active=True).first()
            if user:
                return user
        
        # Fallback to legacy API token for backward compatibility
        expected_token = get_api_token()
        if token == expected_token:
            return token
        
        return None


auth_bearer = AuthBearer()


def token_query_auth(request):
    """Checks for the token in the URL query parameter 'token'."""
    token = request.GET.get('token')
    expected_token = get_api_token()

    if token == expected_token:
        return token
    return None