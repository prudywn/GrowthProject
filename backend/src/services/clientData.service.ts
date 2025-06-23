import { supabase } from '../lib/supabaseClient';

export async function getTestimonials() {
  const { data, error } = await supabase.from('testimonials').select('*');
  if (error) throw error;
  return data;
}

export async function getTrustedClients() {
  const { data, error } = await supabase.from('trusted_clients').select('*');
  if (error) throw error;
  return data;
} 