import { supabase } from '../lib/supabaseClient';
import { sendContactEmails, sendDbFailureNotification, ContactFormData } from './email.service';

export async function createContactSubmission(submission: ContactFormData) {
  let savedData;
  try {
    // Step 1: Try to save the submission to the database.
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([submission])
      .select()
      .single();
    
    if (error) {
      // If Supabase returns an error object, throw it to be caught by the catch block.
      throw error;
    }
    savedData = data;

    // Step 2: If save is successful, trigger the standard confirmation emails.
    await sendContactEmails(submission);

  } catch (dbError) {
    // Step 3: If the database write fails, log it and send a critical alert to the admin.
    console.error("CRITICAL: Supabase database write failed. An alert email will be sent to the admin.", dbError);
    
    // Send a special notification to the admin with the form data.
    await sendDbFailureNotification(submission, dbError as Error);

    // IMPORTANT: Re-throw the error so the controller knows the operation failed
    // and can send an appropriate error response to the user.
    throw dbError;
  }

  return savedData;
}