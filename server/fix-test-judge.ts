import { PostgresStorage } from './db.js';
import { createJudgeAuthUser } from './supabase-admin.js';

// Fix the test judge authentication
async function fixTestJudge() {
  const storage = new PostgresStorage();
  
  try {
    // Update the test judge with proper auth password
    const testJudge = await storage.updateJudge('5319ab3b-41b0-4d6e-85cf-06e4d67adcc1', {
      authPassword: 'TestJudge123!'
    });
    
    console.log('Test judge updated:', testJudge);
    
    // Create/update Supabase auth user
    const authResult = await createJudgeAuthUser('test@judgebase.com', 'TestJudge123!');
    console.log('Auth user creation result:', authResult);
    
    console.log('Test judge fix completed successfully');
  } catch (error) {
    console.error('Error fixing test judge:', error);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  fixTestJudge();
}