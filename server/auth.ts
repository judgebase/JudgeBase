import express from 'express';
import session from 'express-session';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import type { IStorage } from './storage';

// Simple admin credentials - in production, use proper user management
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'judgebase2024';

export function setupAuth(app: express.Application, storage: IStorage) {
  // Session configuration
  app.use(session({
    secret: process.env.SESSION_SECRET || 'judgebase-admin-secret-2024',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  // Passport strategy
  passport.use(new LocalStrategy(
    async (username, password, done) => {
      try {
        if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
          return done(null, { id: 1, username: ADMIN_USERNAME, role: 'admin' });
        }
        return done(null, false, { message: 'Invalid credentials' });
      } catch (error) {
        return done(error);
      }
    }
  ));

  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: any, done) => {
    done(null, { id: 1, username: ADMIN_USERNAME, role: 'admin' });
  });

  // Auth routes
  app.post('/api/auth/login', (req, res, next) => {
    passport.authenticate('local', (err: any, user: any, info: any) => {
      if (err) {
        return res.status(500).json({ error: 'Authentication error' });
      }
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      req.logIn(user, (err) => {
        if (err) {
          return res.status(500).json({ error: 'Login error' });
        }
        return res.json({ success: true, user: { username: user.username, role: user.role } });
      });
    })(req, res, next);
  });

  app.post('/api/auth/logout', (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ error: 'Logout error' });
      }
      res.json({ success: true });
    });
  });

  app.get('/api/auth/status', (req, res) => {
    if (req.isAuthenticated()) {
      res.json({ 
        authenticated: true, 
        user: { username: (req.user as any).username, role: (req.user as any).role }
      });
    } else {
      res.json({ authenticated: false });
    }
  });
}

// Middleware to protect admin routes
export function requireAuth(req: express.Request, res: express.Response, next: express.NextFunction) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: 'Authentication required' });
}