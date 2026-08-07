/**
 * Minimal EmailJS client using their plain REST API (no @emailjs/browser SDK dependency needed).
 * Docs: https://www.emailjs.com/docs/rest-api/send/
 */

const EMAILJS_ENDPOINT = 'https://api.emailjs.com/api/v1.0/email/send';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const CONTACT_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID;
const AUTOREPLY_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export interface ContactSubmission {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
}

export function isEmailJsConfigured(): boolean {
    return Boolean(SERVICE_ID && CONTACT_TEMPLATE_ID && AUTOREPLY_TEMPLATE_ID && PUBLIC_KEY);
}

async function sendTemplate(templateId: string, templateParams: Record<string, string>): Promise<void> {
    const response = await fetch(EMAILJS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            service_id: SERVICE_ID,
            template_id: templateId,
            user_id: PUBLIC_KEY,
            template_params: templateParams,
        }),
    });

    if (!response.ok) {
        const body = await response.text();

        throw new Error(`EmailJS request failed (${response.status}): ${body}`);
    }
}

/**
 * Sends the contact-form submission as two separate EmailJS emails:
 * one notifying the business, one auto-replying to the visitor.
 */
export async function sendContactFormEmails(submission: ContactSubmission): Promise<void> {
    if (!SERVICE_ID || !CONTACT_TEMPLATE_ID || !AUTOREPLY_TEMPLATE_ID || !PUBLIC_KEY) {
        throw new Error('EmailJS is not configured. Set the VITE_EMAILJS_* environment variables and rebuild.');
    }

    const templateParams = {
        from_name: submission.name,
        from_email: submission.email,
        phone: submission.phone,
        subject: submission.subject,
        message: submission.message,
    };

    await sendTemplate(CONTACT_TEMPLATE_ID, templateParams);
    await sendTemplate(AUTOREPLY_TEMPLATE_ID, templateParams);
}
