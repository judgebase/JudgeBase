import { supabaseAdmin } from './supabase-admin';

export async function createHackathonAuthUser(email: string, password: string) {
  try {
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        role: 'hackathon_organizer'
      }
    });

    if (error) {
      console.error('Error creating hackathon auth user:', error);
      return { success: false, error: error.message };
    }

    return { success: true, user: data.user };
  } catch (error) {
    console.error('Failed to create hackathon auth user:', error);
    return { success: false, error: 'Failed to create authentication account' };
  }
}

export function generateHackathonPassword(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%';
  let password = '';
  for (let i = 0; i < 12; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}