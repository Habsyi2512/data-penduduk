import React from 'react';

export default function FormHeaderAction({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-full w-auto space-x-3">{children}</div>
    );
}
