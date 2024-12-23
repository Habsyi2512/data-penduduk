import React, { MouseEventHandler } from 'react';

interface ButtonProps {
    children: React.ReactNode;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    className?: string;
    type?: 'button' | 'reset' | 'submit';
    disabled?: boolean;
    btnColor?: 'red' | 'green' | 'blue';
}

export default function Button({
    onClick,
    children,
    className = '',
    type = 'button',
    disabled = false,
    btnColor = 'blue',
}: ButtonProps) {
    return (
        <button
            disabled={disabled}
            className={` ${className} ${disabled && 'cursor-not-allowed opacity-50'} 
            rounded-md bg-${btnColor}-500 hover:bg-${btnColor}-600 disabled:bg-gray-400 active:bg-${btnColor}-500 px-4 py-2 text-white
            `}
            type={type}
            onClick={onClick}
        >
            {children}
        </button>
    );
}
