import { Combobox, ComboboxInput, ComboboxOptions } from '@headlessui/react';
import { ErrorMessage } from 'formik';
import React from 'react';
import Label from '../Label';

interface DynamicComboboxProps {
    children: React.ReactNode;
    label?: string;
    value?: string;
    name: string;
    placeholder: string;
    handleComboboxChange?: (value: string) => void;
    handleInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClose?: () => void;
    parentClassName?: string;
}

const DynamicCombobox: React.FC<DynamicComboboxProps> = ({ children, parentClassName, label, value, handleComboboxChange, onClose, handleInputChange, name, placeholder }) => {
    return (
        <div className={`relative ${parentClassName}`}>
            <Label htmlFor={name}>{label || 'Label Here'}</Label>
            <Combobox
                value={value}
                onChange={(value: string) => {
                    handleComboboxChange && handleComboboxChange(value);
                }}
                onClose={onClose}
            >
                <ComboboxInput placeholder={placeholder} autoComplete="off" className="relative dark:border-gray-500/50 dark:bg-gray-700 dark:focus:ring-gray-800 w-full rounded-md border border-blue-200 p-2" name={name} aria-label="Assignee" onChange={handleInputChange} />
                <ComboboxOptions className="absolute mt-2 w-full overflow-hidden rounded-md border border-blue-700/50 shadow empty:invisible">{children}</ComboboxOptions>
            </Combobox>
            <ErrorMessage name={name} component="div" className="text-sm text-red-500" />
        </div>
    );
};

export default DynamicCombobox;
