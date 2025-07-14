import { users, judges, hackathons, type User, type InsertUser, type Judge, type InsertJudge, type Hackathon, type InsertHackathon } from "@shared/schema";
import { db } from "./db";
import { eq, and } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(insertUser: InsertUser): Promise<User>;
  
  // Judge methods
  getFeaturedJudges(): Promise<Judge[]>;
  getJudgeBySlug(slug: string): Promise<Judge | undefined>;
  createJudge(insertJudge: InsertJudge): Promise<Judge>;
  getAllJudges(): Promise<Judge[]>;
  updateJudgeStatus(id: number, updates: { status?: string; featured?: boolean; badges?: string[] }): Promise<Judge>;
  
  // Hackathon methods
  createHackathon(insertHackathon: InsertHackathon): Promise<Hackathon>;
  getAllHackathons(): Promise<Hackathon[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getFeaturedJudges(): Promise<Judge[]> {
    const featuredJudges = await db
      .select()
      .from(judges)
      .where(and(eq(judges.featured, true), eq(judges.status, "approved")));
    return featuredJudges;
  }

  async getJudgeBySlug(slug: string): Promise<Judge | undefined> {
    const [judge] = await db
      .select()
      .from(judges)
      .where(and(eq(judges.slug, slug), eq(judges.status, "approved")));
    return judge || undefined;
  }

  async createJudge(insertJudge: InsertJudge): Promise<Judge> {
    // Generate slug from name
    const slug = insertJudge.name.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    
    const [judge] = await db
      .insert(judges)
      .values({ ...insertJudge, slug })
      .returning();
    return judge;
  }

  async getAllJudges(): Promise<Judge[]> {
    const allJudges = await db
      .select()
      .from(judges)
      .orderBy(judges.createdAt);
    return allJudges;
  }

  async updateJudgeStatus(id: number, updates: { status?: string; featured?: boolean; badges?: string[] }): Promise<Judge> {
    const [updatedJudge] = await db
      .update(judges)
      .set(updates)
      .where(eq(judges.id, id))
      .returning();
    return updatedJudge;
  }

  async createHackathon(insertHackathon: InsertHackathon): Promise<Hackathon> {
    const [hackathon] = await db
      .insert(hackathons)
      .values(insertHackathon)
      .returning();
    return hackathon;
  }

  async getAllHackathons(): Promise<Hackathon[]> {
    const allHackathons = await db
      .select()
      .from(hackathons)
      .orderBy(hackathons.createdAt);
    return allHackathons;
  }
}

export const storage = new DatabaseStorage();