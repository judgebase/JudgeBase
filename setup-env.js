#!/usr/bin/env node

/**
 * Environment Setup Script for JudgeBase
 * 
 * This script helps new developers set up required environment variables
 * when importing the project to Replit.
 */

const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
}

async function setupEnvironment() {
  console.log('\n🚀 Welcome to JudgeBase Setup!\n');
  console.log('This script will help you configure the required environment variables.\n');
  
  const envVars = {};
  
  // Check if .env already exists
  const envPath = path.join(process.cwd(), '.env');
  if (fs.existsSync(envPath)) {
    const overwrite = await askQuestion('An .env file already exists. Overwrite it? (y/N): ');
    if (overwrite.toLowerCase() !== 'y' && overwrite.toLowerCase() !== 'yes') {
      console.log('Setup cancelled. Existing .env file preserved.');
      rl.close();
      return;
    }
  }
  
  console.log('\n📦 Required Supabase Configuration:');
  console.log('You can get these from your Supabase project dashboard > Settings > API\n');
  
  envVars.DATABASE_URL = await askQuestion('DATABASE_URL (PostgreSQL connection string): ');
  envVars.SUPABASE_URL = await askQuestion('SUPABASE_URL (https://your-project.supabase.co): ');
  envVars.SUPABASE_ANON_KEY = await askQuestion('SUPABASE_ANON_KEY (public anonymous key): ');
  envVars.SUPABASE_SERVICE_ROLE_KEY = await askQuestion('SUPABASE_SERVICE_ROLE_KEY (secret service role key): ');
  
  console.log('\n📧 Optional Email Configuration:');
  const resendKey = await askQuestion('RESEND_API_KEY (for email notifications, press Enter to skip): ');
  if (resendKey) {
    envVars.RESEND_API_KEY = resendKey;
  }
  
  console.log('\n🔐 Optional Admin Configuration:');
  const adminPassword = await askQuestion('ADMIN_PASSWORD (press Enter for default "judgebase2024"): ');
  if (adminPassword) {
    envVars.ADMIN_PASSWORD = adminPassword;
  }
  
  const sessionSecret = await askQuestion('SESSION_SECRET (press Enter for auto-generated): ');
  if (sessionSecret) {
    envVars.SESSION_SECRET = sessionSecret;
  } else {
    envVars.SESSION_SECRET = generateRandomSecret();
  }
  
  // Set NODE_ENV
  envVars.NODE_ENV = 'development';
  
  // Write .env file
  const envContent = Object.entries(envVars)
    .map(([key, value]) => `${key}="${value}"`)
    .join('\n');
  
  fs.writeFileSync(envPath, envContent);
  
  console.log('\n✅ Environment variables saved to .env file!');
  console.log('\n🎯 Next steps:');
  console.log('1. Run: npm run dev');
  console.log('2. Visit /admin to manage judges (admin/judgebase2024)');
  console.log('3. Test with /judging page (test@judgebase.com/TestJudge123!)');
  console.log('\nHappy building! 🚀\n');
  
  rl.close();
}

function generateRandomSecret() {
  return require('crypto').randomBytes(32).toString('hex');
}

// Handle errors gracefully
process.on('SIGINT', () => {
  console.log('\n\nSetup cancelled by user.');
  rl.close();
  process.exit(0);
});

setupEnvironment().catch((error) => {
  console.error('Setup failed:', error.message);
  rl.close();
  process.exit(1);
});