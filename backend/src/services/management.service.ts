import { supabase } from '../lib/supabaseClient';

export async function manageResource(resource: string, method: 'create' | 'update' | 'delete', id?: string, data?: any) {
  let query;
  const table = resource as 'team_members' | 'testimonials' | 'trusted_clients';
  
  switch (method) {
    case 'create':
      query = supabase.from(table).insert(data).select().single();
      break;
    case 'update':
      if (!id) throw new Error('Update requires an ID');
      query = supabase.from(table).update(data).eq('id', id).select().single();
      break;
    case 'delete':
      if (!id) throw new Error('Delete requires an ID');
      query = supabase.from(table).delete().eq('id', id);
      break;
    default:
      throw new Error('Invalid management method');
  }

  const { data: result, error } = await query;
  if (error) throw error;
  return result;
}

export async function updateStaticContent(resource: 'homepage_content' | 'about_page_content', content: any) {
    const { data, error } = await supabase.from(resource).update(content).eq('id', 1).select().single();
    if (error) throw error;
    return data;
} 