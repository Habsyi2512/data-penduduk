export default function Box({
    children,
    props = {},  // Default props to an empty object
    className = '',
}: {
    children: React.ReactNode;
    props?: React.HTMLProps<HTMLDivElement>; // Update type to accept any HTML props
    className?: string;
}) {
    return (
        <div
            {...props}
            className={`${className} w-full relative z-0 overflow-auto rounded-lg border border-blue-200 bg-white/70 dark:bg-white/20 shadow-md backdrop-blur-md dark:border-gray-500/50`}
        >
            {children}
        </div>
    );
}
