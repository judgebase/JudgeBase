# Test Account for JudgeBase Judging System

## Quick Test Account

For immediate testing of the /judging page, you can use one of these existing approved judges:

### Option 1: Rahul Chandra
- **Email:** rahulchandra@pmmeta.com
- **Password:** (You'll need to set this up through the admin panel)

### Option 2: Rishul Chanana  
- **Email:** rishulchanana@maximally.in
- **Password:** (You'll need to set this up through the admin panel)

## Creating a New Test Account

Since the existing judges don't have passwords generated yet, I'll create a new test account:

### Test Judge Account
- **Email:** test@judgebase.com
- **Name:** Test Judge User
- **Role:** Senior Developer @ TestCorp

**Steps to create this account:**
1. The application will be submitted via API
2. Admin approves the application
3. Password is automatically generated
4. Credentials are displayed in admin panel

## Testing the Judging System

Once you have the credentials:

1. Go to `/judging` 
2. Log in with the email and generated password
3. You'll see the judge dashboard with:
   - List of approved hackathons
   - "Express Interest" buttons
   - "Contact Organizer" links
   - Clean, responsive interface

## Admin Panel Testing

To see the password generation in action:
1. Go to `/admin`
2. Log in with admin credentials
3. Navigate to "Applications" tab
4. Click "Approve" on a pending application
5. See the password display modal with generated credentials

The system automatically:
- Creates a 12-character secure password
- Creates Supabase Auth user account
- Stores password in database
- Shows credentials to admin for sharing