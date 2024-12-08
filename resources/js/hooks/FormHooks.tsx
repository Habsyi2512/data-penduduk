import { InputPendudukProps } from '@/interface/interface';
import { FormikProps } from 'formik';
import React, { SetStateAction, useState } from 'react';

export const useFormHooks = () => {
    const [suggestions, setSuggestions] = useState<{ [key: number]: string[] }>(
        {},
    );
    const [queries, setQueries] = useState<{ [key: number]: string }>({});
    const [regency, setRegency] = useState<{
        [key: number]: { regency_id: string; regency_name: string };
    }>({});
    const [district, setDistrict] = useState<{
        [key: number]: { district_id: string; district_name: string };
    }>({});

    React.useEffect(() => {
        console.log('queris = ', queries);
    }, [queries]);

    const fetchSuggestions = async (searchQuery: string, index: number) => {
        try {
            const response = await fetch(
                `/api/search-village?q=${searchQuery}`,
            );
            const data = await response.json();
            setSuggestions((prevState) => ({
                ...prevState,
                [index]: data, // Menyimpan suggestions per index
            }));
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        }
    };

    const handleAddForm = (
        push: <X = any>(obj: X) => void,
        setOpenByIdx: React.Dispatch<SetStateAction<boolean[]>>,
        formField: InputPendudukProps,
        formik: FormikProps<{ forms: InputPendudukProps[] }>,
    ) => {
        push<InputPendudukProps>(formField);
        setOpenByIdx((prevState) => [...prevState, true]);
        setQueries((prevQueries) => ({
            ...prevQueries,
            [formik.values.forms.length]: '', // Reset untuk index baru
        }));
    };

    const handleRegencyChange = (
        index: number,
        selectedRegency: { regency_id: string; regency_name: string },
    ) => {
        setRegency((prev) => ({
            ...prev,
            [index]: selectedRegency,
        }));
    };

    const handleDistrictChange = (
        index: number,
        selectedDistrict: { district_id: string; district_name: string },
    ) => {
        setDistrict((prev) => ({
            ...prev,
            [index]: selectedDistrict,
        }));
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number,
        formik: FormikProps<{ forms: InputPendudukProps[] }>,
    ) => {
        const value = e.target.value;
        setQueries((prevState) => ({
            ...prevState,
            [index]: value, // Menyimpan query per index
        }));
        formik.setFieldValue(`forms[${index}].alamat.kelurahan_nama`, value);

        if (value.length > 2) {
            fetchSuggestions(value, index); // Panggil fetchSuggestions untuk index tertentu
        } else {
            setSuggestions((prevState) => ({
                ...prevState,
                [index]: [], // Reset suggestions untuk index tertentu
            }));
        }
    };

    const handleSuggestionClick = (
        suggestion: any,
        index: number,
        formik: FormikProps<{ forms: InputPendudukProps[] }>,
    ) => {
        setQueries((prevState) => ({
            ...prevState,
            [index]: suggestion.name,
        }));

        handleRegencyChange(index, {
            regency_id: suggestion.regency_id,
            regency_name: suggestion.regency_name,
        });

        handleDistrictChange(index, {
            district_id: suggestion.district_id,
            district_name: suggestion.district_name,
        });

        formik.setFieldValue(
            `forms[${index}].alamat.kelurahan_id`,
            suggestion.id,
        );
        formik.setFieldValue(
            `forms[${index}].alamat.kelurahan_nama`,
            suggestion.name,
        );
        formik.setFieldValue(
            `forms[${index}].alamat.kecamatan_nama`,
            suggestion.district_name,
        );
        formik.setFieldValue(
            `forms[${index}].alamat.kabupaten_nama`,
            suggestion.regency_name,
        );
        setSuggestions((prevState) => ({
            ...prevState,
            [index]: [], // Reset suggestions untuk index setelah klik
        }));
    };

    return {
        suggestions,
        setSuggestions,
        fetchSuggestions,
        queries,
        setQueries,
        regency,
        setRegency: handleRegencyChange,
        district,
        setDistrict: handleDistrictChange,
        handleAddForm,
        handleSuggestionClick,
        handleInputChange,
    };
};
