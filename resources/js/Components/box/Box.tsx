export default function Box({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full overflow-auto rounded-lg border border-blue-200 bg-white/20 p-5 shadow-md backdrop-blur-md dark:border-gray-500/50">
            {children}
        </div>
    );
}
