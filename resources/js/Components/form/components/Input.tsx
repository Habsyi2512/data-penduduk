import { InputHTMLAttributes } from 'react';
import { Field } from 'formik';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    // className sudah termasuk dalam InputHTMLAttributes, jadi kamu tidak perlu mendeklarasikannya ulang
}

export default function InputField({ className, type = "text", ...props }: InputProps) {
    return (
        <Field
            {...props}
            className={`mt-1 bg-white dark:bg-gray-700 block w-full rounded-md border dark:border-gray-500/50 dark:focus:ring-gray-800 border-blue-300/50 px-3 py-2 ${className}`}
            type={type}
        />
    );
}
