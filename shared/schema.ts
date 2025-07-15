import { pgTable, text, integer, timestamp, boolean, uuid } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

// Users table removed - using hardcoded admin authentication

// Judge applications table for storing application data
export const judgeApplications = pgTable('judge_applications', {
  id: uuid('id').primaryKey().defaultRandom(),
  fullName: text('full_name').notNull(),
  email: text('email').notNull(),
  currentRole: text('current_role').notNull(),
  linkedin: text('linkedin').notNull(),
  twitterOrWebsite: text('twitter_or_website'),
  avatar: text('avatar'), // file path
  hasJudgedBefore: boolean('has_judged_before').notNull(),
  previousExperience: text('previous_experience'),
  expertise: text('expertise').array().notNull(),
  otherExpertise: text('other_expertise'),
  shortBio: text('short_bio').notNull(),
  judgingPhilosophy: text('judging_philosophy').notNull(),
  openToMentoring: text('open_to_mentoring').notNull(), // Yes/No/Depends
  preferredFormat: text('preferred_format').array().notNull(),
  whyJoinJudgeBase: text('why_join_judge_base'),
  anythingElse: text('anything_else'),
  consentAgreed: boolean('consent_agreed').notNull(),
  status: text('status').notNull().default('pending'), // pending, approved, rejected
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
  // Organizer Info
  organizerName: text('organizer_name').notNull(),
  organizerEmail: text('organizer_email').notNull(),
  organizationName: text('organization_name').notNull(),
  organizerRole: text('organizer_role'),
  organizerWebsite: text('organizer_website'),
  
  // Hackathon Details
  hackathonName: text('hackathon_name').notNull(),
  hackathonWebsite: text('hackathon_website').notNull(),
  platform: text('platform').notNull(),
  hackathonDates: text('hackathon_dates').notNull(),
  judgeDeadline: text('judge_deadline').notNull(),
  eventFormat: text('event_format').array().notNull(),
  participantCount: text('participant_count').notNull(),
  isFirstTime: text('is_first_time').notNull(),
  
  // Theme & Domains
  theme: text('theme').notNull(),
  domains: text('domains').array().notNull(),
  eventSummary: text('event_summary').notNull(),
  needMentors: text('need_mentors').notNull(),
  hasExistingJudges: text('has_existing_judges').notNull(),
  
  // Logistics
  deliverables: text('deliverables').array().notNull(),
  judgeCount: text('judge_count').notNull(),
  timeCommitment: text('time_commitment').notNull(),
  
  // Final Notes
  whyJudgeBase: text('why_judge_base'),
  additionalNotes: text('additional_notes'),
  
  status: text('status').notNull().default('pending'), // pending, approved, rejected
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Junction table for judge-hackathon relationships and invitations
export const judgeHackathons = pgTable('judge_hackathons', {
  id: uuid('id').primaryKey().defaultRandom(),
  judgeId: uuid('judge_id').notNull().references(() => judges.id, { onDelete: 'cascade' }),
  hackathonId: uuid('hackathon_id').notNull().references(() => hackathons.id, { onDelete: 'cascade' }),
  invitationStatus: text('invitation_status').notNull().default('pending'), // pending, accepted, declined
  invitedAt: timestamp('invited_at').defaultNow().notNull(),
  respondedAt: timestamp('responded_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Zod schemas for validation
export const insertJudgeApplicationSchema = createInsertSchema(judgeApplications).omit({ id: true, createdAt: true, updatedAt: true });
export const selectJudgeApplicationSchema = createSelectSchema(judgeApplications);

export const insertJudgeSchema = createInsertSchema(judges).omit({ id: true, createdAt: true, updatedAt: true });
export const selectJudgeSchema = createSelectSchema(judges);

export const insertHackathonSchema = createInsertSchema(hackathons).omit({ id: true, createdAt: true, updatedAt: true });
export const selectHackathonSchema = createSelectSchema(hackathons);

export const insertJudgeHackathonSchema = createInsertSchema(judgeHackathons).omit({ id: true, createdAt: true });
export const selectJudgeHackathonSchema = createSelectSchema(judgeHackathons);

// Type exports
export type JudgeApplication = typeof judgeApplications.$inferSelect;
export type NewJudgeApplication = z.infer<typeof insertJudgeApplicationSchema>;

export type Judge = typeof judges.$inferSelect;
export type NewJudge = z.infer<typeof insertJudgeSchema>;

export type Hackathon = typeof hackathons.$inferSelect;
export type NewHackathon = z.infer<typeof insertHackathonSchema>;

export type JudgeHackathon = typeof judgeHackathons.$inferSelect;
export type NewJudgeHackathon = z.infer<typeof insertJudgeHackathonSchema>;