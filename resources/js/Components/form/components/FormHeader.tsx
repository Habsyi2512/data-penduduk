import React from 'react';

export default function FormHeader({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex items-center justify-between p-5">{children}</div>
    );
}
