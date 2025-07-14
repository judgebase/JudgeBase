
# JudgeBase 🚀

> **Expert Judge Network for Hackathons**

JudgeBase is a modern SaaS platform that connects hackathon organizers with curated industry experts who serve as judges. Our platform streamlines the judge application process, provides organizers with vetted professionals, and includes a comprehensive admin dashboard for managing the entire ecosystem.

## ✨ Features

### For Judges
- **Easy Application Process**: Simple form-based application with file upload support
- **Professional Profiles**: Showcase expertise, experience, and achievements
- **Badge System**: Recognition for different areas of expertise
- **Social Media Integration**: Connect your professional profiles

### For Hackathon Organizers
- **Quick Judge Requests**: Submit hackathon requirements and get matched with expert judges
- **Curated Expert Network**: Access to vetted, experienced professionals
- **24hr Response Time**: Fast matching and confirmation process
- **Flexible Judging**: Async judging that works across time zones

### For Admins
- **Judge Management**: Approve/reject applications and manage judge status
- **Featured Judge Control**: Set which judges appear on the homepage
- **Badge Assignment**: Award expertise badges to qualified judges
- **Hackathon Oversight**: Monitor and manage hackathon requests

## 🛠️ Tech Stack

### Frontend
- **React** with TypeScript for type safety
- **Wouter** for lightweight client-side routing
- **TanStack Query** for server state management
- **Tailwind CSS** with custom gradient design system
- **Radix UI** + **shadcn/ui** for accessible components
- **Framer Motion** for smooth animations
- **Vite** for fast development and optimized builds

### Backend
- **Express.js** with TypeScript
- **PostgreSQL** with **Drizzle ORM** for type-safe database operations
- **Neon Database** for serverless PostgreSQL hosting
- **Multer** for file upload handling
- **Zod** for runtime type validation

### Development Tools
- **TypeScript** for end-to-end type safety
- **ESBuild** for fast production builds
- **Drizzle Kit** for database migrations
- **React Query DevTools** for debugging

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL database (we recommend Neon)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd judgebase
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL=your_postgresql_connection_string
   NODE_ENV=development
   ```

4. **Set up the database**
   ```bash
   npm run db:push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5000`

## 📁 Project Structure

```
judgebase/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── ui/        # Base UI components (shadcn/ui)
│   │   │   └── ...        # Feature-specific components
│   │   ├── pages/         # Route-level components
│   │   ├── hooks/         # Custom React hooks
│   │   └── lib/           # Utility functions
├── server/                # Backend Express application
│   ├── db.ts             # Database configuration
│   ├── routes.ts         # API route definitions
│   └── storage.ts        # File storage handling
├── shared/               # Shared TypeScript types
└── package.json         # Dependencies and scripts
```

## 🎨 Design System

JudgeBase features a modern gradient-based design system:

- **Primary Colors**: Purple (#8B5CF6) to Blue (#3B82F6) to Green (#10B981)
- **Typography**: Inter/Outfit fonts with large, readable text
- **Animations**: Smooth transitions and micro-interactions
- **Components**: Accessible, modern UI components with hover states
- **Layout**: Mobile-first responsive design

## 📊 Database Schema

### Core Tables
- **`judges`**: Judge profiles, applications, and status
- **`hackathons`**: Hackathon requests and requirements
- **`users`**: Basic authentication (admin users)
- **`judge_hackathons`**: Many-to-many relationships

### Key Features
- **Status Management**: Pending, approved, rejected states
- **Featured System**: Highlighted judges on homepage
- **Badge System**: Expertise categories and recognition
- **File Storage**: Avatar and document uploads

## 🔗 API Endpoints

### Public Endpoints
- `GET /api/judges/featured` - Get featured judges for homepage
- `GET /api/judges/:slug` - Get individual judge profile
- `POST /api/judges/apply` - Submit judge application
- `POST /api/hackathons/apply` - Submit hackathon request

### Admin Endpoints
- `GET /api/admin/judges` - List all judges
- `PATCH /api/admin/judges/:id` - Update judge status/featured/badges
- `GET /api/admin/hackathons` - List all hackathon requests

## 🚀 SaaS Roadmap

JudgeBase is rapidly evolving into a full SaaS platform. Check out our [SAAS_ROADMAP.md](SAAS_ROADMAP.md) for planned features including:

- **Subscription Tiers**: Basic ($99/mo), Pro ($299/mo), Enterprise (custom)
- **Payment Integration**: Stripe-powered billing system
- **AI Matching**: Smart judge-hackathon matching algorithms
- **Mobile App**: React Native application
- **White-Label**: Custom branding for enterprise clients

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run check` - TypeScript type checking
- `npm run db:push` - Push database schema changes

## 🔧 Configuration

### Database Configuration
The app uses Drizzle ORM with PostgreSQL. Configuration is in `drizzle.config.ts`.

### Build Configuration
- **Vite** handles frontend builds
- **ESBuild** handles backend builds
- **TypeScript** provides type checking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check out our documentation
- Contact the development team

## 🎯 Next Steps

1. **Authentication System**: Implement user registration and login
2. **Payment Integration**: Add Stripe for subscription management  
3. **Enhanced Matching**: Build AI-powered judge-hackathon matching
4. **Mobile App**: Develop React Native companion app
5. **Enterprise Features**: Add white-label and custom branding options

---

**Built with ❤️ by the JudgeBase team**

*Making hackathon judging simple, efficient, and effective.*
