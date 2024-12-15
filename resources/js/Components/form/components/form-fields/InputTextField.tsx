import { CommonFormikProps } from '@/interface/pageprops/interface';
import { ErrorMessage } from 'formik';
import React from 'react';
import InputText from '../InputText';
import Label from '../Label';

interface InputTextFieldProps {
    label: string;
    name: string;
    disabled?: boolean;
    type?: 'hidden' | 'text';
    className?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    parentClassName?: string;
    formik?: CommonFormikProps;
    children?: React.ReactNode; // Menambahkan props children
    [key: string]: any;
}

const InputTextField: React.FC<InputTextFieldProps> = ({
    label,
    name,
    disabled = false,
    className = '',
    parentClassName = '',
    type = 'text',
    children,
    onChange,
    formik,
    ...rest
}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (formik) {
            formik.handleChange(e);
        }
        if (onChange) {
            onChange(e);
        }
    };
    return (
        <div className={`${parentClassName} ${type}`}>
            <Label htmlFor={name}>{label}</Label>
            <InputText
                autoComplete="off"
                type={type}
                name={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleChange(e);
                }}
                disabled={disabled}
                className={`mb-2 block w-full rounded-md ${
                    disabled &&
                    'disabled:cursor-not-allowed disabled:bg-gray-200'
                } ${className}`}
                {...rest}
            />
            <ErrorMessage
                name={name}
                component="div"
                className="text-sm text-red-500"
            />
            {/* Render komponen tambahan secara dinamis */}
            {children}
        </div>
    );
};

export default InputTextField;
