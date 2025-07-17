import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

console.log('Testing Supabase connection...');
console.log('URL:', supabaseUrl);
console.log('Anon Key length:', supabaseAnonKey?.length);

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testLogin() {
  try {
    console.log('\nTesting login with judge.test@judgebase.com...');
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email: 'judge.test@judgebase.com',
      password: 'TestJudge2025!'
    });

    if (error) {
      console.error('❌ Login error:', error.message);
      return;
    }

    console.log('✅ Login successful!');
    console.log('User ID:', data.user.id);
    console.log('Email:', data.user.email);
    
    // Test sign out
    await supabase.auth.signOut();
    console.log('✅ Sign out successful');
    
  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

testLogin();