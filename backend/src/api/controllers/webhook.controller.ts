import { Request, Response } from 'express'
import { sendContentChangeNotification } from '../../services/email.service'

// It's a good practice to use a secret to verify the webhook request
const SANITY_WEBHOOK_SECRET = process.env.SANITY_WEBHOOK_SECRET

export async function handleSanityWebhook(req: Request, res: Response): Promise<Response | void> {
  // 1. Verify the secret if it's provided
  if (SANITY_WEBHOOK_SECRET) {
    const signature = req.headers['sanity-webhook-signature']
    if (signature !== SANITY_WEBHOOK_SECRET) {
      return res.status(401).json({ success: false, message: 'Invalid signature' })
    }
  }

  // 2. Respond to Sanity immediately to acknowledge receipt of the webhook
  res.status(200).json({ success: true, message: 'Webhook received' })

  // 3. Process the notification asynchronously
  // We've already responded, so we don't need to await this.
  // This ensures the webhook doesn't time out if email sending is slow.
  try {
    // The webhook payload is in req.body. We only need the 'created', 'updated', or 'deleted' document.
    const payload = req.body.created || req.body.updated || req.body.deleted
    if (payload) {
      sendContentChangeNotification(payload)
    }
  } catch (error) {
    // Log any errors in processing, but don't send a response back to Sanity
    console.error('Error processing Sanity webhook:', error)
  }
}