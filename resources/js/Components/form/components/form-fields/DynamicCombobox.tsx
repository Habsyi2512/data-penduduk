import { Combobox, ComboboxInput, ComboboxOptions } from '@headlessui/react';
import React from 'react';
import Label from '../Label';

interface DynamicComboboxProps {
    children: React.ReactNode;
    label?: string;
    value?: string;
    name?: string;
    handleComboboxChange?: (value: string) => void;
    handleInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClose?: () => void;
}

const DynamicCombobox: React.FC<DynamicComboboxProps> = ({ children, label, value, handleComboboxChange, onClose, handleInputChange, name }) => {
    return (
        <div className="relative">
            <Label htmlFor={`${name}`}>{label || 'Label Here'}</Label>
            <Combobox
                value={value}
                onChange={(value: string) => {
                    handleComboboxChange && handleComboboxChange(value);
                }}
                onClose={onClose}
            >
                <ComboboxInput autoComplete="off" className="relative w-full rounded-md border border-blue-200 p-2" name={name} aria-label="Assignee" onChange={handleInputChange} />
                <ComboboxOptions className="absolute mt-2 w-full border empty:invisible">{children}</ComboboxOptions>
            </Combobox>
        </div>
    );
};

export default DynamicCombobox;
