import { Judge, NewJudge, Hackathon, NewHackathon, JudgeApplication, NewJudgeApplication, JudgeHackathon, NewJudgeHackathon, JudgingInterest, NewJudgingInterest } from '@shared/schema';

export interface IStorage {
  // Judge application operations
  createJudgeApplication(application: NewJudgeApplication): Promise<JudgeApplication>;
  getJudgeApplication(id: string): Promise<JudgeApplication | null>;
  getAllJudgeApplications(): Promise<JudgeApplication[]>;
  updateJudgeApplication(id: string, updates: Partial<JudgeApplication>): Promise<JudgeApplication>;
  deleteJudgeApplication(id: string): Promise<void>;
  
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
  
  // Judge-Hackathon invitation operations
  createJudgeHackathonInvitation(invitation: NewJudgeHackathon): Promise<JudgeHackathon>;
  getHackathonInvitations(hackathonId: string): Promise<JudgeHackathon[]>;
  updateInvitationStatus(invitationId: string, status: string): Promise<JudgeHackathon>;
  
  // Judging interest operations
  createJudgingInterest(interest: NewJudgingInterest): Promise<JudgingInterest>;
  getJudgingInterestsByJudge(judgeId: string): Promise<JudgingInterest[]>;
  hasJudgeExpressedInterest(judgeId: string, hackathonId: string): Promise<boolean>;
}

// Simple in-memory storage implementation
export class MemStorage implements IStorage {
  private judgeApplications: JudgeApplication[] = [];
  private judges: Judge[] = [];
  private hackathons: Hackathon[] = [];
  private judgeHackathons: JudgeHackathon[] = [];
  private nextId = 1;

  private generateId(): string {
    return (this.nextId++).toString();
  }

  async createJudgeApplication(application: NewJudgeApplication): Promise<JudgeApplication> {
    const newApplication: JudgeApplication = {
      id: this.generateId(),
      ...application,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.judgeApplications.push(newApplication);
    return newApplication;
  }

  async getJudgeApplication(id: string): Promise<JudgeApplication | null> {
    return this.judgeApplications.find(a => a.id === id) || null;
  }

  async getAllJudgeApplications(): Promise<JudgeApplication[]> {
    return [...this.judgeApplications];
  }

  async updateJudgeApplication(id: string, updates: Partial<JudgeApplication>): Promise<JudgeApplication> {
    const index = this.judgeApplications.findIndex(a => a.id === id);
    if (index === -1) {
      throw new Error(`Judge application with id ${id} not found`);
    }
    
    const updatedApplication = {
      ...this.judgeApplications[index],
      ...updates,
      updatedAt: new Date(),
    };
    
    this.judgeApplications[index] = updatedApplication;
    return updatedApplication;
  }

  async deleteJudgeApplication(id: string): Promise<void> {
    const index = this.judgeApplications.findIndex(a => a.id === id);
    if (index === -1) {
      throw new Error(`Judge application with id ${id} not found`);
    }
    this.judgeApplications.splice(index, 1);
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

  // Judge-Hackathon invitation operations
  async createJudgeHackathonInvitation(invitation: NewJudgeHackathon): Promise<JudgeHackathon> {
    const newInvitation: JudgeHackathon = {
      id: this.generateId(),
      ...invitation,
      createdAt: new Date(),
    };
    this.judgeHackathons.push(newInvitation);
    return newInvitation;
  }

  async getHackathonInvitations(hackathonId: string): Promise<JudgeHackathon[]> {
    return this.judgeHackathons.filter(jh => jh.hackathonId === hackathonId);
  }

  async updateInvitationStatus(invitationId: string, status: string): Promise<JudgeHackathon> {
    const index = this.judgeHackathons.findIndex(jh => jh.id === invitationId);
    if (index === -1) {
      throw new Error('Invitation not found');
    }
    
    this.judgeHackathons[index] = {
      ...this.judgeHackathons[index],
      invitationStatus: status,
      respondedAt: new Date(),
    };
    
    return this.judgeHackathons[index];
  }

  // Judging interest operations
  async createJudgingInterest(interest: NewJudgingInterest): Promise<JudgingInterest> {
    const newInterest: JudgingInterest = {
      id: this.generateId(),
      ...interest,
      createdAt: new Date(),
    };
    this.judgeHackathons.push(newInterest as any);
    return newInterest;
  }

  async getJudgingInterestsByJudge(judgeId: string): Promise<JudgingInterest[]> {
    return this.judgeHackathons.filter((ji: any) => ji.judgeId === judgeId && ji.hackathonId) as JudgingInterest[];
  }

  async hasJudgeExpressedInterest(judgeId: string, hackathonId: string): Promise<boolean> {
    return this.judgeHackathons.some((ji: any) => ji.judgeId === judgeId && ji.hackathonId === hackathonId);
  }
}