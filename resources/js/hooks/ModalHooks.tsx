import { InputPendudukProps } from '@/interface/interface';
import { FormikProps } from 'formik';
import { SetStateAction, useState } from 'react';


export default function ModalHooks() {
    const handleConfirmModal = (
        remove: <X = any>(index: number) => X | undefined,
        index: number,
        formik: FormikProps<{
            forms: InputPendudukProps[];
        }>,
        setIdx:React.Dispatch<SetStateAction<number>>,
        setisOpenDiscardModal:React.Dispatch<SetStateAction<boolean>>
    ) => {
        console.log('index')
        setIdx(index);
        const formValues = formik.values.forms[index];
        const isEmpty = Object.values(formValues).every((value) => {
            if (typeof value === 'object' && value !== null) {
                return Object.values(value).every((nestedValue) => nestedValue === '' || nestedValue === null);
            }
            return value === '' || value === null;
        });
    
        // Jika semua field kosong, langsung hapus
        if (isEmpty) {
            remove(index);
        } else {
            // Jika ada field yang terisi, buka modal konfirmasi
            setisOpenDiscardModal(true);
        }
    };
    
  return {handleConfirmModal}
}
