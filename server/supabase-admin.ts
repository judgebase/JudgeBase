import { createClient } from '@supabase/supabase-js'

// Server-side Supabase client with service role key for admin operations
const supabaseUrl = process.env.SUPABASE_URL || 'https://ahhmqoxnlqowrbcuwekw.supabase.co'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn('SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY not found - admin functions will be limited')
}

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Generate a random password for approved judges
export function generatePassword(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'
  let password = ''
  for (let i = 0; i < 12; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return password
}

// Create a Supabase Auth user for an approved judge
export async function createJudgeAuthUser(email: string, password: string) {
  try {
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true
    })
    
    if (error) {
      console.error('Error creating judge auth user:', error)
      return { success: false, error: error.message }
    }
    
    return { success: true, user: data.user }
  } catch (error) {
    console.error('Error creating judge auth user:', error)
    return { success: false, error: 'Failed to create auth user' }
  }
}

// Update judge password
export async function updateJudgePassword(email: string, newPassword: string) {
  try {
    const { data, error } = await supabaseAdmin.auth.admin.updateUserById(
      email,
      { password: newPassword }
    )
    
    if (error) {
      console.error('Error updating judge password:', error)
      return { success: false, error: error.message }
    }
    
    return { success: true, user: data.user }
  } catch (error) {
    console.error('Error updating judge password:', error)
    return { success: false, error: 'Failed to update password' }
  }
}