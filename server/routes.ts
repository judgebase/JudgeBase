import type { Express } from "express";
import express from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertJudgeSchema, insertHackathonSchema } from "@shared/schema";
import { z } from "zod";
import multer from "multer";
import path from "path";
import fs from "fs";

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = path.join(process.cwd(), "uploads");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
      cb(null, "avatar-" + uniqueSuffix + path.extname(file.originalname));
    }
  }),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Get featured judges for homepage
  app.get("/api/judges/featured", async (req, res) => {
    try {
      const judges = await storage.getFeaturedJudges();
      res.json(judges);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured judges" });
    }
  });

  // Get judge by slug
  app.get("/api/judges/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const judge = await storage.getJudgeBySlug(slug);
      if (!judge) {
        return res.status(404).json({ message: "Judge not found" });
      }
      res.json(judge);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch judge" });
    }
  });

  // Submit judge application
  app.post("/api/judges/apply", upload.single("avatar"), async (req, res) => {
    try {
      const validatedData = insertJudgeSchema.parse(req.body);
      
      // Add avatar path if uploaded
      if (req.file) {
        validatedData.avatar = `/uploads/${req.file.filename}`;
      }
      
      const judge = await storage.createJudge(validatedData);
      res.json({ message: "Application submitted successfully", judge });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid form data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to submit application" });
    }
  });

  // Submit hackathon application
  app.post("/api/hackathons/apply", async (req, res) => {
    try {
      const validatedData = insertHackathonSchema.parse(req.body);
      const hackathon = await storage.createHackathon(validatedData);
      res.json({ message: "Hackathon application submitted successfully", hackathon });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid form data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to submit hackathon application" });
    }
  });

  // Admin: Get all judges
  app.get("/api/admin/judges", async (req, res) => {
    try {
      const judges = await storage.getAllJudges();
      res.json(judges);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch judges" });
    }
  });

  // Admin: Update judge status
  app.patch("/api/admin/judges/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { status, featured, badges } = req.body;
      
      const judge = await storage.updateJudgeStatus(parseInt(id), { status, featured, badges });
      res.json({ message: "Judge updated successfully", judge });
    } catch (error) {
      res.status(500).json({ message: "Failed to update judge" });
    }
  });

  // Admin: Get all hackathons
  app.get("/api/admin/hackathons", async (req, res) => {
    try {
      const hackathons = await storage.getAllHackathons();
      res.json(hackathons);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch hackathons" });
    }
  });

  // Serve uploaded files
  app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

  const httpServer = createServer(app);
  return httpServer;
}
