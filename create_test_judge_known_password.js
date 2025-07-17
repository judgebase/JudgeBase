import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function createTestJudgeWithKnownPassword() {
  console.log('Creating test judge with known password...');
  
  const testEmail = 'judge.test@judgebase.com';
  const testPassword = 'TestJudge2025!';
  
  try {
    // 1. First create judge application in database
    const { data: judgeData, error: insertError } = await supabase
      .from('judges')
      .insert([{
        name: 'Demo Judge',
        email: testEmail,
        title: 'Senior Software Engineer',
        company: 'Demo Tech Company',
        location: 'San Francisco, CA',
        bio: 'Experienced software engineer specializing in web development and AI systems. I enjoy mentoring new developers and evaluating innovative technical solutions.',
        judging_philosophy: 'I focus on technical execution, user experience, and the practical impact of solutions. I value working prototypes and clear problem-solving approaches.',
        linkedin: 'https://linkedin.com/in/demojudge',
        twitter: 'https://twitter.com/demojudge',
        website: 'https://demojudge.dev',
        expertise: ['Web Dev', 'AI & ML', 'Product'],
        experience: 'Professional software engineer with 8+ years experience, previous hackathon judge',
        slug: 'demo-judge',
        status: 'approved',
        featured: true,
        auth_password: testPassword
      }])
      .select()
      .single();

    if (insertError) {
      console.error('❌ Error creating judge in database:', insertError);
      return;
    }

    console.log('✅ Judge created in database:', judgeData.name, judgeData.email);

    // 2. Create Supabase Auth user
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: testEmail,
      password: testPassword,
      email_confirm: true
    });

    if (authError) {
      console.error('❌ Error creating Supabase Auth user:', authError);
      return;
    }

    console.log('✅ Supabase Auth user created:', authData.user.email);
    
    console.log('\n🎉 Test judge ready!');
    console.log('Email:', testEmail);
    console.log('Password:', testPassword);
    console.log('Login URL: http://localhost:5000/judging');
    
  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

createTestJudgeWithKnownPassword();