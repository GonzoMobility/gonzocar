"""
OpenPhone API Service

Sends SMS messages via OpenPhone API for:
- Late payment reminders
- Application status notifications

API Docs: https://www.openphone.com/docs/api
"""

import os
import httpx
from datetime import datetime
from typing import Optional
from dataclasses import dataclass


@dataclass
class SmsResult:
    success: bool
    message_id: Optional[str] = None
    error: Optional[str] = None


class OpenPhoneService:
    """OpenPhone API wrapper for sending SMS."""
    
    BASE_URL = "https://api.openphone.com/v1"
    
    def __init__(self):
        self.api_key = os.getenv("OPENPHONE_API_KEY")
        self.phone_number = os.getenv("OPENPHONE_PHONE_NUMBER", "+13123002032")
        
        if not self.api_key:
            print("Warning: OPENPHONE_API_KEY not set")
    
    def _headers(self) -> dict:
        return {
            "Authorization": self.api_key,
            "Content-Type": "application/json",
        }
    
    async def send_sms(self, to_phone: str, message: str) -> SmsResult:
        """
        Send an SMS message.
        
        Args:
            to_phone: Recipient phone number (E.164 format preferred)
            message: Message text
        
        Returns:
            SmsResult with success status and message_id or error
        """
        if not self.api_key:
            return SmsResult(success=False, error="API key not configured")
        
        # Normalize phone number
        to_phone = self._normalize_phone(to_phone)
        
        try:
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    f"{self.BASE_URL}/messages",
                    headers=self._headers(),
                    json={
                        "from": self.phone_number,
                        "to": [to_phone],
                        "content": message,
                    },
                    timeout=30.0,
                )
                
                if response.status_code in (200, 201, 202):
                    data = response.json()
                    return SmsResult(
                        success=True,
                        message_id=data.get("id") or data.get("data", {}).get("id"),
                    )
                else:
                    return SmsResult(
                        success=False,
                        error=f"API error: {response.status_code} - {response.text}",
                    )
                    
        except Exception as e:
            return SmsResult(success=False, error=str(e))
    
    def send_sms_sync(self, to_phone: str, message: str) -> SmsResult:
        """Synchronous version of send_sms."""
        if not self.api_key:
            return SmsResult(success=False, error="API key not configured")
        
        to_phone = self._normalize_phone(to_phone)
        
        try:
            with httpx.Client() as client:
                response = client.post(
                    f"{self.BASE_URL}/messages",
                    headers=self._headers(),
                    json={
                        "from": self.phone_number,
                        "to": [to_phone],
                        "content": message,
                    },
                    timeout=30.0,
                )
                
                if response.status_code in (200, 201, 202):
                    data = response.json()
                    return SmsResult(
                        success=True,
                        message_id=data.get("id") or data.get("data", {}).get("id"),
                    )
                else:
                    return SmsResult(
                        success=False,
                        error=f"API error: {response.status_code} - {response.text}",
                    )
                    
        except Exception as e:
            return SmsResult(success=False, error=str(e))
    
    @staticmethod
    def _normalize_phone(phone: str) -> str:
        """Normalize phone number to E.164 format."""
        # Remove non-digits
        digits = ''.join(c for c in phone if c.isdigit())
        
        # Add country code if missing
        if len(digits) == 10:
            digits = '1' + digits
        
        return '+' + digits


# Singleton instance
openphone = OpenPhoneService()


# Message templates
class SmsTemplates:
    @staticmethod
    def late_payment(driver_name: str, amount: float, days_late: int) -> str:
        return (
            f"Hi {driver_name}, your payment of ${amount:.2f} is {days_late} days overdue. "
            f"Please make a payment as soon as possible to avoid service interruption. "
            f"- GonzoFleet"
        )
    
    @staticmethod
    def application_approved(applicant_name: str) -> str:
        return (
            f"Congratulations {applicant_name}! Your GonzoFleet driver application has been approved. "
            f"We'll be in touch with next steps. - GonzoFleet"
        )
    
    @staticmethod
    def application_declined(applicant_name: str) -> str:
        return (
            f"Hi {applicant_name}, unfortunately your GonzoFleet driver application was not approved "
            f"at this time. Thank you for your interest. - GonzoFleet"
        )
