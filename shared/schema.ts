import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const judges = pgTable("judges", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  title: text("title").notNull(),
  company: text("company"),
  location: text("location"),
  bio: text("bio"),
  judgingPhilosophy: text("judging_philosophy"),
  linkedin: text("linkedin"),
  twitter: text("twitter"),
  website: text("website"),
  avatar: text("avatar"),
  slug: text("slug").notNull().unique(),
  status: text("status").notNull().default("pending"), // pending, approved, rejected
  featured: boolean("featured").default(false),
  badges: text("badges").array().default([]),
  expertise: text("expertise").array().default([]),
  experience: text("experience"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const hackathons = pgTable("hackathons", {
  id: serial("id").primaryKey(),
  orgName: text("org_name").notNull(),
  hackathonName: text("hackathon_name").notNull(),
  website: text("website"),
  contactEmail: text("contact_email").notNull(),
  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"),
  judgesNeeded: integer("judges_needed"),
  format: text("format"), // async, live, hybrid
  domains: text("domains").array().default([]),
  description: text("description"),
  status: text("status").notNull().default("pending"), // pending, approved, rejected
  createdAt: timestamp("created_at").defaultNow(),
});

export const judgeHackathons = pgTable("judge_hackathons", {
  id: serial("id").primaryKey(),
  judgeId: integer("judge_id").notNull(),
  hackathonId: integer("hackathon_id").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const judgeRelations = relations(judges, ({ many }) => ({
  hackathons: many(judgeHackathons),
}));

export const hackathonRelations = relations(hackathons, ({ many }) => ({
  judges: many(judgeHackathons),
}));

export const judgeHackathonRelations = relations(judgeHackathons, ({ one }) => ({
  judge: one(judges, {
    fields: [judgeHackathons.judgeId],
    references: [judges.id],
  }),
  hackathon: one(hackathons, {
    fields: [judgeHackathons.hackathonId],
    references: [hackathons.id],
  }),
}));

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertJudgeSchema = createInsertSchema(judges).omit({
  id: true,
  slug: true,
  status: true,
  featured: true,
  badges: true,
  createdAt: true,
  updatedAt: true,
});

export const insertHackathonSchema = createInsertSchema(hackathons).omit({
  id: true,
  status: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Judge = typeof judges.$inferSelect;
export type InsertJudge = z.infer<typeof insertJudgeSchema>;
export type Hackathon = typeof hackathons.$inferSelect;
export type InsertHackathon = z.infer<typeof insertHackathonSchema>;
