import { PostgresStorage } from './server/db.js';

async function createTestJudge() {
  const storage = new PostgresStorage();
  
  try {
    console.log('Creating test judge record...');
    
    const judgeData = {
      name: 'Test Judge',
      email: 'test@judgebase.com',
      title: 'Senior Developer',
      company: 'Test Company',
      location: 'San Francisco, CA',
      bio: 'Test judge for system verification',
      judgingPhilosophy: 'Focus on practical implementation and user experience',
      linkedin: 'https://linkedin.com/in/testjudge',
      twitter: 'https://twitter.com/testjudge',
      website: 'https://testjudge.com',
      avatar: null,
      expertise: ['Web Development', 'AI/ML'],
      experience: 'Senior',
      slug: 'test-judge',
      status: 'approved',
      featured: false,
      badges: [],
      authPassword: 'TestJudge123!'
    };

    const judge = await storage.createJudge(judgeData);
    console.log('Test judge created successfully:', judge);
    
  } catch (error) {
    console.error('Error creating test judge:', error);
  }
}

createTestJudge();