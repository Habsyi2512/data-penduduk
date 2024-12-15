import { TooltipContent } from '@radix-ui/react-tooltip';
import { Tooltip, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

export default function TooltipDemo({
    value,
    content,
}: {
    value: string | JSX.Element;
    content: string | JSX.Element;
}) {
    return (
        <TooltipProvider delayDuration={100}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <p className="truncate">{value}</p>
                </TooltipTrigger>
                {/* Menambahkan kelas Tailwind untuk styling */}
                <TooltipContent className="rounded-md border border-gray-400 bg-white/20 px-5 py-2 shadow backdrop-blur-sm">
                    <p className="font-bold text-gray-600">{content}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
