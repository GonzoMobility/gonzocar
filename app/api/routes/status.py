"""
System status endpoint for checking service health.
"""
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text
import os

from app.api.deps import get_db, get_current_user
from app.models import Staff

router = APIRouter(prefix="/status", tags=["status"])


@router.get("")
def get_system_status(
    db: Session = Depends(get_db),
    current_user: Staff = Depends(get_current_user)
):
    """Get system status for all integrations."""
    status = {
        "database": check_database(db),
        "openphone": check_openphone(),
        "gmail": check_gmail(),
    }
    return status


def check_database(db: Session) -> dict:
    """Check database connection."""
    try:
        db.execute(text("SELECT 1"))
        return {"status": "ok", "message": "Connected"}
    except Exception as e:
        return {"status": "error", "message": str(e)}


def check_openphone() -> dict:
    """Check OpenPhone API configuration."""
    api_key = os.getenv("OPENPHONE_API_KEY")
    phone = os.getenv("OPENPHONE_PHONE_NUMBER")
    
    if api_key and len(api_key) > 10:
        return {"status": "ok", "message": "Configured"}
    else:
        return {"status": "error", "message": "API key not set"}


def check_gmail() -> dict:
    """Check Gmail API configuration."""
    # Check if credentials files exist or env vars are set
    creds_exists = os.path.exists("credentials.json")
    token_exists = os.path.exists("token.json")
    
    if creds_exists and token_exists:
        return {"status": "ok", "message": "Configured"}
    elif creds_exists:
        return {"status": "warning", "message": "Needs authorization"}
    else:
        return {"status": "error", "message": "Credentials not found"}
