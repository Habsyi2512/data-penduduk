import { ErrorMessage, Field } from 'formik';
import React from 'react';
import Label from '../Label';

// contoh name "forms.${index}.nama"

interface InputSelectFieldProps<T> {
    label: string;
    name: string;
    options: T[];
    dataKey?: keyof T;
    onChange: (value: string, data: T[], key: keyof T, name: { id: string; name: string }) => void;
    className?: string;
    index: number;
    [key: string]: any;
}

const InputSelectField = <T extends { id: string | number }>({ label, name, options, dataKey = 'id', onChange, className = '', index, ...rest }: InputSelectFieldProps<T>) => {
    return (
        <div>
            <Label htmlFor={name}>{label}</Label>
            <Field
                as="select"
                name={name}
                id={name}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    const updatedName = name.replace(/(\.[^\.]+)$/, '.id');

                    // Jika nilai kosong dipilih, beri nilai null atau nilai default
                    const value = e.target.value === '' ? 'tidak ada' : e.target.value;

                    onChange(value, options, dataKey, {
                        id: updatedName,
                        name: name,
                    });
                }}
                className={`mb-2 mt-1 block w-full rounded-md border border-blue-300/50 bg-white px-3 py-2 dark:border-gray-500/50 dark:bg-gray-700 dark:focus:ring-gray-800 ${className}`}
                {...rest}
            >
                <option value="tidak ada">Pilih {label}</option>
                {options.map((option) => (
                    <option key={option.id} value={String(option[dataKey])}>
                        {String(option[dataKey])}
                    </option>
                ))}
            </Field>
            <ErrorMessage name={name} component="div" className="text-sm text-red-500" />
        </div>
    );
};

export default InputSelectField;
