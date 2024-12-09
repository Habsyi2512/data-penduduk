import { Tooltip, TooltipProvider, TooltipTrigger } from '../ui/tooltip'
import { TooltipContent } from '@radix-ui/react-tooltip'

export default function TooltipDemo({ value }: { value: string }) {
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <p className="truncate">{value}</p>
        </TooltipTrigger>
        {/* Menambahkan kelas Tailwind untuk styling */}
        <TooltipContent className="bg-white/20 backdrop-blur-sm px-5 py-2 shadow border border-gray-400 rounded-md">
          <p className='font-bold text-gray-600'>{value}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
