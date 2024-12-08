export default function FormContent({
    children,
    isOpen,
}: {
    children: React.ReactNode;
    isOpen: boolean;
}) {
    return (
        <div
            className={`grid transition-all ${
                isOpen
                    ? 'grid-rows-[1fr] opacity-100'
                    : 'grid-rows-[0fr] opacity-0'
            }`}
        >
            <div className="overflow-hidden">
                <div className="p-5">{children}</div>
            </div>
        </div>
    );
}
