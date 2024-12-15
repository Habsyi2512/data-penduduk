import { Field } from 'formik';
import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    // className sudah termasuk dalam InputHTMLAttributes, jadi kamu tidak perlu mendeklarasikannya ulang
}

export default function InputText({
    className,
    type = 'text',
    ...props
}: InputProps) {
    return (
        <Field
            {...props}
            className={`mt-1 block w-full rounded-md border border-blue-300/50 bg-white px-3 py-2 dark:border-gray-500/50 dark:bg-gray-700 dark:focus:ring-gray-800 ${className}`}
            type={type}
        />
    );
}
