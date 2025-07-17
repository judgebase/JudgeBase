import { createClient } from '@supabase/supabase-js'

// Use environment variables for Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || 'https://ahhmqoxnlqowrbcuwekw.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFoaG1xb3hubHFvd3JiY3V3ZWt3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY5NzIxNzYsImV4cCI6MjA1MjU0ODE3Nn0.3lP3rUQQVfNJLRLCVYhPJHdJ3xVHZLyJlBd0IUqU8VM'

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase configuration. Please check environment variables.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)