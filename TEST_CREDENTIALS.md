# Working Test Credentials for JudgeBase

## Test Account Details

**Email:** test@judgebase.com  
**Password:** TestJudge123!

## How to Test the /judging Page

1. **Navigate to /judging** in your browser
2. **Enter the credentials above** in the login form
3. **You should see the judge dashboard** with hackathons listed

## If Login Fails

The system uses Supabase Auth for authentication. If you get an "invalid API key" error, it means:

1. The Supabase environment variables might not be properly loaded
2. There could be a mismatch between the frontend and backend Supabase configuration

## Alternative Test Method

You can also test the system by:

1. **Going to /admin** (admin panel)
2. **Creating a new judge application** 
3. **Approving it** - this will trigger the automatic password generation
4. **Using the generated credentials** to test the /judging page

## System Features to Test

Once logged in to /judging, you can test:

✅ **Dashboard View** - See approved hackathons  
✅ **Express Interest** - Click buttons to show interest  
✅ **Contact Organizer** - Email links to hackathon organizers  
✅ **Responsive Design** - Works on mobile and desktop  

## Admin Password Generation

The key feature I built is the automatic password generation system:

1. When admin approves a judge application
2. System generates a 12-character secure password
3. Creates Supabase Auth user account
4. Displays credentials in a modal for admin
5. Admin can copy/share credentials with the judge

This streamlines the onboarding process so judges get immediate access to the /judging dashboard.