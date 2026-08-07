import { Quote } from 'lucide-react';

const leaders = [
    {
        image: '/images/founders/hafiz-bashir.jpeg',
        role: 'Founder & Chairman',
        message:
            'Hafiz Bashir Ahmad founded Nooria Travels in 2006 and served as its CEO for many years, building it into a trusted name in the travel trade through honest guidance and dedicated service. Today he continues to guide the company as Chairman.',
        name: 'Hafiz Bashir Ahmad',
        title: 'Founder & Chairman, Nooria Travels',
    },
    {
        image: '/images/founders/arshad-hussain.jpeg',
        role: 'Owner & CEO',
        message:
            "Reflecting on the trust travelers have placed in Nooria Travels since 2006, I remain committed to the same values my father built this company on — competent, dedicated and professionally experienced service. We don't see the people we serve as customers, but as family.",
        name: 'M. Arshad Hussain Hashmi',
        title: 'Owner & CEO, Nooria Travels',
    },
];

export default function ChairmanMessageSection() {
    return (
        <section data-aos="fade-up" className="bg-brand-navy relative overflow-hidden py-14">
            <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <p className="text-brand-gold text-sm font-semibold tracking-wide uppercase">Our Leadership</p>
                    <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">Guided by Family, Built on Trust</h2>
                </div>

                <div className="mt-10 grid gap-6 lg:grid-cols-2">
                    {leaders.map((leader) => (
                        <div
                            key={leader.name}
                            className="rounded-3xl border border-white/15 bg-white/10 p-6 text-center shadow-2xl backdrop-blur-md sm:p-8"
                        >
                            <img
                                src={leader.image}
                                alt={leader.name}
                                loading="lazy"
                                decoding="async"
                                className="ring-brand-gold/40 mx-auto h-20 w-20 rounded-full object-cover ring-4"
                            />

                            <p className="text-brand-gold mt-6 text-sm font-semibold tracking-wide uppercase">{leader.role}</p>
                            <Quote className="mx-auto mt-4 h-9 w-9 text-white/40" />
                            <p className="mt-4 text-sm leading-relaxed text-white/90 sm:text-base">{leader.message}</p>

                            <p className="mt-6 text-sm font-semibold text-white">{leader.name}</p>
                            <p className="text-xs text-white/60">{leader.title}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
