import React from 'react';

interface ThProps extends React.HTMLProps<HTMLTableHeaderCellElement> {
    children: React.ReactNode;
}

export default function Th({ children, className = '', ...props }: ThProps) {
    return (
        <th
            className={`border-b bg-white border-gray-300 px-2 py-5 text-blue-600 text-base text-left font-medium ${className}`}
            {...props}
        >
            {children}
        </th>
    );
}
