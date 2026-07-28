import { CalendarCheck, MessageCircle, Plane, Users } from 'lucide-react';

const steps = [
    { icon: MessageCircle, title: 'Inquiry', description: 'Share your travel plans with us.' },
    { icon: Users, title: 'Consultation', description: 'Our experts will guide you to the best options.' },
    { icon: CalendarCheck, title: 'Booking', description: 'Confirm your booking with an easy & secure process.' },
    { icon: Plane, title: 'Travel', description: 'Enjoy a comfortable and memorable journey.' },
];

export default function BookingProcessSection() {
    return (
        <div data-aos="fade-left" className="relative z-10 rounded-2xl bg-gray-50 p-8">
            <h2 className="text-brand-navy text-center text-2xl font-bold">Our Booking Process</h2>
            <div className="bg-brand-gold mx-auto mt-3 h-1 w-16 rounded-full" />

            <div className="relative mt-10 grid gap-8 sm:grid-cols-4">
                <div className="absolute top-5 right-8 left-8 hidden border-t-2 border-dashed border-gray-300 sm:block" />
                {steps.map((step, index) => (
                    <div key={step.title} className="group relative flex flex-col items-center text-center">
                        <div className="bg-brand-navy relative z-10 flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white transition-transform duration-300 group-hover:scale-110">
                            {index + 1}
                        </div>
                        <step.icon className="text-brand-blue mt-3 h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
                        <p className="text-brand-navy mt-2 text-sm font-semibold">{step.title}</p>
                        <p className="mt-1 text-xs text-gray-600">{step.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
