"""
SMS Routes - Send SMS via OpenPhone API
"""

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.api.deps import get_db, get_current_user
from app.models.models import Staff, SmsLog, Driver
from app.services.openphone import openphone

router = APIRouter(prefix="/sms", tags=["sms"])


class SendSmsRequest(BaseModel):
    phone: str
    message: str


class SendSmsResponse(BaseModel):
    success: bool
    message_id: str | None = None
    error: str | None = None


@router.post("/send", response_model=SendSmsResponse)
async def send_sms(
    request: SendSmsRequest,
    db: Session = Depends(get_db),
    current_user: Staff = Depends(get_current_user),
):
    """Send an SMS message via OpenPhone."""
    
    # Send SMS first
    result = await openphone.send_sms(request.phone, request.message)
    
    # Try to find driver to log
    driver = db.query(Driver).filter(Driver.phone == request.phone).first()
    
    if driver:
        # Log the SMS if driver exists
        sms_log = SmsLog(
            driver_id=driver.id,
            phone=request.phone,
            message=request.message,
            status="sent" if result.success else "failed",
            openphone_response={
                "message_id": result.message_id,
                "error": result.error,
            }
        )
        db.add(sms_log)
        db.commit()
    else:
        # If no driver found, we can't log to database due to foreign key constraint
        # Just print for now or skip
        print(f"Warning: Sent SMS to {request.phone} but no driver found to log.")
    
    if not result.success:
        raise HTTPException(status_code=500, detail=result.error or "Failed to send SMS")
    
    return SendSmsResponse(
        success=True,
        message_id=result.message_id,
    )
