import { Judge, NewJudge, Hackathon, NewHackathon, NewUser, User } from '@shared/schema';

export interface IStorage {
  // User operations
  createUser(user: NewUser): Promise<User>;
  getUserByUsername(username: string): Promise<User | null>;
  
  // Judge operations
  createJudge(judge: NewJudge): Promise<Judge>;
  getJudge(id: string): Promise<Judge | null>;
  getJudgeBySlug(slug: string): Promise<Judge | null>;
  getAllJudges(): Promise<Judge[]>;
  getFeaturedJudges(): Promise<Judge[]>;
  updateJudge(id: string, updates: Partial<Judge>): Promise<Judge>;
  deleteJudge(id: string): Promise<void>;
  
  // Hackathon operations
  createHackathon(hackathon: NewHackathon): Promise<Hackathon>;
  getHackathon(id: string): Promise<Hackathon | null>;
  getAllHackathons(): Promise<Hackathon[]>;
  updateHackathon(id: string, updates: Partial<Hackathon>): Promise<Hackathon>;
  deleteHackathon(id: string): Promise<void>;
}

// Simple in-memory storage implementation
export class MemStorage implements IStorage {
  private users: User[] = [];
  private judges: Judge[] = [];
  private hackathons: Hackathon[] = [];
  private nextId = 1;

  private generateId(): string {
    return (this.nextId++).toString();
  }

  async createUser(user: NewUser): Promise<User> {
    const newUser: User = {
      id: this.generateId(),
      ...user,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.users.push(newUser);
    return newUser;
  }

  async getUserByUsername(username: string): Promise<User | null> {
    return this.users.find(u => u.username === username) || null;
  }

  async createJudge(judge: NewJudge): Promise<Judge> {
    const newJudge: Judge = {
      id: this.generateId(),
      ...judge,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.judges.push(newJudge);
    return newJudge;
  }

  async getJudge(id: string): Promise<Judge | null> {
    return this.judges.find(j => j.id === id) || null;
  }

  async getJudgeBySlug(slug: string): Promise<Judge | null> {
    return this.judges.find(j => j.slug === slug) || null;
  }

  async getAllJudges(): Promise<Judge[]> {
    return [...this.judges];
  }

  async getFeaturedJudges(): Promise<Judge[]> {
    return this.judges.filter(j => j.featured && j.status === 'approved');
  }

  async updateJudge(id: string, updates: Partial<Judge>): Promise<Judge> {
    const index = this.judges.findIndex(j => j.id === id);
    if (index === -1) {
      throw new Error('Judge not found');
    }
    
    this.judges[index] = {
      ...this.judges[index],
      ...updates,
      updatedAt: new Date(),
    };
    
    return this.judges[index];
  }

  async deleteJudge(id: string): Promise<void> {
    const index = this.judges.findIndex(j => j.id === id);
    if (index === -1) {
      throw new Error('Judge not found');
    }
    this.judges.splice(index, 1);
  }

  async createHackathon(hackathon: NewHackathon): Promise<Hackathon> {
    const newHackathon: Hackathon = {
      id: this.generateId(),
      ...hackathon,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.hackathons.push(newHackathon);
    return newHackathon;
  }

  async getHackathon(id: string): Promise<Hackathon | null> {
    return this.hackathons.find(h => h.id === id) || null;
  }

  async getAllHackathons(): Promise<Hackathon[]> {
    return [...this.hackathons];
  }

  async updateHackathon(id: string, updates: Partial<Hackathon>): Promise<Hackathon> {
    const index = this.hackathons.findIndex(h => h.id === id);
    if (index === -1) {
      throw new Error('Hackathon not found');
    }
    
    this.hackathons[index] = {
      ...this.hackathons[index],
      ...updates,
      updatedAt: new Date(),
    };
    
    return this.hackathons[index];
  }

  async deleteHackathon(id: string): Promise<void> {
    const index = this.hackathons.findIndex(h => h.id === id);
    if (index === -1) {
      throw new Error('Hackathon not found');
    }
    this.hackathons.splice(index, 1);
  }
}