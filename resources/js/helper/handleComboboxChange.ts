import { TypeFormFieldBuatKK, TypeSuggestions } from '@/interface/interface';
import { CommonFormikProps } from '@/interface/pageprops/interface';
import { FormikProps } from 'formik';

export const handleComboboxChangeDesa = (value: string, formik: FormikProps<TypeFormFieldBuatKK>, suggestions: TypeSuggestions, setSuggestions: React.Dispatch<React.SetStateAction<TypeSuggestions>>) => {
    const selectedVillage = suggestions.desa.find((village) => village.name === value);
    if (selectedVillage) {
        formik.setFieldValue('kelurahan.name', selectedVillage.name);
        formik.setFieldValue('kelurahan.id', selectedVillage.id);
        formik.setFieldValue('kecamatan.name', selectedVillage.district.name);
        formik.setFieldValue('kecamatan.id', selectedVillage.district.id);
        formik.setFieldValue('kabupaten.name', selectedVillage.district.regency.name);
        formik.setFieldValue('kabupaten.id', selectedVillage.district.regency.id);
        formik.setFieldTouched('kecamatan.name', false, true);
        formik.setFieldTouched('kabupaten.name', false, true);
    }

    setSuggestions((prev) => {
        return { ...prev, desa: [] };
    });
};

export const handleComboboxChangeNIK = <T = TypeFormFieldBuatKK>(value: string, formik: FormikProps<T>, suggestions: TypeSuggestions, setSuggestions: React.Dispatch<React.SetStateAction<TypeSuggestions>>) => {
    const selectedPerson = suggestions.NIK.find((person) => person.nik === value);
    if (selectedPerson) {
        formik.setFieldValue('kepala_keluarga_nik', selectedPerson.nik);
        formik.setFieldValue('no_kk_semula', selectedPerson.no_kk);
        formik.setFieldTouched('kepala_keluarga_nik', false, true);
        formik.setFieldTouched('no_kk_semula', false, true);
    }

    setSuggestions((prev: TypeSuggestions) => ({
        ...prev,
        NIK: [],
    }));
};

export const handleComboboxChangeKK = <T = CommonFormikProps>(value: string, formik: FormikProps<T>, suggestions: TypeSuggestions, setSuggestions: React.Dispatch<React.SetStateAction<TypeSuggestions>>) => {
    const selectedData = suggestions.KK.find((data) => data.no_kk === value);
    // if (selectedData) {
    //     formik.setFieldValue('kepala_keluarga_nik', selectedData.no_kk);
    //     formik.setFieldValue('no_kk_semula', selectedData.no_kk);
    //     formik.setFieldTouched('kepala_keluarga_nik', false, true);
    //     formik.setFieldTouched('no_kk_semula', false, true);
    // }

    setSuggestions((prev: TypeSuggestions) => ({
        ...prev,
        KK: [],
    }));
};
