import { supabase } from '../lib/supabaseClient';
import { sendContactEmails, ContactFormData } from './email.service';

export async function createContactSubmission(submission: ContactFormData) {
  // Step 1: Save the submission to the database. This is the critical action.
  const { data, error } = await supabase
    .from('contact_submissions')
    .insert([submission])
    .select()
    .single(); // Using .single() to ensure we get one object back, not an array
  
  if (error) {
    // If the database write fails, we must stop and report the error.
    throw error;
  }

  // Step 2: After successfully saving, trigger the emails.
  // This is a "fire and forget" action from the perspective of the user's request.
  // The email service has its own internal error handling so it won't crash this process.
  await sendContactEmails(submission);

  return data;
} 