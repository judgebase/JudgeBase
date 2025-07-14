import { pgTable, text, integer, timestamp, boolean, uuid } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

// Users table for authentication
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  username: text('username').notNull().unique(),
  password: text('password').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Judges table for comprehensive judge profiles
export const judges = pgTable('judges', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  title: text('title').notNull(),
  company: text('company').notNull(),
  location: text('location').notNull(),
  bio: text('bio').notNull(),
  judgingPhilosophy: text('judging_philosophy').notNull(),
  linkedin: text('linkedin').notNull(),
  twitter: text('twitter').notNull(),
  website: text('website').notNull(),
  avatar: text('avatar'),
  expertise: text('expertise').array().notNull(),
  experience: text('experience').notNull(),
  slug: text('slug').notNull().unique(),
  status: text('status').notNull().default('pending'), // pending, approved, rejected
  featured: boolean('featured').default(false),
  badges: text('badges').array().default([]),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Hackathons table for hackathon applications
export const hackathons = pgTable('hackathons', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  organizerName: text('organizer_name').notNull(),
  organizerEmail: text('organizer_email').notNull(),
  organizerPhone: text('organizer_phone').notNull(),
  hackathonType: text('hackathon_type').notNull(),
  participantCount: integer('participant_count').notNull(),
  date: timestamp('date').notNull(),
  location: text('location').notNull(),
  description: text('description').notNull(),
  judgingCriteria: text('judging_criteria').notNull(),
  prizes: text('prizes').notNull(),
  status: text('status').notNull().default('pending'), // pending, approved, rejected
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Junction table for judge-hackathon relationships
export const judgeHackathons = pgTable('judge_hackathons', {
  id: uuid('id').primaryKey().defaultRandom(),
  judgeId: uuid('judge_id').notNull().references(() => judges.id),
  hackathonId: uuid('hackathon_id').notNull().references(() => hackathons.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Zod schemas for validation
export const insertUserSchema = createInsertSchema(users).omit({ id: true, createdAt: true, updatedAt: true });
export const selectUserSchema = createSelectSchema(users);

export const insertJudgeSchema = createInsertSchema(judges).omit({ id: true, createdAt: true, updatedAt: true });
export const selectJudgeSchema = createSelectSchema(judges);

export const insertHackathonSchema = createInsertSchema(hackathons).omit({ id: true, createdAt: true, updatedAt: true });
export const selectHackathonSchema = createSelectSchema(hackathons);

export const insertJudgeHackathonSchema = createInsertSchema(judgeHackathons).omit({ id: true, createdAt: true });
export const selectJudgeHackathonSchema = createSelectSchema(judgeHackathons);

// Type exports
export type User = typeof users.$inferSelect;
export type NewUser = z.infer<typeof insertUserSchema>;

export type Judge = typeof judges.$inferSelect;
export type NewJudge = z.infer<typeof insertJudgeSchema>;

export type Hackathon = typeof hackathons.$inferSelect;
export type NewHackathon = z.infer<typeof insertHackathonSchema>;

export type JudgeHackathon = typeof judgeHackathons.$inferSelect;
export type NewJudgeHackathon = z.infer<typeof insertJudgeHackathonSchema>;