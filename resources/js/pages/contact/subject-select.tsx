import * as SelectPrimitive from '@radix-ui/react-select';
import { Check, ChevronDown, Tag } from 'lucide-react';

const subjects = ['General Inquiry', 'Umrah Packages', 'Visit Visa', 'Air Ticketing', 'Hotels & Accommodation', 'Transportation', 'Tour Packages'];

export default function SubjectSelect({ value, onChange }: { value: string; onChange: (value: string) => void }) {
    return (
        <SelectPrimitive.Root value={value} onValueChange={onChange}>
            <SelectPrimitive.Trigger
                id="subject"
                className="group focus:border-brand-blue focus:ring-brand-blue/30 flex w-full items-center justify-between gap-2 rounded-md border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 transition focus:ring-2 focus:outline-none data-[placeholder]:text-gray-400"
            >
                <span className="flex items-center gap-2 truncate">
                    <Tag className="h-4 w-4 shrink-0 text-gray-400" />
                    <SelectPrimitive.Value placeholder="Select a subject" />
                </span>
                <SelectPrimitive.Icon asChild>
                    <ChevronDown className="h-4 w-4 shrink-0 text-gray-400 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </SelectPrimitive.Icon>
            </SelectPrimitive.Trigger>

            <SelectPrimitive.Portal>
                <SelectPrimitive.Content
                    position="popper"
                    side="bottom"
                    avoidCollisions={false}
                    sideOffset={8}
                    className="animate-in fade-in-0 slide-in-from-top-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-top-2 z-50 max-h-[min(20rem,var(--radix-select-content-available-height))] w-[var(--radix-select-trigger-width)] overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl duration-200"
                >
                    <SelectPrimitive.Viewport className="max-h-[inherit] overflow-y-auto p-1.5">
                        {subjects.map((subject) => (
                            <SelectPrimitive.Item
                                key={subject}
                                value={subject}
                                className="hover:bg-brand-navy/5 data-[highlighted]:bg-brand-navy/5 data-[state=checked]:text-brand-navy relative flex cursor-pointer items-center justify-between rounded-md px-3 py-2.5 text-sm text-gray-700 outline-none select-none data-[state=checked]:font-semibold"
                            >
                                <SelectPrimitive.ItemText>{subject}</SelectPrimitive.ItemText>
                                <SelectPrimitive.ItemIndicator>
                                    <Check className="text-brand-gold h-4 w-4" />
                                </SelectPrimitive.ItemIndicator>
                            </SelectPrimitive.Item>
                        ))}
                    </SelectPrimitive.Viewport>
                </SelectPrimitive.Content>
            </SelectPrimitive.Portal>
        </SelectPrimitive.Root>
    );
}
