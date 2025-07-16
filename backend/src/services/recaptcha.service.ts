import https from 'https';
import { URLSearchParams } from 'url';

export interface RecaptchaVerificationResult {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  'error-codes'?: string[];
}

/**
 * Verifies a reCAPTCHA token with Google's reCAPTCHA API
 * @param token - The reCAPTCHA token from the frontend
 * @returns Promise<RecaptchaVerificationResult> - The verification result
 */
export async function verifyRecaptcha(token: string): Promise<RecaptchaVerificationResult> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  
  if (!secretKey) {
    throw new Error('RECAPTCHA_SECRET_KEY is not configured');
  }

  if (!token) {
    return { success: false, 'error-codes': ['missing-input-response'] };
  }

  return new Promise((resolve, reject) => {
    const postData = new URLSearchParams({
      secret: secretKey,
      response: token
    }).toString();

    const options = {
      hostname: 'www.google.com',
      port: 443,
      path: '/recaptcha/api/siteverify',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const result: RecaptchaVerificationResult = JSON.parse(data);
          resolve(result);
        } catch (error) {
          reject(new Error('Failed to parse reCAPTCHA response'));
        }
      });
    });

    req.on('error', (error) => {
      reject(new Error(`reCAPTCHA verification failed: ${error.message}`));
    });

    req.write(postData);
    req.end();
  });
}

/**
 * Validates a reCAPTCHA token and throws an error if invalid
 * @param token - The reCAPTCHA token from the frontend
 * @throws Error if reCAPTCHA verification fails
 */
export async function validateRecaptcha(token: string): Promise<void> {
  try {
    const result = await verifyRecaptcha(token);
    
    if (!result.success) {
      const errorCodes = result['error-codes'] || [];
      
      // Map error codes to user-friendly messages
      const errorMessages: { [key: string]: string } = {
        'missing-input-secret': 'reCAPTCHA configuration error',
        'invalid-input-secret': 'reCAPTCHA configuration error',
        'missing-input-response': 'Please complete the reCAPTCHA verification',
        'invalid-input-response': 'reCAPTCHA verification failed. Please try again.',
        'bad-request': 'reCAPTCHA verification failed. Please try again.',
        'timeout-or-duplicate': 'reCAPTCHA has expired. Please try again.'
      };
      
      const errorMessage = errorCodes.length > 0 && errorMessages[errorCodes[0]]
        ? errorMessages[errorCodes[0]]
        : 'reCAPTCHA verification failed. Please try again.';
      
      throw new Error(errorMessage);
    }
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('reCAPTCHA verification failed. Please try again.');
  }
}