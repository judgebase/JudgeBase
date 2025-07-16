import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ahhmqoxnlqowrbcuwekw.supabase.co'

// Try with the service role key for user creation
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseServiceKey) {
  console.error('SUPABASE_SERVICE_ROLE_KEY environment variable is required')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function createTestUser() {
  try {
    console.log('Creating test user...')
    
    // First, try to create the user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: 'test@judgebase.com',
      password: 'TestJudge123!',
      email_confirm: true
    })
    
    if (authError) {
      console.error('Auth error:', authError.message)
      
      // If user already exists, that's fine
      if (authError.message.includes('already registered')) {
        console.log('User already exists, updating password...')
        
        const { error: updateError } = await supabase.auth.admin.updateUserById(
          authData?.user?.id || 'existing-user-id',
          { password: 'TestJudge123!' }
        )
        
        if (updateError) {
          console.error('Update error:', updateError.message)
        } else {
          console.log('Password updated successfully')
        }
      }
    } else {
      console.log('User created successfully:', authData.user.email)
    }
    
    // Now create/update the judge record in our database
    const { data: existingJudge, error: fetchError } = await supabase
      .from('judges')
      .select('*')
      .eq('email', 'test@judgebase.com')
      .single()
    
    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error('Fetch error:', fetchError.message)
    }
    
    if (existingJudge) {
      // Update existing judge
      const { error: updateError } = await supabase
        .from('judges')
        .update({
          status: 'approved',
          auth_password: 'TestJudge123!'
        })
        .eq('email', 'test@judgebase.com')
      
      if (updateError) {
        console.error('Judge update error:', updateError.message)
      } else {
        console.log('Judge updated successfully')
      }
    } else {
      // Create new judge
      const { error: createError } = await supabase
        .from('judges')
        .insert({
          name: 'Test Judge',
          email: 'test@judgebase.com',
          title: 'Senior Developer',
          company: 'Test Company',
          location: 'San Francisco, CA',
          bio: 'Test judge for system verification',
          judging_philosophy: 'Focus on practical implementation and user experience',
          linkedin: 'https://linkedin.com/in/testjudge',
          twitter: 'https://twitter.com/testjudge',
          website: 'https://testjudge.com',
          expertise: ['Web Development', 'AI/ML'],
          experience: 'Senior',
          slug: 'test-judge',
          status: 'approved',
          featured: false,
          auth_password: 'TestJudge123!'
        })
      
      if (createError) {
        console.error('Judge creation error:', createError.message)
      } else {
        console.log('Judge created successfully')
      }
    }
    
  } catch (error) {
    console.error('Unexpected error:', error.message)
  }
}

createTestUser()