import { supabase } from '../lib/supabaseClient';
import { sendAdminCrudNotification } from './email.service';

export async function getCourses(category?: string) {
  let query = supabase.from('courses').select('*');
  if (category) {
    query = query.eq('category', category);
  }
  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function createCourse(courseData: any) {
  const { data, error } = await supabase.from('courses').insert(courseData).select().single();
  if (error) throw error;
  sendAdminCrudNotification('created', 'course', data);
  return data;
}

export async function updateCourse(id: string, courseData: any) {
  const { data, error } = await supabase.from('courses').update(courseData).eq('id', id).select().single();
  if (error) throw error;
  sendAdminCrudNotification('updated', `course (id: ${id})`, data);
  return data;
}

export async function deleteCourse(id: string) {
  const { error } = await supabase.from('courses').delete().eq('id', id);
  if (error) throw error;
  sendAdminCrudNotification('deleted', 'course', { id });
  return; // Return nothing on delete
}

export async function getCourseById(id: string) {
  const { data: course, error: courseError } = await supabase
    .from('courses')
    .select('*')
    .eq('id', id)
    .single();
  
  if (courseError) throw courseError;

  if (course.category === 'video_series') {
    const { data: lessons, error: lessonsError } = await supabase
      .from('course_lessons')
      .select('*')
      .eq('course_id', id)
      .order('lesson_number');

    if (lessonsError) throw lessonsError;
    return { ...course, lessons };
  }
  
  return course;
}
