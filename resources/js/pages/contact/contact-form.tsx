import InputError from '@/components/input-error';
import { isEmailJsConfigured, sendContactFormEmails } from '@/lib/emailjs';
import SubjectSelect from '@/pages/contact/subject-select';
import { RiSendPlaneFill } from '@remixicon/react';
import { AlertCircle, CheckCircle2, LoaderCircle } from 'lucide-react';
import { type FormEventHandler, useRef, useState } from 'react';

interface ContactFormData {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    website: string;
}

type ContactFormErrors = Partial<Record<keyof ContactFormData, string>>;

const emptyForm: ContactFormData = { name: '', email: '', phone: '', subject: '', message: '', website: '' };

const inputClasses =
    'focus:border-brand-blue focus:ring-brand-blue/30 w-full rounded-md border border-gray-200 px-4 py-2.5 text-sm text-gray-900 transition placeholder:text-gray-400 focus:ring-2 focus:outline-none';

const MAX_MESSAGE_WORDS = 500;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[0-9]{6,20}$/;

function countWords(value: string): number {
    return value.trim().length === 0 ? 0 : value.trim().split(/\s+/).length;
}

function limitWords(value: string, maxWords: number): string {
    const words = value.split(/(\s+)/);
    let wordCount = 0;

    for (let i = 0; i < words.length; i++) {
        if (words[i].trim() !== '') {
            wordCount++;

            if (wordCount > maxWords) {
                return words.slice(0, i).join('');
            }
        }
    }

    return value;
}

function validate(data: ContactFormData): ContactFormErrors {
    const errors: ContactFormErrors = {};

    if (!data.name.trim()) {
        errors.name = 'The name field is required.';
    } else if (data.name.length > 100) {
        errors.name = 'The name may not be greater than 100 characters.';
    }

    if (!data.email.trim()) {
        errors.email = 'The email field is required.';
    } else if (!EMAIL_PATTERN.test(data.email)) {
        errors.email = 'Please enter a valid email address.';
    } else if (data.email.length > 100) {
        errors.email = 'The email may not be greater than 100 characters.';
    }

    if (!data.phone.trim()) {
        errors.phone = 'The phone field is required.';
    } else if (!PHONE_PATTERN.test(data.phone)) {
        errors.phone = 'Please enter a valid phone number (6-20 digits).';
    }

    if (!data.subject) {
        errors.subject = 'Please select a subject.';
    }

    if (!data.message.trim()) {
        errors.message = 'The message field is required.';
    } else if (countWords(data.message) > MAX_MESSAGE_WORDS) {
        errors.message = `The message may not contain more than ${MAX_MESSAGE_WORDS} words.`;
    }

    return errors;
}

export default function ContactForm() {
    const [data, setData] = useState<ContactFormData>(emptyForm);
    const [errors, setErrors] = useState<ContactFormErrors>({});
    const [processing, setProcessing] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const dismissTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const setField = <K extends keyof ContactFormData>(key: K, value: ContactFormData[K]) => {
        setData((current) => ({ ...current, [key]: value }));
    };

    const flashMessage = (setter: typeof setSuccessMessage, message: string) => {
        setSuccessMessage(null);
        setErrorMessage(null);
        setter(message);

        if (dismissTimer.current) {
            clearTimeout(dismissTimer.current);
        }
        dismissTimer.current = setTimeout(() => {
            setSuccessMessage(null);
            setErrorMessage(null);
        }, 6000);
    };

    const submit: FormEventHandler = async (e) => {
        e.preventDefault();

        // Honeypot: real visitors never fill this. Silently drop the submission for bots
        // without giving any indication back to them that it was rejected.
        if (data.website.trim() !== '') {
            return;
        }

        const validationErrors = validate(data);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        if (!isEmailJsConfigured()) {
            flashMessage(setErrorMessage, 'The contact form is not fully configured yet. Please reach us on WhatsApp in the meantime.');
            return;
        }

        setProcessing(true);

        try {
            await sendContactFormEmails({
                name: data.name,
                email: data.email,
                phone: data.phone,
                subject: data.subject,
                message: data.message,
            });

            setData(emptyForm);
            setErrors({});
            flashMessage(setSuccessMessage, "Thank you for reaching out! We'll get back to you shortly.");
        } catch {
            flashMessage(setErrorMessage, 'Sorry, something went wrong sending your message. Please try again or reach us directly on WhatsApp.');
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div data-aos="fade-left" className="rounded-2xl border border-gray-100 bg-white p-6 shadow-md sm:p-8">
            <h2 className="text-brand-navy text-2xl font-bold">Send Us a Message</h2>
            <p className="mt-2 text-sm text-gray-600">Fill out the form below and our team will get back to you shortly.</p>

            {successMessage && (
                <div className="mt-5 flex items-center gap-2 rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700 transition-opacity duration-500">
                    <CheckCircle2 className="h-5 w-5 shrink-0" />
                    {successMessage}
                </div>
            )}

            {errorMessage && (
                <div className="mt-5 flex items-center gap-2 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 transition-opacity duration-500">
                    <AlertCircle className="h-5 w-5 shrink-0" />
                    {errorMessage}
                </div>
            )}

            <form onSubmit={submit} className="mt-6 space-y-5" noValidate>
                {/* Honeypot: hidden from real visitors, simple bots that auto-fill every field trip this up. */}
                <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
                    <label htmlFor="website">Website</label>
                    <input
                        id="website"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={data.website}
                        onChange={(e) => setField('website', e.target.value)}
                    />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                        <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-gray-700">
                            Full Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            maxLength={100}
                            value={data.name}
                            onChange={(e) => setField('name', e.target.value)}
                            className={inputClasses}
                            placeholder="Your full name"
                        />
                        <InputError message={errors.name} className="mt-1.5" />
                    </div>

                    <div>
                        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-700">
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            maxLength={100}
                            value={data.email}
                            onChange={(e) => setField('email', e.target.value)}
                            className={inputClasses}
                            placeholder="you@example.com"
                        />
                        <InputError message={errors.email} className="mt-1.5" />
                    </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                        <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-gray-700">
                            Phone / WhatsApp Number
                        </label>
                        <input
                            id="phone"
                            type="text"
                            inputMode="numeric"
                            maxLength={20}
                            value={data.phone}
                            onChange={(e) => setField('phone', e.target.value.replace(/\D/g, ''))}
                            className={inputClasses}
                            placeholder="923001234567"
                        />
                        <InputError message={errors.phone} className="mt-1.5" />
                    </div>

                    <div>
                        <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-gray-700">
                            Interested In
                        </label>
                        <SubjectSelect value={data.subject} onChange={(value) => setField('subject', value)} />
                        <InputError message={errors.subject} className="mt-1.5" />
                    </div>
                </div>

                <div>
                    <div className="mb-1.5 flex items-center justify-between">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                            Message
                        </label>
                        <span className="text-xs text-gray-400">
                            {countWords(data.message)} / {MAX_MESSAGE_WORDS} words
                        </span>
                    </div>
                    <textarea
                        id="message"
                        rows={5}
                        value={data.message}
                        onChange={(e) => setField('message', limitWords(e.target.value, MAX_MESSAGE_WORDS))}
                        className={inputClasses}
                        placeholder="Tell us about your travel plans..."
                    />
                    <InputError message={errors.message} className="mt-1.5" />
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="bg-brand-gold flex w-full items-center justify-center gap-2 rounded-md px-6 py-3 text-sm font-semibold text-white transition duration-200 hover:scale-[1.02] hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {processing ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <RiSendPlaneFill className="h-4 w-4" />}
                    Send Message
                </button>
            </form>
        </div>
    );
}
