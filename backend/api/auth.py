# api/auth.py - Uses settings.API_TOKEN for consistent token management
from ninja.security import HttpBearer
from django.conf import settings


class AuthBearer(HttpBearer):
    def authenticate(self, request, token):
        # Use settings.API_TOKEN for consistent token validation
        if token == settings.API_TOKEN:
            return token
        return None


auth_bearer = AuthBearer()


# NEW FUNCTION: For URLs that pass the token via query string (like Report Export)
def token_query_auth(request):
    """Checks for the token in the URL query parameter 'token'."""
    token = request.GET.get('token')

    # Use the token from environment variables for comparison
    expected_token = settings.API_TOKEN

    if token == expected_token:
        return token
    return None