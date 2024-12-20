import useSearchSuggestions from '@/hooks/useSearchSuggestions';
import { TypeFormFieldBuatKK, TypeSuggestions } from '@/interface/interface';
import { FormikProps } from 'formik';
import React, { useState } from 'react';

export default function useHandleChangeEvents() {
    const [suggestions, setSuggestions] = useState<TypeSuggestions>({ desa: [], kepalaKeluarga: [] });
    const { fetchSuggestions } = useSearchSuggestions();
    const handleKepalaKeluargaInputChange = async (e: React.ChangeEvent<HTMLInputElement>, formik: FormikProps<TypeFormFieldBuatKK>) => {
        const { value } = e.target;
        if (value == '') {
            formik.setFieldValue('no_kk_semula', '');
        }
        formik.setFieldValue('kepala_keluarga_nik', value);
        const data = await fetchSuggestions(value, 'kepalaKeluarga');
        setSuggestions((prev) => {
            return { ...prev, kepalaKeluarga: data };
        });
    };
    const handleVillageInputChange = async (e: React.ChangeEvent<HTMLInputElement>, formik: FormikProps<TypeFormFieldBuatKK>) => {
        const { value, name } = e.target;
        if (value == '') {
            formik.setFieldValue('kecamatan.name', '');
            formik.setFieldValue('kabupaten.name', '');
        }
        formik.setFieldValue(name, value);
        const data = await fetchSuggestions(value, 'desa');
        setSuggestions((prev) => {
            return { ...prev, desa: data };
        });
    };
    return { handleKepalaKeluargaInputChange, handleVillageInputChange, suggestions, setSuggestions };
}
