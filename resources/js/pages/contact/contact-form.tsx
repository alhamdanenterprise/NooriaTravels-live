import InputError from '@/components/input-error';
import { type SharedData } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { RiSendPlaneFill } from '@remixicon/react';
import { CheckCircle2, ChevronDown, LoaderCircle } from 'lucide-react';
import { type FormEventHandler, useRef, useState } from 'react';

const subjects = ['General Inquiry', 'Umrah Packages', 'Visit Visa', 'Air Ticketing', 'Hotels & Accommodation', 'Transportation', 'Tour Packages'];

interface ContactFormData {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    website: string;
}

const inputClasses =
    'focus:border-brand-blue focus:ring-brand-blue/30 w-full rounded-md border border-gray-200 px-4 py-2.5 text-sm text-gray-900 transition placeholder:text-gray-400 focus:ring-2 focus:outline-none';

export default function ContactForm() {
    const { flash } = usePage<SharedData>().props;
    const { data, setData, post, processing, errors, reset } = useForm<ContactFormData>({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        website: '',
    });

    const [successMessage, setSuccessMessage] = useState(flash.success ?? null);
    const dismissTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('contact.store'), {
            preserveScroll: true,
            onSuccess: (page) => {
                reset('name', 'email', 'phone', 'subject', 'message');

                const message = (page.props as SharedData).flash.success ?? null;
                setSuccessMessage(message);

                if (dismissTimer.current) {
                    clearTimeout(dismissTimer.current);
                }
                dismissTimer.current = setTimeout(() => setSuccessMessage(null), 6000);
            },
        });
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

            <form onSubmit={submit} className="mt-6 space-y-5">
                {/* Honeypot: hidden from real visitors, simple bots that auto-fill every field trip the "prohibited" rule server-side. */}
                <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
                    <label htmlFor="website">Website</label>
                    <input
                        id="website"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={data.website}
                        onChange={(e) => setData('website', e.target.value)}
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
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
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
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
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
                            value={data.phone}
                            onChange={(e) => setData('phone', e.target.value)}
                            className={inputClasses}
                            placeholder="+966 5X XXX XXXX"
                        />
                        <InputError message={errors.phone} className="mt-1.5" />
                    </div>

                    <div>
                        <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-gray-700">
                            Interested In
                        </label>
                        <div className="relative">
                            <select
                                id="subject"
                                value={data.subject}
                                onChange={(e) => setData('subject', e.target.value)}
                                className={`${inputClasses} appearance-none pr-10`}
                            >
                                <option value="" disabled>
                                    Select a subject
                                </option>
                                {subjects.map((subject) => (
                                    <option key={subject} value={subject}>
                                        {subject}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="pointer-events-none absolute top-1/2 right-3.5 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        </div>
                        <InputError message={errors.subject} className="mt-1.5" />
                    </div>
                </div>

                <div>
                    <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-gray-700">
                        Message
                    </label>
                    <textarea
                        id="message"
                        rows={5}
                        value={data.message}
                        onChange={(e) => setData('message', e.target.value)}
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
