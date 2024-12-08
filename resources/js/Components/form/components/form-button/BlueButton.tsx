import { ButtonHTMLAttributes } from 'react';

interface BlueButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    isOpen: boolean; // Status apakah accordion terbuka atau tertutup
    onClick: () => void; // Callback fungsi untuk klik tombol
}

export default function BlueButton({
    isOpen,
    onClick,
    className = '',
    ...props
}: BlueButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`w-20 rounded-md border border-blue-300/50 bg-blue-100 p-2 text-blue-600 dark:bg-gray-700 dark:text-gray-300 hover:dark:border-gray-500/50 dark:hover:bg-gray-600 ${className}`}
            {...props}
        >
            {isOpen ? 'Tutup' : 'Buka'}
        </button>
    );
}
