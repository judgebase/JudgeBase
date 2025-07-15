import express from 'express';
import { createRoutes } from './routes';
import { MemStorage } from './storage';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create storage instance
const storage = new MemStorage();

// Seed some sample data for development
if (process.env.NODE_ENV === 'development') {
  await storage.createJudge({
    name: 'Sarah Chen',
    title: 'Senior Product Manager',
    company: 'Google',
    location: 'San Francisco, CA',
    bio: 'Passionate about AI and machine learning applications in consumer products.',
    judgingPhilosophy: 'I focus on user impact, technical innovation, and market potential.',
    linkedin: 'https://linkedin.com/in/sarahchen',
    twitter: 'https://twitter.com/sarahchen',
    website: 'https://sarahchen.dev',
    avatar: null,
    expertise: ['AI/ML', 'Product Management', 'Mobile Apps'],
    experience: '8 years',
    slug: 'sarah-chen',
    status: 'approved',
    featured: true,
    badges: ['AI Expert', 'Product Leader'],
  });

  await storage.createJudge({
    name: 'Marcus Rodriguez',
    title: 'CTO',
    company: 'TechFlow',
    location: 'Austin, TX',
    bio: 'Full-stack developer turned CTO with expertise in scalable systems.',
    judgingPhilosophy: 'I evaluate technical excellence, scalability, and code quality.',
    linkedin: 'https://linkedin.com/in/marcusrodriguez',
    twitter: 'https://twitter.com/marcusrod',
    website: 'https://marcusrodriguez.com',
    avatar: null,
    expertise: ['Full Stack', 'System Architecture', 'DevOps'],
    experience: '12 years',
    slug: 'marcus-rodriguez',
    status: 'approved',
    featured: true,
    badges: ['Tech Leader', 'Startup Mentor'],
  });

  await storage.createJudge({
    name: 'Rishul Chanana',
    title: 'Founder & CEO',
    company: 'Maximally',
    location: 'Chandigarh, India',
    bio: 'Rishul is a 16-year-old dropout-turned-founder from Zirakpur who\'s dead serious about one thing: execution. He runs Maximally, India\'s first high-stakes hackathon ecosystem designed for teenagers who\'d rather build than cram.\n\nHe doesn\'t do lectures or checkboxes. His events feel more like Red Bull meets YC — fast, chaotic, and real. His past hackathons have brought in thousands of young builders, and he\'s landed partnerships with orgs like Masters\' Union to back the movement.\n\nRishul\'s belief is simple: hackathons aren\'t events. They\'re engines. Engines for discovery, for proof, and for transformation.',
    judgingPhilosophy: 'I reward speed, not theory. I care about clarity, not complexity. The best builds are sharp, raw, and unapologetically weird.\n\nRishul judges with a "ship-first" lens — he prioritizes MVPs over mockups, originality over polish, and founder energy over fancy slides.',
    linkedin: 'https://linkedin.com/in/rishulchanana',
    twitter: '',
    website: 'https://maximally.in',
    avatar: null,
    expertise: ['Hackathons', 'Startup Ecosystem', 'Youth Entrepreneurship'],
    experience: 'Head Judge – CodeQuest (India\'s largest school hackathon), Judge & Mentor – Maximally Startup Makeathon, Advisor – Startup World Tapri, Consultant – PurpleRain TechSafe, Builder – HackSkye (4000+ student event)',
    slug: 'rishulchanana',
    status: 'approved',
    featured: true,
    badges: ['Startup Mentor', 'Youth Leader', 'Hackathon Expert'],
  });
}

// API routes
app.use(createRoutes(storage));

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Test route to verify server is working
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// In development, serve Vite dev server
if (process.env.NODE_ENV === 'development') {
  try {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { 
        middlewareMode: true,
        host: '0.0.0.0',
        allowedHosts: ['all', '.replit.dev', 'localhost'],
      },
      appType: 'spa',
      configFile: false, // Don't use config file to avoid conflicts
      root: path.resolve(process.cwd(), 'client'),
      resolve: {
        alias: {
          "@": path.resolve(process.cwd(), "client", "src"),
          "@shared": path.resolve(process.cwd(), "shared"),
          "@assets": path.resolve(process.cwd(), "attached_assets"),
        },
      },
      plugins: [
        (await import('@vitejs/plugin-react')).default(),
        (await import('@replit/vite-plugin-runtime-error-modal')).default(),
      ],
      define: {
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      },
    });
    
    // Use vite middleware for all non-API routes
    app.use('/', (req, res, next) => {
      if (req.path.startsWith('/api/') || req.path === '/health') {
        return next();
      }
      vite.middlewares(req, res, next);
    });
    
    console.log('Vite dev server integrated successfully');
  } catch (error) {
    console.error('Failed to create Vite dev server:', error);
    console.error('Error details:', error.message);
    // Fallback to serving static files
    app.use(express.static(path.join(process.cwd(), 'client')));
    app.get('*', (req, res) => {
      if (req.path.startsWith('/api/') || req.path === '/health') {
        return; // Skip API routes
      }
      res.sendFile(path.join(process.cwd(), 'client/index.html'));
    });
  }
} else {
  // In production, serve built files
  app.use(express.static(path.join(__dirname, '../dist/public')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/public/index.html'));
  });
}

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});