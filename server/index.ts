import 'dotenv/config';
import express from 'express';
import { createRoutes } from './routes';
import { createAdminRoutes } from './admin-routes';
import { PostgresStorage } from './db';
import { setupAuth, requireAuth } from './auth';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Create storage instance with error handling
let storage: PostgresStorage;
try {
  storage = new PostgresStorage();
  console.log('Database connection established successfully');
} catch (error) {
  console.error('Failed to create database connection:', error);
  process.exit(1);
}

// Setup authentication
setupAuth(app, storage);

// Development initialization - no sample data seeding
if (process.env.NODE_ENV === 'development') {
  console.log('Development environment initialized - no sample data seeding');
}

// API routes
app.use(createRoutes(storage));

// Protected admin routes
app.use('/api/admin', requireAuth);
app.use(createAdminRoutes(storage));

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