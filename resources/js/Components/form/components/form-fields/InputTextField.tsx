import { ErrorMessage, FormikProps } from 'formik';
import React from 'react';
import InputText from '../InputText';
import Label from '../Label';

interface InputTextFieldProps<T> {
    label: string;
    as?:string;
    name: keyof T | `${string}`; // Nama properti mengikuti key dari Formik values
    disabled?: boolean;
    type?: React.HTMLInputTypeAttribute;
    className?: string;
    parentClassName?: string;
    formik?: FormikProps<T>; // FormikProps menggunakan tipe data dinamis T
    validationMessage?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    children?: React.ReactNode;
    [key: string]: any;
}

const InputTextField = <T,>({
    label,
    as='input',
    name,
    disabled = false,
    type = 'text',
    className = '',
    parentClassName = '',
    formik,
    validationMessage,
    onChange,
    onBlur,
    children,
    ...rest
}: InputTextFieldProps<T>) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (formik?.handleChange) {
            formik.handleChange(e);
        }
        if (onChange) {
            onChange(e);
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        if (formik?.handleBlur) {
            formik.handleBlur(e);
        }
        if (onBlur) {
            onBlur(e);
        }
    };

    return (
        <div className={`${parentClassName} ${type}`}>
            <Label htmlFor={name as string}>{label}</Label>
            <InputText
                autoComplete="off"
                type={type}
                name={name as string}
                as={as}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={disabled}
                className={`mb-2 block w-full rounded-md ${
                    disabled ? 'disabled:cursor-not-allowed disabled:bg-gray-200' : ''
                } ${className}`}
                {...rest}
            />
            {validationMessage ? (
                <div className="text-sm text-red-500">{validationMessage}</div>
            ) : (
                <ErrorMessage
                    name={name as string}
                    component="div"
                    className="text-sm text-red-500"
                />
            )}
            {children}
        </div>
    );
};

export default InputTextField;
