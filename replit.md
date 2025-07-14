# JudgeBase - Expert Judge Platform

## Overview

JudgeBase is a modern web application that connects hackathons with curated expert judges. The platform features a sleek, animated interface with a purple-blue-green gradient design system and provides separate workflows for judges to apply and hackathon organizers to request judges.

## User Preferences

```
Preferred communication style: Simple, everyday language.
```

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Routing**: Wouter (lightweight client-side routing)
- **State Management**: TanStack Query (React Query) for server state management
- **Styling**: Tailwind CSS with custom gradient theme
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **File Upload**: Multer for handling avatar uploads
- **API Pattern**: RESTful API with JSON responses

### Project Structure
- **Monorepo**: Single repository with separate client and server directories
- **Shared Types**: Common schema definitions in `/shared` directory
- **Asset Management**: Separate `/attached_assets` for design assets and briefs

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
- Admin endpoints for managing judge/hackathon statuses

### Key Pages
1. **Homepage** (`/`) - Hero section, featured judges, value propositions
2. **Apply** (`/apply`) - Judge application form with file upload
3. **Host** (`/host`) - Hackathon organizer request form
4. **Judge Profile** (`/judges/:slug`) - Individual judge showcase pages
5. **Admin** (`/admin`) - Administrative dashboard for approvals

### Design System
- **Typography**: Inter font family with large, breathable spacing
- **Colors**: Purple-blue-green gradient theme with CSS custom properties
- **Animations**: Subtle hover effects, fade-ins, and pulse animations
- **Layout**: Card-based design with soft shadows and rounded corners

## Data Flow

1. **Judge Application**: Form submission → File upload → Database storage → Admin review
2. **Featured Judges**: Database query → React Query caching → Homepage display
3. **Hackathon Requests**: Form submission → Database storage → Admin processing
4. **Judge Profiles**: Slug-based routing → Database lookup → Profile rendering

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