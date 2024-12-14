import React from 'react';
import { ErrorMessage } from 'formik';
import Label from '../Label';
import InputText from '../InputText';

interface InputTextFieldProps {
    label: string; // Label text untuk input
    name: string; 
    disabled?: boolean; // Opsional, menentukan apakah input dinonaktifkan
    className?: string; // Tambahan kelas CSS
    [key: string]: any; // Untuk props tambahan seperti onChange, value, dll.
}

const InputTextField: React.FC<InputTextFieldProps> = ({
    label,
    name,
    disabled = false,
    className = '',
    ...rest
}) => {
    return (
        <div>
            <Label htmlFor={name}>{label}</Label>
            <InputText
                type="text"
                name={name}
                disabled={disabled}
                className={`mb-2 block w-full rounded-md ${
                    disabled && 'disabled:cursor-not-allowed disabled:bg-gray-200' 
                } ${className}`}
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

export default InputTextField;
