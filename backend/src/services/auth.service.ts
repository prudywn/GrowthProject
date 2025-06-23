import { supabase } from '../lib/supabaseClient';

export async function signInUser(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(`Authentication failed: ${error.message}`);
  }

  if (!data.session) {
    throw new Error('Authentication failed: No session returned.');
  }

  return {
    token: data.session.access_token,
    user: data.user,
  };
} 