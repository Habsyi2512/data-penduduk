import React from 'react';


interface TableProps extends React.HTMLProps<HTMLTableElement> {
    children: React.ReactNode;
    className?: string; // className is optional
}

export default function Table({ children, className = '', ...props }: TableProps) {
    return (
        <table className={`w-full table-auto ${className}`} {...props}>
            {children}
        </table>
    );
}
