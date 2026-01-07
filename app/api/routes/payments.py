"""
Payments API Routes

Endpoints for managing payment records:
- List unrecognized (unmatched) payments
- Assign payment to driver (creates alias + ledger entry)
- Payment stats
"""

from uuid import UUID
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.api.deps import get_db, get_current_user
from app.models import Staff, PaymentRaw, Driver, Alias, Ledger, AliasType
from app.schemas import PaymentResponse, PaymentAssign

router = APIRouter(prefix="/payments", tags=["payments"])


@router.get("/unrecognized", response_model=list[PaymentResponse])
def list_unrecognized(
    db: Session = Depends(get_db),
    current_user: Staff = Depends(get_current_user)
):
    """List all unrecognized (unmatched) payments."""
    payments = db.query(PaymentRaw).filter(
        PaymentRaw.matched == False
    ).order_by(PaymentRaw.received_at.desc()).all()
    
    return payments


@router.get("/all", response_model=list[PaymentResponse])
def list_all_payments(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: Staff = Depends(get_current_user)
):
    """List all payments with pagination."""
    payments = db.query(PaymentRaw).order_by(
        PaymentRaw.received_at.desc()
    ).offset(skip).limit(limit).all()
    
    return payments


@router.get("/stats")
def payment_stats(
    db: Session = Depends(get_db),
    current_user: Staff = Depends(get_current_user)
):
    """Get payment statistics."""
    total_count = db.query(PaymentRaw).count()
    matched_count = db.query(PaymentRaw).filter(PaymentRaw.matched == True).count()
    unmatched_count = db.query(PaymentRaw).filter(PaymentRaw.matched == False).count()
    
    total_amount = db.query(func.sum(PaymentRaw.amount)).scalar() or 0
    matched_amount = db.query(func.sum(PaymentRaw.amount)).filter(
        PaymentRaw.matched == True
    ).scalar() or 0
    
    return {
        "total_payments": total_count,
        "matched_payments": matched_count,
        "unmatched_payments": unmatched_count,
        "total_amount": float(total_amount),
        "matched_amount": float(matched_amount),
    }


@router.post("/{payment_id}/assign", response_model=PaymentResponse)
def assign_payment(
    payment_id: UUID,
    data: PaymentAssign,
    db: Session = Depends(get_db),
    current_user: Staff = Depends(get_current_user)
):
    """
    Assign an unrecognized payment to a driver.
    
    This will:
    1. Update the payment record with driver_id
    2. Create a ledger credit entry
    3. Optionally create an alias for future matching
    """
    # Get payment
    payment = db.query(PaymentRaw).filter(PaymentRaw.id == payment_id).first()
    if not payment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Payment not found"
        )
    
    if payment.matched:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Payment is already matched"
        )
    
    # Get driver
    driver = db.query(Driver).filter(Driver.id == data.driver_id).first()
    if not driver:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Driver not found"
        )
    
    # Update payment
    payment.driver_id = driver.id
    payment.matched = True
    
    # Create ledger entry
    ledger_entry = Ledger(
        driver_id=driver.id,
        type='credit',
        amount=payment.amount,
        description=f"{payment.source.value.upper()} payment from {payment.sender_name}",
        reference_id=payment.id,
        created_at=datetime.utcnow()
    )
    db.add(ledger_entry)
    
    # Create alias for future matching
    if data.create_alias and payment.sender_name:
        # Determine alias type based on payment source
        alias_type_map = {
            'zelle': AliasType.zelle,
            'venmo': AliasType.venmo,
            'cashapp': AliasType.cashapp,
            'chime': AliasType.chime,
        }
        alias_type = alias_type_map.get(payment.source.value, AliasType.zelle)
        
        # Check if alias already exists
        existing_alias = db.query(Alias).filter(
            Alias.alias_value == payment.sender_name
        ).first()
        
        if not existing_alias:
            new_alias = Alias(
                driver_id=driver.id,
                alias_type=alias_type,
                alias_value=payment.sender_name,
                created_at=datetime.utcnow()
            )
            db.add(new_alias)
    
    db.commit()
    db.refresh(payment)
    
    return payment


@router.get("/{payment_id}", response_model=PaymentResponse)
def get_payment(
    payment_id: UUID,
    db: Session = Depends(get_db),
    current_user: Staff = Depends(get_current_user)
):
    """Get a single payment by ID."""
    payment = db.query(PaymentRaw).filter(PaymentRaw.id == payment_id).first()
    if not payment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Payment not found"
        )
    return payment
