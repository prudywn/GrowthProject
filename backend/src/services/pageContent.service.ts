import { supabase } from '../lib/supabaseClient';

export async function getHomepageContent() {
  // Fetch data for the homepage from multiple tables
  const [intro, whyUsContent, whyUsPoints, clients, testimonials, courses] = await Promise.all([
    supabase.from('homepage_content').select('*').maybeSingle(),
    supabase.from('why_us_content').select('*').maybeSingle(),
    supabase.from('why_us_points').select('*').order('sort_order'),
    supabase.from('trusted_clients').select('*'),
    supabase.from('testimonials').select('*').limit(3),
    supabase.from('courses').select('*').limit(3) // Fetch 3 courses for a preview
  ]);

  // Consolidate error checking
  const errors = [intro, whyUsContent, whyUsPoints, clients, testimonials, courses].map(res => res.error).filter(Boolean);
  if (errors.length > 0) {
    console.error('Error fetching homepage data:', errors);
    throw new Error('Failed to fetch homepage content');
  }

  return {
    intro: intro.data,
    whyUs: {
      content: whyUsContent.data,
      points: whyUsPoints.data,
    },
    clients: clients.data,
    testimonials: testimonials.data,
    coursePreview: courses.data,
  };
}

export async function getAboutPageContent() {
  const [about, values, team] = await Promise.all([
    supabase.from('about_page_content').select('*').maybeSingle(),
    supabase.from('core_values').select('*').order('sort_order'),
    supabase.from('team_members').select('*').order('sort_order')
  ]);

  const errors = [about, values, team].map(res => res.error).filter(Boolean);
  if (errors.length > 0) {
    console.error('Error fetching about page data:', errors);
    throw new Error('Failed to fetch about page content');
  }

  return {
    about: about.data,
    values: values.data,
    team: team.data,
  };
}
