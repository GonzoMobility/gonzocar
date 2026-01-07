"""
Gmail API Service

Connects to Gmail API to fetch payment notification emails.
Requires OAuth credentials from Google Cloud Console.

Setup:
1. Create project in Google Cloud Console
2. Enable Gmail API
3. Create OAuth 2.0 credentials (Desktop app)
4. Download credentials.json
5. Run this script once to authorize and get refresh token
"""

import os
import base64
from datetime import datetime, timedelta
from typing import Optional, List
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from googleapiclient.discovery import build

# Gmail API scopes
SCOPES = ['https://www.googleapis.com/auth/gmail.readonly']

# Payment senders to filter emails
PAYMENT_SENDERS = [
    'no.reply.alerts@chase.com',  # Zelle
    'cash@square.com',             # CashApp
    'venmo@venmo.com',             # Venmo
    'alerts@account.chime.com',    # Chime
    'notifications@stripe.com',    # Stripe
]


class GmailService:
    """Gmail API wrapper for fetching payment emails."""
    
    def __init__(self, credentials_path: str = 'credentials.json', token_path: str = 'token.json'):
        self.credentials_path = credentials_path
        self.token_path = token_path
        self.service = None
        self._authenticate()
    
    def _authenticate(self):
        """Authenticate with Gmail API using OAuth."""
        creds = None
        
        # Load existing token
        if os.path.exists(self.token_path):
            creds = Credentials.from_authorized_user_file(self.token_path, SCOPES)
        
        # Refresh or get new credentials
        if not creds or not creds.valid:
            if creds and creds.expired and creds.refresh_token:
                creds.refresh(Request())
            else:
                if not os.path.exists(self.credentials_path):
                    raise FileNotFoundError(
                        f"credentials.json not found at {self.credentials_path}. "
                        "Download from Google Cloud Console."
                    )
                flow = InstalledAppFlow.from_client_secrets_file(
                    self.credentials_path, SCOPES
                )
                creds = flow.run_local_server(port=0)
            
            # Save token for next run
            with open(self.token_path, 'w') as token:
                token.write(creds.to_json())
        
        self.service = build('gmail', 'v1', credentials=creds)
    
    def _build_query(self, since_hours: int = 1) -> str:
        """Build Gmail search query for payment emails."""
        # Time filter
        since = datetime.utcnow() - timedelta(hours=since_hours)
        date_str = since.strftime('%Y/%m/%d')
        
        # Build sender filter (OR between all payment senders)
        sender_queries = [f'from:{sender}' for sender in PAYMENT_SENDERS]
        sender_filter = ' OR '.join(sender_queries)
        
        return f'({sender_filter}) after:{date_str}'
    
    def fetch_emails(self, since_hours: int = 1, max_results: int = 50) -> List[dict]:
        """
        Fetch payment emails from the last N hours.
        
        Args:
            since_hours: Look back this many hours
            max_results: Maximum emails to fetch
        
        Returns:
            List of email data dicts with id, raw content, and metadata
        """
        if not self.service:
            raise RuntimeError("Gmail service not authenticated")
        
        query = self._build_query(since_hours)
        
        try:
            # Search for emails
            results = self.service.users().messages().list(
                userId='me',
                q=query,
                maxResults=max_results
            ).execute()
            
            messages = results.get('messages', [])
            emails = []
            
            for msg in messages:
                email_data = self._get_email_content(msg['id'])
                if email_data:
                    emails.append(email_data)
            
            return emails
            
        except Exception as e:
            print(f"Error fetching emails: {e}")
            return []
    
    def _get_email_content(self, message_id: str) -> Optional[dict]:
        """Fetch full email content by message ID."""
        try:
            message = self.service.users().messages().get(
                userId='me',
                id=message_id,
                format='raw'
            ).execute()
            
            # Decode raw email
            raw_email = base64.urlsafe_b64decode(message['raw'].encode('ASCII'))
            
            return {
                'gmail_id': message_id,
                'raw': raw_email,
                'internal_date': message.get('internalDate'),
            }
            
        except Exception as e:
            print(f"Error fetching email {message_id}: {e}")
            return None
    
    def get_email_by_id(self, message_id: str) -> Optional[bytes]:
        """Get raw email bytes by Gmail message ID."""
        data = self._get_email_content(message_id)
        return data['raw'] if data else None


def setup_oauth():
    """
    Interactive setup for Gmail OAuth.
    Run this once to authorize and generate token.json.
    """
    print("Gmail OAuth Setup")
    print("=" * 40)
    print()
    print("Prerequisites:")
    print("1. Create a project in Google Cloud Console")
    print("2. Enable the Gmail API")
    print("3. Create OAuth 2.0 credentials (Desktop app)")
    print("4. Download credentials.json to project root")
    print()
    
    credentials_path = input("Path to credentials.json [credentials.json]: ").strip()
    if not credentials_path:
        credentials_path = 'credentials.json'
    
    if not os.path.exists(credentials_path):
        print(f"Error: {credentials_path} not found")
        return
    
    try:
        service = GmailService(credentials_path=credentials_path)
        print()
        print("Success! OAuth token saved to token.json")
        print("You can now use the Gmail service to fetch emails.")
        
        # Test connection
        profile = service.service.users().getProfile(userId='me').execute()
        print(f"Connected to: {profile.get('emailAddress')}")
        
    except Exception as e:
        print(f"Error: {e}")


if __name__ == "__main__":
    setup_oauth()
