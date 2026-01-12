Lead Solo Developer (React Native/Expo) – High-Security Private Fleet & P2P Automation
Mobile App Development Posted Dec 20, 2025
Upwork Job Posting: Lead Solo Developer (v4.0)
Title: Lead Solo Developer (React Native/Expo) – High-Security Private Fleet & P2P Automation ($4.5k | Roadmap: $11-14k)
Job Description:
I am seeking a world-class independent solo developer to build XYZ, a high-fidelity car-sharing platform. We are launching as a "Closed-Loop" private fleet, but the architecture must be built for a seamless transition to a "Public User Discovery" marketplace in the future.
The Expectation: Total Ownership. I need a technical partner who handles the hardware (Ruptela), API (Smartcar/HireShield), and custom payment logic with minimal supervision. You should be an expert in modular architecture—someone who writes clean, scalable code that can be toggled from "Private Assignment" to "Public Search" without a rewrite.
This is a long-term partnership. We are starting with Phase 1 (The MVP Foundation) for a fixed price of $4,500 USD. Upon successful, bug-free launch and a 90-day stability period, the developer will proceed to the full-featured Enterprise Build roadmap (V.x) with a total projected budget of $11,000 – $14,000 USD, and the possibility of a long-term partnership or employment with the company.
Note: A 12-page exhaustive SRS with defined technical architecture is ready for shortlisted candidates. We have a clear roadmap from MVP to a 125+ feature Enterprise Build.
Technical Stack & Role:
Frontend: React Native / Expo (Universal build for Web, iOS, and Android).
Backend: Firebase (Auth, Firestore, Cloud Functions).
Telematics: Dual-integration with Smartcar API (commands) and Ruptela (GPS/Ignition hardware).
Driver/Renter Data: Integration with Argyle Gig Economy Employment/earnings:https://argyle.com/industries/gig-economy/
Vibe Coding & UI/UX: Proficiency with AI-augmented tools (Cursor/Windsurf/v0) is required for rapid versioning and AI-powered UI/UX design. We are not using generic templates; you will use AI tools to create a custom, premium aesthetic based on high-end references (e.g., Tesla, Rivian).
Technical Liaison: You are responsible for all technical communications with Ruptela and Smartcar support. You will manage API keys, webhooks, and troubleshooting autonomously.
Strategic Technical Revisions:
Hybrid Discovery Engine: Build a modular map component. In "Private Mode," users see only assigned cars. In "Public Mode," the app activates a radius-based search and location of the full fleet.
HireShield Hybrid Gate: Integrate HireShield API for 30-second background checks, with an Admin toggle to switch between Auto-Approval and Manual Review.
P2P Payment Automation: Build a backend Email Listener/Parser (Mailgun/SendGrid) to verify Zelle, CashApp, and Venmo payments and auto-trigger vehicle access.
Dual-Telematics Logic: Smartcar for commands (Lock/Unlock) and Ruptela for "Source of Truth" data (GPS, 50ft Proximity Enforcement, and Ignition Status).
The "XYZ 30" MVP Feature Set:
Hybrid Identity Gate: Master toggle for HireShield Auto-Clear vs. Manual Admin Approval.
Zip-Code Blacklist: Logic to auto-flag or block users based on their ID address location.
Modular Map View: Current mode: Private Assignment (User sees 0 pins until Admin assigns a car).
Marketplace Ready: Architecture must support "Public Mode" radius search as a future toggle.
Tiered Fleet Access: Restrict luxury models based on Admin-assigned Risk Tiers.
P2P Payment Webhook: Backend parser for Zelle/CashApp/Venmo email verification.
Anti-Spoofing Protocol: Strict SPF/DKIM validation for payment emails.
Stripe Capture: Credit card tokenization for "Damage Authorizations" only.
Smart Maintenance Queue: Staff map showing only cars tagged for cleaning/service.
Auto-Cleaning Trigger: Car status flips to "Needs Cleaning" immediately post-trip.
Staff Master Key: Universal "Unlock" for maintenance roles.
Smartcar Relay: Execution of commands via API.
Ruptela Proximity Check: Hard-block "Unlock" if user is more than 50ft from the vehicle.
Ignition Detection: Real-time state via Ruptela hardware.
Odometer/Fuel Sync: Readings captured at the start and end of every rental.
Station Information: Specific parking details revealed only after car assignment.
Instant Reservation: 15-minute hold timer for users walking to the car.
Command Black-Box: Immutable Firestore log of every user/staff hardware interaction.
Insurance Delay Timer: Forced 5-minute safety countdown post-payment.
Active Trip Dashboard: Live rental stats (time and mileage) during the trip.
End-Trip Checklist: User confirmation of windows, keys, and interior condition.
Hardware Geofencing: Real-time alerts if a car leaves the operational zone.
Admin Remote Override: Master "God Mode" to lock/unlock any fleet vehicle.
Multi-Tenant Ready: Schema must include companyID to support future white-labeling.
Biometric Entry: FaceID/TouchID required to access digital keys.
OTP Login: Secure SMS-based authentication.
ID Upload & OCR: Multi-step secure document capture.
Trip History: Secure log of past rentals and payments for the user.
Emergency SOS: One-tap button to call support.
Push Notifications: Deep-linked alerts for assignments, payments, and returns.

Compensation & Milestones ($4,500 Phase 1)
Milestone
Deliverable
Payout
M1
Identity Gate, HireShield, & Zip-Code Blacklist Logic
$450
M2
Hybrid Engine (Private/Public Toggle) & Staff Queue
$550
M3
Digital Key UI & Dual-Telematics (Smartcar/Ruptela) Setup
$450
M4
Security: Biometrics, Proximity, & Insurance Timer
$450
M5
Logic Peak: Full Trip Lifecycle & Email Payment Parsing
$1,200
M6
Mobile Optimization & Push Notifications
$450
M7
Store Approval & 90-Day Stability Sign-off
$950

Application Requirement:
Start your proposal with "APP SOLO". Answer the screening questions, and list two React Native apps you have personally launched. If you don’t have verified launches, state your alternative experience (e.g., enterprise/internal systems). Confirm you are willing to take total project ownership and manage technical communications with our team and 3rd party vendors with minimal founder intervention.
Note: This posting may close and interviews begin 10-14 days after posting.

-----

Friday, Dec 26, 2025
Andrii Serhiienko
2:51 PM
APP SOLO



Building a car-sharing platform that needs to scale from private fleet to public marketplace requires getting the architecture right from day one - otherwise you're looking at a painful rewrite when it's time to flip that toggle.



I build production React Native/Expo applications using AI-augmented development (Cursor, Claude). My app AnyFilm is live on both App Store and Google Play - Firebase Auth, Firestore, Cloud Functions, real-time WebSocket features, multi-provider authentication. 53,000+ lines of TypeScript with clean, modular architecture.



Your project resonates with my car industry experience. I've built systems for Car Haul Direct and Eclipse Group handling vehicle tracking, payment automation, and complex business logic. The dual-telematics approach (Smartcar for commands, Ruptela for source-of-truth) makes perfect sense architecturally.



Latest React Native apps I've personally launched:
- AnyFilm (App Store + Google Play) - AI-powered movie discovery with real-time collaborative features
Production: https://apps.apple.com/id/app/anyfilm/id6749828442



For your XYZ platform, I'd architect:
- Firestore collections with companyID and accessMode flags from day one
- Clean separation between assignment logic and discovery logic
- Modular telematics layer abstracting Smartcar/Ruptela behind unified interface
- Secure payment verification with strict SPF/DKIM validation



Your 12-page SRS sounds thorough - exactly how I prefer to work. Clear specs mean fewer iterations and cleaner code.



What's your target timeline for M1 delivery?



I'm ready to take full ownership of Phase 1 through the 90-day stability period and the Enterprise Build roadmap. Happy to manage all technical communications with Ruptela, Smartcar, and HireShield teams independently.



Please check my detailed automation case studies in the showcases below.



Best,
Andrey

View details
AnyFilm App - App Store
Download AnyFilm by Andrii Serhiienko on the App Store. See screenshots, ratings and reviews, user tips and more games like AnyFilm.
App Store
Jason Jon
2:51 PM
Hello Andreii,
Thanks for your thoughtful response and bid.
I am in Thailand now but based in Miami. I will likely be here for the next month.
We can start a short chat here if you'd like but look forward to a call perhaps in the coming week or so.
I need to update the 12-page SRS before sharing. Also, an NDA will be required at some point.
I am in Thailand now but based in Miami/Chicago.



Best,



Jason

Andrii Serhiienko
2:55 PM
Hey Jason, thanks for your answer!

Oh, cool, I was in Bangkok for a month this summer, it was great

I'll wait, no rush
Just let me know when you're ready

And sure NDA works for me, thats classic 🙂

You don't need to worry about the time zone as well
I work with clients from the US, so it's fine for me. I'm available almost anytime

Totally understand if you need more time with SRS, but if I'm your pick, I'd love to kick off the contract when you're ready - mainly so I can lock in availability for you and put other requests on hold

Jason Jon
3:16 PM
Great. Tell me about this firm: architeq.io I take it this is your brand and firm?

Architeq | Business Process Automation
Business process automation solutions for small and medium businesses. We specialize in CRM integration, document automation, and AI solutions to streamline your operations.
Architeq
Andrii Serhiienko
3:18 PM
Yeah, that’s my small agency
Sometimes I working additionally with automation engineers as well

If we talking about mobile app - here I working solo

Jason Jon
3:32 PM
The project is integration heavy. I do like your business process experience. We have been in business 7 years, and this project is, in many ways, an "automation" process to fully automate (or come as close as we can) the car rental experience in a way that no one has done before.

or I should say, "no other company has been able to achieve" such a level.

Andrii Serhiienko
3:39 PM
Yes, my engineers and I have extensive experience specifically in complex integrations. One of the reasons for this is that after my "colleagues" from India, everything has to be redone, often from scratch. Honestly, digging through code and no-code isn't the most pleasant experience. That's why our focus is most often on complex integrations. And you can also see among my cases exactly what you need, I believe.
Car Haul Direct and Lanewise - if we're talking specifically about the car hauling industry.
Or if we're talking about just complex integration in general, you can check out the case with SQEAK E CLEAN - a music production company that has studios all over the world



I can't send you a links before contract starting, upwork can kick me from platform for that lol

In general, I mean that we like to take full responsibility, rather than just small parts of the whole process

Jason Jon
3:55 PM
What is your experience with REST-API integration?

Andrii Serhiienko
3:57 PM
I think more than anything else, to be honest
Since all the automations you see in my cases are most often built on Make and Zapier, which involves direct use of the API and all related tools

One of hardcore example in Make:

Drew's Screenshot2025-12-26 at 15.59.31@2x.png 
Drew's Screenshot2025-12-26 at 15.59.31@2x.png
This scenario is creating an invoice triggered from the CRM
First, an employee enters the data (another scenario calculates everything), then changes the status - and this scenario creates the invoice, which gets sent back to the CRM, all through API and webhooks

Jason Jon
5:05 PM
Ok but know that I don’t want to use Zapier
or Make for every integration. As the business scales, the zapping costs will go up significantly. I prefer a nice balance between custom integrations and Make.

Andrii Serhiienko
5:09 PM
Easy to build, Jason

Totally understand you

Jason Jon
5:10 PM
Ok, I have a specific integration I want you to handle as a first project. If this goes well, I’ll share the full SRS for my enterprise mobility app.
The Task: Payment Parser & Attribution Engine

1. Extraction: Use Gmail API to parse Zelle, Venmo, CashApp, and Chime emails (using anchor-based logic so it doesn't break if layouts change).
2. Automated Matching: Create an 'Alias Table' that matches payment handles to Driver IDs. If a match exists, post the JSON to the ledger automatically.
3. Manual Review UI: If no match is found, send the data to an 'Unrecognized' bucket. I need a simple interface (dropdown/button) where I can:
• Assign the payment to a Driver from a list.
• Save that sender-to-driver link so future payments from them are automated.
• Delete/Clear extraneous or non-business payments.
4. Portability: Build this as a clean Python service so I can move this entire logic (and the Alias database) to my standalone app later.
I’m looking to get this engine and the simple review logic built for $250.

Andrii Serhiienko
5:11 PM
One of my clients recently abandoned no-code solutions entirely and switched completely to custom solutions

Jason Jon
Dec 26, 2025 | 5:05 PM
Ok but know that I don’t want to use Zapier
or Make for every integration. As the business scales, the zapping costs will go up significantly. I prefer a nice balance between custom integrations and Make.

Show more
Ok, let’s do
Make an offer for me, let’s start
I need the access for all of tools

Jason Jon
Dec 26, 2025 | 5:10 PM
Ok, I have a specific integration I want you to handle as a first project. If this goes well, I’ll share the full SRS for my enterprise mobility app.
The Task: Payment Parser & Attribution Engine

1. Extraction: Use Gmail API to parse Zelle, Venmo, CashApp, and Chime emails (using anchor-based logic so it doesn't break if layouts change).
2. Automated Matching: Create an 'Alias Table' that matches payment handles to Driver IDs. If a match exists, post the JSON to the ledger automatically.
3. Manual Review UI: If no match is found, send the data to an 'Unrecognized' bucket. I need a simple interface (dropdown/button) where I can:
• Assign the payment to a Driver from a list.
• Save that sender-to-driver link so future payments from them are automated.
• Delete/Clear extraneous or non-business payments.
4. Portability: Build this as a clean Python service so I can move this entire logic (and the Alias database) to my standalone app later.
I’m looking to get this engine and the simple review logic built for $250.

Show more
Jason Jon
5:12 PM
eventually, I wanna migrate our base 44 app to our our own server and then continue building on it from there. If we decide we’re gonna keep that part of our business or just scrap it for what we’re going to do in the enterprise build.

Jason Jon removed this message

Andrii Serhiienko
5:12 PM
Know that tool as well

Jason Jon
Dec 26, 2025 | 5:12 PM
eventually, I wanna migrate our base 44 app to our our own server and then continue building on it from there. If we decide we’re gonna keep that part of our business or just scrap it for what we’re going to do in the enterprise build.

Show more
Jason Jon
5:14 PM
OK, let me get a few things put together and I will send you an offer perhaps later today or at the latest tomorrow

Andrii Serhiienko
5:30 PM
Perfect, thanks!

Saturday, Dec 27, 2025
Andrii Serhiienko
7:25 PM
Hey Jason, just a friendly reminder about our test task
Thanks!

Jason Jon
8:08 PM
Yes, I’m putting together the specifications. It’s going to be a wake up that I want you to build, which is one of the components of the MVP .



Please give me some till the end of the day tomorrow to send it over to you along with the offer



Thanks

Andrii Serhiienko
8:44 PM
Sure, take your time!

Don’t take it personally - one of my responsibilities when working is to stay visible, so I’m just reminding about myself :)

Sunday, Dec 28, 2025
Jason Jon
11:16 PM
I won’t. . I’m still working on it. I will get it to you shortly. Busy day today.

Andrii Serhiienko
11:17 PM
Hey Jason, no problem
Thanks for update and clear communication
Looking forward for the task

Monday, Dec 29, 2025
Jason Jon updated an offer

8:55 PM
1. EXECUTIVE SUMMARY:



Build a hosted stand alone application that does the following for GonzoCar's current operations:



1) Create Driver Payment Ledger that automatically recognizes payments from confirmation emails
2) Automate the "approved driver" process by auto-importing application data into a Driver Ledger at the click of a button called "Onboard"
3) Integrate OpenPhone(Quo)API with the application so that the application can use Quo to send auto text messages and driver communications to drivers without having to build a Twillio.



Gonzo Core is a "Headless" Fleet Mini-ERP designed to automate the driver lifecycle. It connects your website, payment notifications, SMS communications, driver ledgers into one central engine.
The Lifecycle Journey:
Staging: Applications from Fluent Forms land in the Staging Queue. Staff vet drivers using Internal Staff Comments.
Communication: Staff sends manual Approved, Decline, Hold, or Onboard messages via a "Send" modal (Auto-sending only for Approved Drivers, the others are manual send).
Activation: Onboard Button creates a Master Profile and Ledger.
The Match & Bucket System: * Extraction: Gmail API scans Zelle, Venmo, CashApp, and Chime.
Matching: The engine checks the Alias Table (Linking "Mary Smith" to "Driver John Doe").
The Fork: Matches post instantly; non-matches go to the Unrecognized Bucket for manual assignment and "learning."
Enforcement: Nightly debits are applied. If a balance hits the 2-day/48-hour late mark, the OpenPhone API sends an automated SMS.



2. DATABASE SCHEMA & DATA BLUEPRINT
Table: Payment_Aliases (The "Learning" Engine)
This table allows the system to recognize that different handles belong to one driver.
Column Name
Data Type
Description
alias_id
UUID (PK)
Unique identifier.
driver_id
UUID (FK)
Links to the Driver Profile.
platform
String
Zelle, Venmo, CashApp, or Chime.
handle_value
String (Unique)
e.g., @SpeedyDriver, 555-0199.
auto_approve
Boolean
If TRUE, skip the review bucket for this handle.



The Transaction JSON Schema:
The backend must process all incoming payments using this structure:
JSON
{
"transaction_id": "CHASE_12345ABC",
"source_platform": "Zelle",
"raw_sender_identifier": "mary.smith@email.com",
"detected_handle": "Mary Smith",
"amount": 450.00,
"currency": "USD",
"timestamp": "2023-10-27T10:30:00Z",
"status": "pending_attribution",
"internal_driver_id": null,
"raw_email_body": "..."
}
Logic must be built to make sure no duplicate payments are recorded.



3. CORE FUNCTIONAL MODULES
A. Applicant Tracking System (ATS)
Internal Staff Comments: A private, threaded audit trail for vetting discussion.
Communication Modals: Manual "Send" buttons for Hold/Decline messages.
Decision Actions: Approve, Hold, Decline (6 Reasons), and Delete.
B. Financial Ledger & Payments
Midnight Billing Cron: Nightly debits based on Daily/Weekly rates.
Stop/Resume Billing: A global toggle on each profile to pause/start charges.
The 60% Rule: Hard-coded logic preventing Stripe payments under 60% of the balance.
Unrecognized Bucket UI: A dropdown tool to link unknown payments to a driver and save the link to the Alias Table.
C. Operations & SMS
Driver Profile: Identity (Name/DOB/Address), viewable License Upload, and a General Notes area for ongoing history.
OpenPhone API: Automated Late SMS alerts + Manual "Send Text" button on the profile.
Reporting: Aggregate tables for instant Daily/Weekly/Monthly totals by State (CA/IL).



4. INSTRUCTIONS FOR THE DEVELOPER
"Build this as a headless API using Python/FastAPI. The frontend should be a clean React dashboard.
Alias Logic: Use the provided schema so one driver can have multiple payment aliases.
Review Bucket: Build a UI that lets me link 'Unrecognized' payments and 'Save' that link to the Alias table for future automation.
Mobile Ready: This backend must be ready to serve an iOS/Android app.
Enforcement: The 60% Stripe floor and OpenPhone SMS triggers must be handled at the API level.
Security: Encrypt all PII (DOB/Address). Use Latin filler (Lorem Ipsum) for all initial communication template

Est. Budget: $300.00

Milestone 1: Architecture

Due: Saturday, Jan 3, 2026

Project funds: $50.00

View offer
Jason Jon
9:03 PM
Andrii, attached here is a "sample" interface of what the app might look like. Feel free to use as many Ai tools as you wish but this must be a stand alone app hosted on our hosting. I have all the logins and passwords ready for you to get started. Note: Think about how what you build here can be used for the payments script for the MVP. I'm here if you need me. In the meantime, if you want to see what we have been playing around with in Base 44, you can login using: rentgonzo@gmail.com. P. Build2026$ under GonzoFleet. Looking forward, Jason

Sample Interface.png 
Sample  Interface.png
Andrii Serhiienko
9:31 PM
Hey Jason,
Thanks for sending over the detailed spec. I want to make sure I understand correctly.



The document you shared describes a full Mini-ERP system: ATS with staff comments and decision workflows, Financial Ledger with midnight billing cron, Stripe 60% rule, OpenPhone SMS automation, React dashboard, Gmail parsing for 4 platforms, plus reporting by state. This is a production-grade application, not a test task that we agreed on.



I'm wondering if there might be a mix-up - perhaps you sent the full Gonzo Core specification instead of the scoped-down Payment Parser we discussed earlier?
If you'd like to proceed with the original test task (Gmail API parsing + Alias Table + simple Review UI), I'm ready to start at $250-300 as we discussed. If you actually need the full Gonzo Core system, I'd be happy to work on it, but we'd need to revisit the budget accordingly



What works better for you?

Tuesday, Dec 30, 2025
Jason Jon
3:13 PM
HI Andrii,



Yes, I made a mistake. It’s not an actual ERP that I need, but given a deeper review of my requirements, a simple script connected to Base 44 is not going to be what I need either.



What I actually need is the Gonzo Core: A standalone, headless engine that will serve as the permanent foundation for the future iOS/Android apps.



Because this is the foundation for the larger mobile project, I want to treat this first build as a 'Phase 1' milestone. My budget for this engine is $450. I have scaled back some of the required features , and have attached the full Phase 1 Specification.



I want to be transparent: I haven’t made a final decision on who will build the full iOS/Android MVP yet. I need to see the quality of this backend architecture and the accuracy of the parsing first. This build is essentially the 'test run' to see if we are a good fit for the bigger project.



I understand if the $450 doesn’t work for you. If that’s the case, I’ll need to put this specific scope out to bid on Upwork. With the AI tools available now like Cursor and Bolt.new, I’m confident I can find a developer to hit this price point—and likely include more reporting—just to win the opportunity for the mobile contract later.



However, I’d prefer to start with you so the logic remains consistent from Day 1. Take a look at the attached spec and let me know if we can get this engine built for $450 as our first milestone. GonzoCore: https://docs.google.com/document/d/1DAsWRxGMsV5ybi-bZ4BDm3ru8CEGsqwXOPYrM16ePSo/edit?usp=sharing

Bolt AI builder: Websites, apps & prototypes
bolt.new
Wednesday, Dec 31, 2025
Andrii Serhiienko requested changes to an offer

10:01 AM
Est. Budget: $450.00

Milestone 1: Phase 1

Due: Friday, Jan 16, 2026

View request
Jason Jon withdrew an offer

1:33 PM
Offer changed

Reason: This offer was replaced by another one

View offer
Jason Jon approved the requested changes and sent an updated offer

1:33 PM
Project Specification: Gonzo Core (Phase 1 Foundation)
Project Type: Standalone Backend & Admin Portal
Target Budget: $450
Strategic Goal: Build the "Headless" Engine to power the future iOS/Android MVP.
1. The Scope of Work
Module A: Applicant Routing (The Intake)
Bridge: Ingest data from Fluent Forms via Webhook.
Vetting Hub: A dashboard queue for staff to review apps.
Staff Interaction: An internal threaded comment system for vetting notes.
Decision Triggers: * Approved: Automatically triggers the "Onboarding" flow (Ledger creation).
Hold / Decline / Onboard: Opens a manual modal to review and send a custom message via OpenPhone/Email.
Module B: Payment Automation (The Brain)
Extraction Layer: Gmail API integration to parse Zelle, Venmo, CashApp, Chime and Stripe (you can parse the email or connect to their API)
The Match & Bucket System: * Alias Table: Database logic to link payment handles (emails, phone numbers, tags) to Driver IDs.
Unrecognized Bucket: A UI list to manually "Assign & Save" unknown payments to drivers, updating the Alias Table for future automation.
The Ledger Engine: * Midnight Cron: Automated nightly Daily/Weekly debits.
Billing Toggles: "Stop/Resume Billing" switch on every profile.
Enforcement: Automated OpenPhone API SMS triggers for balances $\ge$ 2 days (Daily) or 48 hours (Weekly) late.



2. Technical Execution Considerations
Architecture: Consider a Headless REST API (e.g., FastAPI/Python). All logic should be reusable for future mobile frontends.
Database: PostgreSQL with AES-256 encryption for PII (DOB/Addresses). No passwords stored on file.
UI Preference: Minimalist Admin Dashboard. You are encouraged to use AI scaffolding (Bolt/Cursor) to expedite frontend delivery, focusing effort on Integration Logic and API stability.

Est. Budget: $450.00

Milestone 1: Phase 1

Due: Friday, Jan 16, 2026

Project funds: $450.00

View offer
Saturday, Jan 03
Jason Jon
2:25 PM
Hello Andrii,
Did you wanna plan on getting started on Monday?

Andrii Serhiienko
2:42 PM
Hey Jason, no
Will start today-tomorrow
Can I get access to all tools? Fluent Forms, gmail etc?

Andrii Serhiienko
2:50 PM
Critical Requirements Before Development Start:



1. Credentials
- Gmail account credentials for payment parsing (OAuth setup)
- OpenPhone API key
- Fluent Forms webhook URL and field structure



2. Sample Data (Blocks Development)
- 3-5 sample emails from each payment source: Zelle, Venmo, CashApp, Chime, Stripe
- Existing driver database export



3. Business Logic Clarification
- Staff authentication method: Google OAuth, magic link, or other? (spec says "no passwords stored")
- Billing amounts: fixed rate for all drivers or individual?
- Timezone for midnight cron job?
- SMS templates for late payment reminders



4. Infrastructure
- Preferred hosting (AWS, DigitalOcean, client VPS)?
- Domain for admin panel?

Jason Jon
11:18 PM
Sure, I’m happy. I have all of this ready for you. I need you to just please accept the contract and I’ll give you the logins.

I’m not showing an acceptance on your side so once you do that, I’ll send you the link

Sunday, Jan 04
Andrii Serhiienko accepted an offer

12:28 AM
Ready to get the credentials and answers

View contract
Jason Jon
12:35 AM
GonzoFleet Base 44 Application
App.base44.com



rentgonzo@gmail.com
Build2026$



For Payment Confirmation Emails
Gonzobilling @gmail.com



PayGonzo2026!
Stripe - will email developer credentials.



For Applicant Emails
gonzoforms@gmail.com
Approve2026



Open phone (Quo)
www.openphone.com
rentgonzo@gmail.com
Developer21
Use line 312 300 2032 for the SMS testing



Hosting
You can use these direct links to log in to Name Cheap hosting
cPanel:
https://cpanel-s254.web-hosting.com



gonzzwmf
HostMeTonight2025!@#-+



Wordpress Backend Login
https://gonzocar.com/wp-login.php?loggedout=true



Login: GonzoCar
P: SiWZvDf3p7npSTU



Stripe Api Sandbox
Access will be sent to your email. Please provide.

Base44
Build useful apps, fast
Gmail
Gmail is email that’s intuitive, efficient, and useful. 15 GB of storage, less spam, and mobile access.
Quo (formerly OpenPhone) | Best Phone System for Startups & Small Businesses
Quo brings your calls, texts, and contacts together in one AI-powered shared space. Keep your team aligned, respond faster, and ensure every customer feels valued.
Andrea wants you to log into the base 44 you’ll get an idea of how we’re doing things now you can see that set up and how we’re doing the manual payments by looking at the emails and then inputting them in the driver’s file. Every driver is different. Their rate is different.



For any email SMS just use Latin text for right now with the subject being in the text



For instance, your payment is late. Please make your payment as soon as possible today by 12 o’clock noon something like that and then we’ll go ahead and give you the actual template later.

Andrii Serhiienko
12:37 AM
hi@architeq.io

Jason Jon
12:38 AM
OK, I’ll do it tomorrow when I login. I’ll send you the stripe.

so for the staff authentication method, you can save passwords. It’s not an issue.



for the flu and forms Web hook you’ll need to get that from the back end of the WordPress site where the form is integrated



If you can’t find it there, we’ll have to have you chat with support



For the openPhone API, try logging into our account and see if you can find it in there. Otherwise you’ll have to contact support.

I will not be able to answer any further questions until tomorrow. Thank you.

Tuesday, Jan 06
Andrii Serhiienko
4:33 PM
Hey Jason!
gmail gonzobilling:

Drew's Screenshot2026-01-06 at 16.32.49@2x.png 
Drew's Screenshot2026-01-06 at 16.32.49@2x.png
I clicked "Try another way" > "Password"
And password not working as well

Drew's Screenshot2026-01-06 at 16.34.47@2x.png 
Drew's Screenshot2026-01-06 at 16.34.47@2x.png
Gonzoforms gmail - same but different

Drew's Screenshot2026-01-06 at 16.36.17@2x.png 
Drew's Screenshot2026-01-06 at 16.36.17@2x.png
Jason Jon
4:55 PM
Password code.pdf 
Password code.pdf
15 kB
Reach

Jason Jon
5:24 PM
Try this: GonzoBilling@gmail.com
PayNow2026!



GonzoForms@gmail.com
Forms2026
