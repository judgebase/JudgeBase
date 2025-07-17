# Environment Setup for JudgeBase

## For New Contributors Importing to Replit

When you import this project to Replit, follow these steps:

### Step 1: Add Environment Variables

In Replit, click the **"Secrets"** tab (🔒) in the sidebar and add these variables:

#### Required - Supabase Database
```
DATABASE_URL = "postgresql://user:password@host:port/database"
SUPABASE_URL = "https://your-project.supabase.co"
SUPABASE_ANON_KEY = "your-anon-key-here"
SUPABASE_SERVICE_ROLE_KEY = "your-service-role-key-here"
```

#### Optional - Email Service
```
RESEND_API_KEY = "your-resend-api-key-here"
```

#### Optional - Admin Settings
```
ADMIN_PASSWORD = "your-custom-admin-password"
SESSION_SECRET = "your-session-secret"
```

### Step 2: Get Supabase Credentials

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Go to **Settings → API**
4. Copy the Project URL and API keys
5. Copy the Database URL from **Settings → Database**

### Step 3: Start the Application

Run the project using the green "Run" button in Replit, or:
```bash
npm run dev
```

### Step 4: Test the Setup

- Visit `/admin` (login: admin / judgebase2024)
- Visit `/judging` (test login: test@judgebase.com / TestJudge123!)

## Alternative: Interactive Setup

Run this command in the Replit Shell:
```bash
node setup-env.js
```

This will walk you through setting up all environment variables interactively.

## Troubleshooting

- **Database Connection Error**: Check your DATABASE_URL format
- **Authentication Issues**: Verify SUPABASE_URL and API keys
- **Judge Access Denied**: Make sure you have approved judges in the admin panel

## Support

If you need help, check the console logs or create an issue in the repository.