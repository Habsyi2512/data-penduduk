import useSearchSuggestions from '@/hooks/useSearchSuggestions';
import { TypeFormFieldBuatKK, TypeSuggestions } from '@/interface/interface';
import { CommonFormikProps } from '@/interface/pageprops/interface';
import { FormikProps } from 'formik';
import React, { useState } from 'react';

export default function useHandleChangeEvents() {
    const [suggestions, setSuggestions] = useState<TypeSuggestions>({ desa: [], NIK: [], KK: [] });
    const { fetchSuggestions } = useSearchSuggestions();

    const handleKepalaKeluargaInputChange = async <T = TypeFormFieldBuatKK,>(e: React.ChangeEvent<HTMLInputElement>, formik: FormikProps<T>, callBack?: () => void) => {
        const { value, name } = e.target;
        if (callBack) {
            callBack();
        }
        formik.setFieldValue(name, value);
        const data = await fetchSuggestions(value, 'searchNIK');
        setSuggestions((prev) => ({ ...prev, NIK: data }));
    };

    const handleKKInputChange = async <T = CommonFormikProps,>(e: React.ChangeEvent<HTMLInputElement>, formik: FormikProps<T>, callBack?: () => void) => {
        const { value, name } = e.target;
        if (callBack) {
            callBack();
        }
        formik.setFieldValue(name, value);
        const data = await fetchSuggestions(value, 'searchKK');
        setSuggestions((prev) => ({ ...prev, KK: data }));
    };

    const handleVillageInputChange = async (e: React.ChangeEvent<HTMLInputElement>, formik: FormikProps<TypeFormFieldBuatKK>) => {
        const { value, name } = e.target;
        if (value == '') {
            formik.setFieldValue('kecamatan.name', '');
            formik.setFieldValue('kabupaten.name', '');
        }
        formik.setFieldValue(name, value);
        const data = await fetchSuggestions(value, 'searchDesa');
        setSuggestions((prev) => ({ ...prev, desa: data }));
    };
    return { handleKepalaKeluargaInputChange, handleKKInputChange, handleVillageInputChange, suggestions, setSuggestions };
}
