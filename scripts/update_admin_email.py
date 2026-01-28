import sys
import os

# Add parent dir to path to import app
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.database import SessionLocal
from app.models import Staff
from app.core.security import hash_password

def update_admin():
    db = SessionLocal()
    try:
        # Find old admin
        old_email = "admin@gonzofleet.com"
        new_email = "admin@gonzocar.com"
        
        staff = db.query(Staff).filter(Staff.email == old_email).first()
        
        if staff:
            print(f"Found admin with email: {staff.email}")
            staff.email = new_email
            
            # Optional: Reset password if needed (uncomment if user wants hard reset)
            # staff.password_hash = hash_password("admin123") 
            
            db.commit()
            print(f"✅ Successfully updated admin email to: {new_email}")
        else:
            # Check if new email already exists
            new_staff = db.query(Staff).filter(Staff.email == new_email).first()
            if new_staff:
                print(f"⚠️  Admin with email {new_email} already exists.")
            else:
                print(f"❌ Could not find admin with email {old_email}")
                
    except Exception as e:
        print(f"Error: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    update_admin()
