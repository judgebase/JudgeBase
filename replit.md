# JudgeBase - Expert Judge Platform

## Overview

JudgeBase is a modern static website that connects hackathons with curated expert judges. The platform features a sleek, animated interface with a purple-blue-green gradient design system. The site showcases featured judges and provides external links for judge applications and organizer requests.

## User Preferences

```
Preferred communication style: Simple, everyday language.
Visual appeal: Wants more colorful elements and visual enhancement.
Priority: Ship as SaaS as soon as possible.
Admin functionality: Allow admin control of which judges are displayed/approved.
UI style: topmate.io-inspired modern design with gradients and animations.
```

## System Architecture

### Frontend-Only Architecture
- **Framework**: React with TypeScript
- **Routing**: Wouter (lightweight client-side routing)
- **State Management**: Static data imports (no API calls)
- **Styling**: Tailwind CSS with custom gradient theme
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Build Tool**: Vite for fast development and optimized builds

### Project Structure
- **Static Site**: Pure frontend application with no backend
- **Data**: Static data in `client/src/data/judges.ts`
- **Forms**: External form handling via Teleform
- **Judge Profiles**: Internal routing with `/judges/{slug}` format

## Key Components

### Database Schema
The application uses four main tables:
- **users**: Basic user authentication (username/password)
- **judges**: Comprehensive judge profiles with status tracking
- **hackathons**: Hackathon applications and requirements
- **judge_hackathons**: Many-to-many relationship between judges and hackathons

### API Endpoints
- `GET /api/judges/featured` - Retrieve featured judges for homepage
- `POST /api/judges/apply` - Submit judge applications with file upload
- `POST /api/hackathons/apply` - Submit hackathon requests
- `GET /api/judges/:slug` - Individual judge profiles
- `GET /api/admin/judges` - Admin: Get all judges
- `PATCH /api/admin/judges/:id` - Admin: Update judge status/featured/badges
- `GET /api/admin/hackathons` - Admin: Get all hackathons

### Key Pages
1. **Homepage** (`/`) - Hero section, featured judges, "Be on the Panel" section, value propositions
2. **Apply** (`/apply`) - Judge application form with file upload
3. **Host** (`/host`) - Hackathon organizer request form
4. **Blog** (`/blog`) - Full-featured blog with search and filtering
5. **Pricing** (`/pricing`) - 3-tier pricing plans ($99-$299/month + Enterprise)
6. **Judge Profile** (`/judges/:slug`) - Individual judge showcase pages
7. **Admin** (`/admin`) - Administrative dashboard for judge intake management
8. **Judge Guidelines** (`/judge-guidelines`) - Comprehensive guidelines for judges
9. **FAQ** (`/faq`) - Frequently asked questions with categorized sections
10. **Resources** (`/resources`) - Training materials, templates, and documentation
11. **Support** (`/support`) - Help center with contact forms and system status
12. **API Access** (`/api-access`) - Developer documentation and API information
13. **Find Judges** (`/find-judges`) - Judge discovery and request interface

### Design System
- **Typography**: Inter font family with large, breathable spacing
- **Colors**: Multi-gradient theme with purple-blue-green primary, plus warm (orange-pink-purple), cool (cyan-blue-green), and vibrant (rainbow) variants
- **Animations**: Rainbow glows, floating elements, soft bounces, and enhanced hover effects
- **Layout**: Card-based design with soft shadows, rounded corners, and animated statistics sections
- **Style**: topmate.io-inspired modern UI with backdrop blur effects and professional aesthetics
- **Components**: "Be on the Panel" section, enhanced admin dashboard, comprehensive SEO implementation

## Data Flow

1. **Judge Application**: Form submission → File upload → Database storage → Admin review
2. **Featured Judges**: Database query → React Query caching → Homepage display
3. **Hackathon Requests**: Form submission → Database storage → Admin processing
4. **Judge Profiles**: Slug-based routing → Database lookup → Profile rendering
5. **Admin Management**: Admin can approve/reject judges, set featured status, assign badges
6. **Public Display**: Only approved judges appear in featured section and public listings

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL connection
- **drizzle-orm**: Type-safe database operations
- **@tanstack/react-query**: Server state management
- **wouter**: Lightweight React routing
- **multer**: File upload handling
- **react-hook-form**: Form validation and management
- **@hookform/resolvers**: Form validation with Zod schemas

### UI Dependencies
- **@radix-ui/***: Unstyled, accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **lucide-react**: Icon library
- **class-variance-authority**: Type-safe CSS class management

## Deployment Strategy

### Development Setup
- **Dev Server**: Vite development server with HMR
- **Database**: Neon serverless PostgreSQL
- **File Storage**: Local file system for avatar uploads
- **Environment**: NODE_ENV=development

### Production Build
- **Frontend**: Vite build to `dist/public`
- **Backend**: esbuild compilation to `dist/index.js`
- **Database**: Drizzle migrations via `drizzle-kit push`
- **Static Assets**: Served from Express with Vite-generated assets

### Key Configuration
- **Database URL**: Required environment variable for Neon connection
- **TypeScript**: Strict mode enabled with path aliases
- **ESM**: Full ES module support throughout the stack
- **Replit Integration**: Special handling for Replit environment with development banner

The application follows a modern full-stack TypeScript approach with emphasis on type safety, developer experience, and clean separation of concerns between frontend and backend logic.

## Recent Changes: Latest modifications with dates

### July 16, 2025
- **Successfully completed Replit Agent to Replit environment migration**: Full migration completed with proper security practices and client/server separation
- **Integrated Supabase database**: Connected PostgreSQL database with proper environment variables and connection handling
- **Added Resend email service**: Configured email service with proper API key handling and graceful fallbacks
- **Fixed unhandled rejection errors**: Added comprehensive error handling and database connection testing
- **Cleaned up all mock data**: Removed Sarah Johnson (mock judge) and all sample/static data
- **Verified admin functionality**: Admin panel correctly shows real data from Supabase (0 judges, 0 pending applications)
- **Confirmed judge invitation system**: Email invitations properly use only approved judges from database
- **Updated documentation**: Removed references to mock data and sample entries
- **Connected Supabase database**: Added DATABASE_URL environment variable and pushed all database schemas successfully
- **Fixed unhandled rejection errors**: Resolved database connection issues and server stability problems
- **Implemented stunning landing page revamp**: Complete judge-centric redesign with professional B2B aesthetic
- **Created new homepage components**: Added WhoIsJudgeBaseFor, updated WhyJudgeBase, created HowItWorks, and FinalCTA sections
- **Updated hero section**: Changed from "Find Perfect Judges" to "real judges. real hackathons." with new professional messaging
- **Enhanced visual design**: Added floating colored sections, improved gradients, and enhanced animations for maximum appeal
- **Judge-first positioning**: Shifted from general hackathon brand to professional judge platform with curated expertise focus
- **Improved UI/UX**: Created extremely attractive, appealing design with topmate.io-inspired modern aesthetics
- **Updated SEO and metadata**: Changed page title and descriptions to match new judge-centric positioning

### July 15, 2025
- **Successfully migrated from Replit Agent to Replit environment**: Complete migration with proper security practices and client/server separation
- **Connected to Supabase database**: Configured DATABASE_URL environment variable and pushed all database schemas
- **Removed all sample data**: Eliminated mock profiles from all seeding locations and database
- **Fixed database connection issues**: Resolved Drizzle configuration problems and ensured clean database state
- **Verified application functionality**: Server running on port 5000 with Vite dev server integration
- **Cleaned up development environment**: No sample data seeding in development or production modes
- **Completed comprehensive apply page**: Implemented multi-step form with all specified sections, removed listing fee references
- **Full Supabase backend integration**: Added judge application schema, API endpoints, and file upload functionality
- **React Query integration**: Fixed QueryClient setup for proper form submission and state management
- **Production-ready form validation**: Added Zod schemas, proper error handling, and success states
- **Beautiful responsive design**: Purple-blue-green gradient theme with animations and mobile optimization
- **Fixed Vite server host blocking**: Resolved "Blocked request" error by configuring allowedHosts in Vite dev server
- **Created comprehensive judge profile page**: Implemented full judge profile with hero, about, philosophy, experience, and contact sections
- **Added real judge profile**: Added complete bio, experience, and contact information
- **Fixed Find Judges page**: Added missing Navbar and Footer components
- **API endpoint working**: /api/judges/:slug endpoint properly serving judge data
- **Converted to frontend-only application**: Removed backend dependencies and converted to static data
- **Created all requested pages**: Added Judge Guidelines, FAQ, Resources, Support, API Access pages
- **Updated navigation**: Added proper links to all new pages in navbar and footer
- **Removed sample judges**: Eliminated all mock judge profiles and static data
- **Created comprehensive add-a-judge.md guide**: Detailed instructions for adding new judges to the platform
- **Set up Netlify deployment**: Created netlify.toml and deployment documentation
- **Completed Replit migration**: Successfully migrated from Replit Agent to Replit environment
- **Updated "Judge Guidelines" to "Judging Expectations"**: Replaced with clear, modern content covering what judges do, time commitments, and best practices
- **Removed pricing functionality**: Deleted pricing page, removed /pricing route, and eliminated all pricing references
- **Restructured navbar**: Made "Apply to Judge" the primary CTA button, streamlined navigation to Home, Find Judges, Resources, Apply to Judge
- **Removed partner logos**: Eliminated hardcoded logos (Maximally, Masters' Union, DEVPOST) and replaced with rotating logo carousel
- **Added logo carousel**: Created auto-scrolling placeholder carousel with "Trusted by 500+ hackathons worldwide" message
- **Completed Replit migration**: Successfully migrated project from Replit Agent to Replit environment with clean security practices
- **Updated Judge Guidelines to Judging Expectations**: Replaced generic content with clear, actionable guidance for hackathon judges
- **Cleaned up landing page design**: Reduced clutter, improved mobile responsiveness, and created cleaner visual hierarchy
- **Repositioned logo carousel**: Moved logo carousel to appear directly beneath stats section (200+ Expert Judges, 24hr Response Time, 98% Success Rate)
- **Enhanced mobile optimization**: Improved text sizing, spacing, and layout for better mobile experience across all sections
- **Refined animations**: Reduced excessive sparkle effects and animations for cleaner, more professional appearance
- **Fixed scroll-to-top navigation**: Added automatic scroll to top when navigating between pages
- **Fixed button text visibility**: Resolved "Find Judges" button text display issues with explicit color classes
- **Removed View All Judges button**: Cleaned up Featured Judges section by removing the CTA button
- **Removed API Access functionality**: Completely removed API Access page, route, and navigation links
- **Implemented complete judge approval workflow**: Added admin dashboard with pending, approved, and rejected applications
- **Built judge profile system**: Created /judges/[slug] pages for approved judges with comprehensive profile information
- **Added sample test data**: Created sample-judge-data.md with realistic application examples for testing
- **Supabase integration complete**: Application now fully functional with PostgreSQL database for all judge data
- **Fixed PostgreSQL connection**: Resolved duplicate key errors and database seeding issues
- **Production-ready admin system**: Admin can approve applications to automatically create judge profiles
- **Fixed all critical issues**: Resolved form submission payload errors, added admin authentication, fixed duplicate slug generation
- **Added comprehensive admin features**: Edit applications, secure login/logout, judge profile viewing, unique slug generation
- **Increased form limits**: Extended bio and philosophy character limits to 1000 characters to prevent truncation errors
- **Made homepage dynamic**: Featured judges section now connects to backend API instead of static data
- **Fixed duplicate profile links**: Admin panel now uses correct slugs for judge profile links
- **Removed static judge data**: Eliminated all hardcoded judge profiles and problematic static content
- **Cleaned up backend**: Removed users table and authentication system, using hardcoded admin access
- **Full admin functionality**: Featured judges toggle, judge removal, and comprehensive application management working
- **Implemented hackathon host flow**: Created comprehensive /host page with 5-section intake form for hackathon organizers
- **Added hackathon database schema**: Created hackathons and judge_hackathons tables with complete field coverage
- **Built hackathon admin management**: Added admin dashboard tab for reviewing, approving, and rejecting hackathon applications
- **Completed hackathon API endpoints**: Full CRUD operations for hackathons, status updates, and judge invitation system
- **Added judge invitation framework**: Database structure and API endpoints ready for connecting judges to approved hackathons