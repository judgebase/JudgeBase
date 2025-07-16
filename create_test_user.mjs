import { createClient } from '@supabase/supabase-js';

// Create test user for judging system
async function createTestUser() {
  const supabaseUrl = 'https://ahhmqoxnlqowrbcuwekw.supabase.co';
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });

  try {
    // Create user in Supabase Auth
    const { data, error } = await supabase.auth.admin.createUser({
      email: 'test@judgebase.com',
      password: 'TestJudge123!',
      email_confirm: true
    });

    if (error) {
      console.error('Error creating user:', error);
    } else {
      console.log('✓ Test user created successfully!');
      console.log('Email: test@judgebase.com');
      console.log('Password: TestJudge123!');
      console.log('User ID:', data.user.id);
    }
  } catch (err) {
    console.error('Failed to create test user:', err);
  }
}

createTestUser();
