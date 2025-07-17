# JudgeBase

A curated platform connecting hackathon organizers with qualified judges.

## Quick Start for New Contributors

When importing this project to Replit, you'll need to set up environment variables:

### 1. Run the setup script:
```bash
node setup-env.js
```

This will guide you through setting up:
- Supabase database credentials
- Email service configuration (optional)
- Admin settings

### 2. Or manually add to Replit Secrets:
- `DATABASE_URL` - Your Supabase PostgreSQL connection string
- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_ANON_KEY` - Public anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Service role secret key
- `RESEND_API_KEY` - (Optional) For email notifications

### 3. Start the application:
```bash
npm run dev
```

## Test Accounts

- **Admin Panel**: `/admin` (username: `admin`, password: `judgebase2024`)
- **Test Judge**: `/judging` (email: `test@judgebase.com`, password: `TestJudge123!`)

## Key Features

- Judge application and approval system
- Hackathon management dashboard
- Authentication with Supabase
- Email notifications with Resend
- Modern UI with Tailwind CSS

## Development

- Frontend: React + TypeScript + Vite
- Backend: Express + TypeScript
- Database: PostgreSQL (Supabase)
- Authentication: Supabase Auth
- Styling: Tailwind CSS + shadcn/ui

For detailed setup instructions, see [SETUP.md](./SETUP.md).