# JudgeBase Setup Guide

Welcome to JudgeBase! This guide will help you set up the project when importing it to Replit.

## Required Environment Variables

Before running the project, you need to set up the following environment variables in Replit:

### 1. Supabase Database (Required)
- `DATABASE_URL` - Your PostgreSQL connection string from Supabase
- `SUPABASE_URL` - Your Supabase project URL (https://your-project.supabase.co)
- `SUPABASE_ANON_KEY` - Your Supabase anonymous public key
- `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key (secret)

### 2. Email Service (Optional)
- `RESEND_API_KEY` - Your Resend API key for sending email notifications

### 3. Admin Access (Optional)
- `ADMIN_PASSWORD` - Custom password for admin panel (default: judgebase2024)
- `SESSION_SECRET` - Secret for session encryption (auto-generated if not provided)

## Quick Setup Steps

1. **Create a Supabase Project**:
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Copy your project URL and API keys from Settings → API

2. **Set Environment Variables in Replit**:
   - Click the "Secrets" tab in your Replit sidebar
   - Add each environment variable with your actual values
   - Or use the automatic setup by running: `npm run setup-env`

3. **Initialize Database**:
   - The database schema will be automatically created on first run
   - Test data will be seeded in development mode

4. **Start the Application**:
   ```bash
   npm run dev
   ```

## Admin Access

- **Admin Panel**: Visit `/admin` after the app is running
- **Default Credentials**: username `admin`, password `judgebase2024`
- **Test Judge**: email `test@judgebase.com`, password `TestJudge123!`

## Need Help?

- Check the console for any error messages
- Ensure all required environment variables are set
- Visit the [Supabase documentation](https://supabase.com/docs) for database setup help

## Features

- Judge application system with admin approval
- Hackathon management and judge invitations
- Authenticated judging dashboard
- Responsive design with modern UI
- Email notifications (when configured)

Happy building! 🚀