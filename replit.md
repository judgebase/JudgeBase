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

### Frontend Architecture
- **Framework**: React with TypeScript
- **Routing**: Wouter (lightweight client-side routing)
- **State Management**: Static data (no server state management needed)
- **Styling**: Tailwind CSS with custom gradient theme
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Build Tool**: Vite for fast development and optimized builds

### Project Structure
- **Static Site**: Frontend-only application with no backend
- **Data**: Hardcoded static data for featured judges
- **Forms**: External form handling via Teleform
- **Judge Profiles**: External links to judgebase.co domain

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