import { createClient } from '@supabase/supabase-js'

// Direct Supabase configuration to avoid environment variable issues
const supabaseUrl = 'https://ahhmqoxnlqowrbcuwekw.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFoaG1xb3hubHFvd3JiY3V3ZWt3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY5NzIxNzYsImV4cCI6MjA1MjU0ODE3Nn0.3lP3rUQQVfNJLRLCVYhPJHdJ3xVHZLyJlBd0IUqU8VM'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)