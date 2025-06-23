import { supabase } from '../lib/supabaseClient';
import { sendAdminCrudNotification } from './email.service';

export async function getArticles() {
  const { data, error } = await supabase
    .from('articles')
    .select('*, author:authors(*)') // Joins with authors table
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
}

export async function getArticleBySlug(slug: string) {
  const { data, error } = await supabase
    .from('articles')
    .select('*, author:authors(*)')
    .eq('slug', slug)
    .single();

  if (error) throw error;
  return data;
}

export async function createArticle(articleData: any) {
  const { data, error } = await supabase.from('articles').insert(articleData).select('*, author:authors(*)').single();
  if (error) throw error;
  sendAdminCrudNotification('created', 'article', data);
  return data;
}

export async function updateArticle(id: string, articleData: any) {
  const { data, error } = await supabase.from('articles').update(articleData).eq('id', id).select('*, author:authors(*)').single();
  if (error) throw error;
  sendAdminCrudNotification('updated', `article (id: ${id})`, data);
  return data;
}

export async function deleteArticle(id: string) {
  const { error } = await supabase.from('articles').delete().eq('id', id);
  if (error) throw error;
  sendAdminCrudNotification('deleted', 'article', { id });
  return;
} 