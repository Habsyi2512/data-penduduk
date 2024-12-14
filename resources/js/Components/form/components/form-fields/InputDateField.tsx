import React from 'react';
import { Field, ErrorMessage } from 'formik';
import Label from '../Label';

interface InputDateFieldProps {
    label: string; // Label untuk input
    name: string; // Nama field (untuk Formik)
    className?: string; // Tambahan kelas CSS opsional
    [key: string]: any; // Props tambahan seperti value, onChange, dll.
}

const InputDateField: React.FC<InputDateFieldProps> = ({
    label,
    name,
    className = '',
    ...rest
}) => {
    return (
        <div>
            <Label htmlFor={name}>{label}</Label>
            <Field
                type="date"
                name={name}
                id={name}
                className={`mb-2 mt-1 block w-full rounded-md border border-blue-300/50 bg-white px-3 py-2 dark:border-gray-500/50 dark:bg-gray-700 dark:focus:ring-gray-800 ${className}`}
                {...rest}
            />
            <ErrorMessage
                name={name}
                component="div"
                className="text-sm text-red-500"
            />
        </div>
    );
};

export default InputDateField;
