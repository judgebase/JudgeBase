import { users, judges, hackathons, type User, type InsertUser, type Judge, type InsertJudge, type Hackathon, type InsertHackathon } from "@shared/schema";
// import { db } from "./db";
// import { eq, and } from "drizzle-orm";

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

export class MemStorage implements IStorage {
  private users: User[] = [];
  private judges: Judge[] = [];
  private hackathons: Hackathon[] = [];
  private nextUserId = 1;
  private nextJudgeId = 1;
  private nextHackathonId = 1;

  async getUser(id: number): Promise<User | undefined> {
    return this.users.find(user => user.id === id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const user: User = {
      id: this.nextUserId++,
      username: insertUser.username,
      password: insertUser.password,
    };
    this.users.push(user);
    return user;
  }

  async getFeaturedJudges(): Promise<Judge[]> {
    return this.judges.filter(judge => judge.featured && judge.status === "approved");
  }

  async getJudgeBySlug(slug: string): Promise<Judge | undefined> {
    return this.judges.find(judge => judge.slug === slug && judge.status === "approved");
  }

  async createJudge(insertJudge: InsertJudge): Promise<Judge> {
    // Generate slug from name
    const slug = insertJudge.name.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    
    const judge: Judge = {
      id: this.nextJudgeId++,
      name: insertJudge.name,
      email: insertJudge.email,
      title: insertJudge.title,
      company: insertJudge.company || null,
      location: insertJudge.location || null,
      bio: insertJudge.bio || null,
      judgingPhilosophy: insertJudge.judgingPhilosophy || null,
      linkedin: insertJudge.linkedin || null,
      twitter: insertJudge.twitter || null,
      website: insertJudge.website || null,
      avatar: insertJudge.avatar || null,
      expertise: insertJudge.expertise || [],
      experience: insertJudge.experience || null,
      slug,
      status: "pending",
      featured: false,
      badges: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.judges.push(judge);
    return judge;
  }

  async getAllJudges(): Promise<Judge[]> {
    return [...this.judges].sort((a, b) => 
      (a.createdAt?.getTime() || 0) - (b.createdAt?.getTime() || 0)
    );
  }

  async updateJudgeStatus(id: number, updates: { status?: string; featured?: boolean; badges?: string[] }): Promise<Judge> {
    const judge = this.judges.find(j => j.id === id);
    if (!judge) {
      throw new Error(`Judge with id ${id} not found`);
    }
    
    if (updates.status !== undefined) judge.status = updates.status;
    if (updates.featured !== undefined) judge.featured = updates.featured;
    if (updates.badges !== undefined) judge.badges = updates.badges;
    
    return judge;
  }

  async createHackathon(insertHackathon: InsertHackathon): Promise<Hackathon> {
    const hackathon: Hackathon = {
      id: this.nextHackathonId++,
      orgName: insertHackathon.orgName,
      hackathonName: insertHackathon.hackathonName,
      website: insertHackathon.website || null,
      contactEmail: insertHackathon.contactEmail,
      startDate: insertHackathon.startDate || null,
      endDate: insertHackathon.endDate || null,
      judgesNeeded: insertHackathon.judgesNeeded || null,
      format: insertHackathon.format || null,
      domains: insertHackathon.domains || [],
      description: insertHackathon.description || null,
      status: "pending",
      createdAt: new Date(),
    };
    this.hackathons.push(hackathon);
    return hackathon;
  }

  async getAllHackathons(): Promise<Hackathon[]> {
    return [...this.hackathons].sort((a, b) => 
      (a.createdAt?.getTime() || 0) - (b.createdAt?.getTime() || 0)
    );
  }
}

export const storage = new MemStorage();