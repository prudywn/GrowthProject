import { Resend } from 'resend';

// This check ensures the server fails to start if secrets are missing.
if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY is not set in .env file');
}
if (!process.env.EMAIL_USER) {
    throw new Error('EMAIL_USER (the website owner email) is not set in .env file');
}
if (!process.env.RESEND_FROM_EMAIL) {
    throw new Error('RESEND_FROM_EMAIL is not set in .env file');
}
if (!process.env.RESEND_FROM_NOREPLY_EMAIL) {
    throw new Error('RESEND_FROM_NOREPLY_EMAIL is not set in .env file');
}

const resend = new Resend(process.env.RESEND_API_KEY);
const websiteOwnerEmail = process.env.EMAIL_USER;
const fromEmail = process.env.RESEND_FROM_EMAIL;
const fromNoReplyEmail = process.env.RESEND_FROM_NOREPLY_EMAIL;

// A type for the form data to ensure consistency across the application
export interface ContactFormData {
  full_name: string;
  email: string;
  company?: string;
  phone_number?: string;
  role_description?: string;
  service_needs?: string;
}

function generateAdminEmailHtml(formData: ContactFormData): string {
    return `
        <h1>New Contact Form Submission</h1>
        <p>You have received a new message from your website's contact form.</p>
        <h2>Details:</h2>
        <ul>
            <li><strong>Name:</strong> ${formData.full_name}</li>
            <li><strong>Email:</strong> ${formData.email}</li>
            ${formData.phone_number ? `<li><strong>Phone:</strong> ${formData.phone_number}</li>` : ''}
            ${formData.company ? `<li><strong>Company:</strong> ${formData.company}</li>` : ''}
            ${formData.role_description ? `<li><strong>Role:</strong> ${formData.role_description}</li>` : ''}
            ${formData.service_needs ? `<li><strong>Service Needs:</strong><br/>${formData.service_needs}</li>` : ''}
        </ul>
    `;
}

function generateUserConfirmationHtml(name: string): string {
    return `
        <h1>Thank You for Contacting Us!</h1>
        <p>Hi ${name},</p>
        <p>We have successfully received your message. Our team will review it and get back to you within 24 hours.</p>
        <p>Best regards,</p>
        <p>The GrowthPartners Team</p>
    `;
}

/**
 * Sends both the admin notification and user confirmation emails.
 * It's designed to not throw an error if email sending fails, as the primary
 * action (saving the form to the DB) has already succeeded.
 */
export async function sendContactEmails(formData: ContactFormData): Promise<void> {
    try {
        // IMPORTANT: The 'from' email address MUST be from a domain you have verified in your Resend account.
        const fromAddress = fromEmail;

        // Email to the website owner
        await resend.emails.send({
            from: fromAddress,
            to: websiteOwnerEmail,
            subject: `New Contact Form Submission from ${formData.full_name}`,
            html: generateAdminEmailHtml(formData)
        });

        // Confirmation email to the user
        await resend.emails.send({
            from: fromAddress,
            to: formData.email,
            subject: "We've Received Your Message | GrowthPartners",
            html: generateUserConfirmationHtml(formData.full_name)
        });

    } catch (error) {
        // This is a critical design choice: we log the email failure but do not re-throw the error.
        // This ensures that even if emails fail to send, the user still gets a "Success"
        // response because their contact submission WAS successfully saved to the database.
        console.error("CRITICAL: Contact form saved to DB, but failed to send one or more emails.", error);
    }
}

function generateCrudNotificationHtml(action: string, resource: string, data: any): string {
    return `
        <h1>Content Management Notification</h1>
        <p>A change has been made to your website's content via the admin panel.</p>
        <h2>Details:</h2>
        <ul>
            <li><strong>Action:</strong> ${action.toUpperCase()}</li>
            <li><strong>Resource:</strong> ${resource}</li>
        </ul>
        <h3>Data:</h3>
        <pre><code>${JSON.stringify(data, null, 2)}</code></pre>
    `;
}

/**
 * Sends a notification to the admin about a CRUD operation.
 * Designed to be fire-and-forget.
 */
export async function sendAdminCrudNotification(action: 'created' | 'updated' | 'deleted', resource: string, data: any): Promise<void> {
    try {
        const fromAddress = fromNoReplyEmail; // Use a different from address for system notifications

        await resend.emails.send({
            from: fromAddress,
            to: websiteOwnerEmail,
            subject: `[Admin] ${action.toUpperCase()}: ${resource}`,
            html: generateCrudNotificationHtml(action, resource, data),
        });

    } catch (error) {
        console.error(`CRITICAL: CRUD action/operation succeeded, but failed to send admin notification email for ${resource}.`, error);
    }
}

/**
 * Sends a notification to the admin about a change made in Sanity.
 */
export async function sendContentChangeNotification(payload: any): Promise<void> {
    try {
        const fromAddress = fromNoReplyEmail;
        const {_type, _id, title, name} = payload;
        const displayName = title || name || 'Untitled';

        const html = `
            <h1>Sanity Content Notification</h1>
            <p>A change has been made to your website's content via the Sanity Studio.</p>
            <h2>Details:</h2>
            <ul>
                <li><strong>Document Type:</strong> ${_type}</li>
                <li><strong>Document Name:</strong> ${displayName}</li>
                <li><strong>Document ID:</strong> ${_id}</li>
            </ul>
            <p>You can view the document history in the Sanity Studio.</p>
        `;

        await resend.emails.send({
            from: fromAddress,
            to: websiteOwnerEmail,
            subject: `[Sanity] Content Change: ${displayName}`,
            html,
        });

    } catch (error) {
        console.error(`CRITICAL: Failed to send Sanity webhook notification email.`, error);
    }
} 