import { TrashIcon } from '@/Components/icons/TrashIcon';
import { ButtonHTMLAttributes } from 'react';

interface RedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    onClick: () => void; // Callback fungsi untuk klik tombol
    disabled?: boolean; // Tambahan prop opsional untuk disabled (ini juga sudah ada di ButtonHTMLAttributes)
}

export default function RemoveButton({ className = '', onClick, disabled = false, ...props }: RedButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className={`flex aspect-square w-10 flex-1 items-center justify-center rounded-md bg-red-500 text-white hover:bg-red-600 disabled:cursor-not-allowed disabled:bg-gray-500 ${className}`}
            {...props}
        >
            <TrashIcon className="h-5 w-5" />
        </button>
    );
}
