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
    name: 'Emma Thompson',
    title: 'Design Director',
    company: 'Airbnb',
    location: 'New York, NY',
    bio: 'Award-winning designer specializing in user experience and design systems.',
    judgingPhilosophy: 'I prioritize user-centered design, accessibility, and visual impact.',
    linkedin: 'https://linkedin.com/in/emmathompson',
    twitter: 'https://twitter.com/emmathompson',
    website: 'https://emmathompson.design',
    avatar: null,
    expertise: ['UX/UI Design', 'Design Systems', 'User Research'],
    experience: '10 years',
    slug: 'emma-thompson',
    status: 'approved',
    featured: true,
    badges: ['Design Award Winner', 'UX Expert'],
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
      server: { middlewareMode: true },
      appType: 'spa',
      configFile: path.resolve(process.cwd(), 'vite.config.ts'),
      root: path.resolve(process.cwd(), 'client'),
    });
    
    app.use(vite.ssrFixStacktrace);
    app.use(vite.middlewares);
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