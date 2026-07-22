export function whatsappLink(phone: string, message?: string): string {
    const digits = phone.replace(/\D/g, '');
    const text = message ? `?text=${encodeURIComponent(message)}` : '';

    return `https://wa.me/${digits}${text}`;
}
