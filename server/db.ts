import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { eq, and, desc } from 'drizzle-orm';
import { users, judges, judgeApplications, hackathons, judgeHackathons } from '@shared/schema';
import type { IStorage } from './storage';
import type { User, NewUser, Judge, NewJudge, JudgeApplication, NewJudgeApplication, Hackathon, NewHackathon } from '@shared/schema';

const connectionString = process.env.DATABASE_URL!;

// Create the postgres connection
const sql = postgres(connectionString);
export const db = drizzle(sql);

export class PostgresStorage implements IStorage {
  // User operations
  async createUser(user: NewUser): Promise<User> {
    const [newUser] = await db.insert(users).values(user).returning();
    return newUser;
  }

  async getUserByUsername(username: string): Promise<User | null> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || null;
  }

  // Judge application operations
  async createJudgeApplication(application: NewJudgeApplication): Promise<JudgeApplication> {
    const [newApplication] = await db.insert(judgeApplications).values(application).returning();
    return newApplication;
  }

  async getJudgeApplication(id: string): Promise<JudgeApplication | null> {
    const [application] = await db.select().from(judgeApplications).where(eq(judgeApplications.id, id));
    return application || null;
  }

  async getAllJudgeApplications(): Promise<JudgeApplication[]> {
    return await db.select().from(judgeApplications).orderBy(desc(judgeApplications.createdAt));
  }

  async updateJudgeApplication(id: string, updates: Partial<JudgeApplication>): Promise<JudgeApplication> {
    const [updatedApplication] = await db.update(judgeApplications)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(judgeApplications.id, id))
      .returning();
    
    if (!updatedApplication) {
      throw new Error(`Judge application with id ${id} not found`);
    }
    
    return updatedApplication;
  }

  async deleteJudgeApplication(id: string): Promise<void> {
    await db.delete(judgeApplications).where(eq(judgeApplications.id, id));
  }

  // Judge operations
  async createJudge(judge: NewJudge): Promise<Judge> {
    const [newJudge] = await db.insert(judges).values(judge).returning();
    return newJudge;
  }

  async getJudge(id: string): Promise<Judge | null> {
    const [judge] = await db.select().from(judges).where(eq(judges.id, id));
    return judge || null;
  }

  async getJudgeBySlug(slug: string): Promise<Judge | null> {
    const [judge] = await db.select().from(judges).where(eq(judges.slug, slug));
    return judge || null;
  }

  async getAllJudges(): Promise<Judge[]> {
    return await db.select().from(judges).orderBy(desc(judges.createdAt));
  }

  async getFeaturedJudges(): Promise<Judge[]> {
    return await db.select().from(judges)
      .where(and(eq(judges.featured, true), eq(judges.status, 'approved')))
      .orderBy(desc(judges.createdAt));
  }

  async updateJudge(id: string, updates: Partial<Judge>): Promise<Judge> {
    const [updatedJudge] = await db.update(judges)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(judges.id, id))
      .returning();
    
    if (!updatedJudge) {
      throw new Error(`Judge with id ${id} not found`);
    }
    
    return updatedJudge;
  }

  async deleteJudge(id: string): Promise<void> {
    await db.delete(judges).where(eq(judges.id, id));
  }

  // Hackathon operations
  async createHackathon(hackathon: NewHackathon): Promise<Hackathon> {
    const [newHackathon] = await db.insert(hackathons).values(hackathon).returning();
    return newHackathon;
  }

  async getHackathon(id: string): Promise<Hackathon | null> {
    const [hackathon] = await db.select().from(hackathons).where(eq(hackathons.id, id));
    return hackathon || null;
  }

  async getAllHackathons(): Promise<Hackathon[]> {
    return await db.select().from(hackathons).orderBy(desc(hackathons.createdAt));
  }

  async updateHackathon(id: string, updates: Partial<Hackathon>): Promise<Hackathon> {
    const [updatedHackathon] = await db.update(hackathons)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(hackathons.id, id))
      .returning();
    
    if (!updatedHackathon) {
      throw new Error(`Hackathon with id ${id} not found`);
    }
    
    return updatedHackathon;
  }

  async deleteHackathon(id: string): Promise<void> {
    await db.delete(hackathons).where(eq(hackathons.id, id));
  }
}