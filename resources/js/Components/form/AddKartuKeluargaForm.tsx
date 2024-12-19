import { TypeFormFieldBuatKK, TypeKepalaKeluarga, Village } from '@/interface/interface';
import { validationSchemaBuatKK } from '@/Pages/Form/validation';
import { ComboboxOption } from '@headlessui/react';
import { Link } from '@inertiajs/react';
import { ErrorMessage, Field, Formik, FormikHelpers, FormikProps } from 'formik';
import React, { useState } from 'react';
import Box from '../box/Box';
import Button from '../button/Button';
import { ChevronRightIcon } from '../icons/ChevronRightIcon';
import DynamicCombobox from './components/form-fields/DynamicCombobox';
import InputTextField from './components/form-fields/InputTextField';
import { FormHeader, FormTitle } from './components/FormComponents';
import Label from './components/Label';

interface SuggestionInterface {
    desa: Village[];
    kepalaKeluarga: TypeKepalaKeluarga[];
}

const AddKartuKeluargaForm = () => {
    const [suggestions, setSuggestions] = useState<SuggestionInterface>({ desa: [], kepalaKeluarga: [] });

    const formFieldBuatKK: TypeFormFieldBuatKK = {
        no_kk: '',
        alamat: '',
        rt: '',
        rw: '',
        kepala_keluarga_nik: '',
        no_kk_semula: '',
        kelurahan: { id: 0, name: '' },
        kecamatan: { id: 0, name: '' },
        kabupaten: { id: 0, name: '' },
    };

    const fetchSuggestions = async (query: string, type: 'desa' | 'kepalaKeluarga') => {
        if (query.length < 3) {
            setSuggestions((prev) => ({
                ...prev,
                [type]: [],
            }));
            return;
        }
        try {
            const url = type === 'desa' ? `/search-desa?searchDesa=${query}` : `/search-kepala-keluarga?searchKepalaKeluarga=${query}`;
            const response = await fetch(url);
            const data = await response.json();
            setSuggestions((prev) => ({
                ...prev,
                [type]: data,
            }));
        } catch (error) {
            console.error('Gagal mengambil data:', error);
        }
    };

    const handleKepalaKeluargaInputChange = (e: React.ChangeEvent<HTMLInputElement>, formik: FormikProps<TypeFormFieldBuatKK>) => {
        const { value } = e.target;
        console.log(value);
        if (value == '') {
            formik.setFieldValue('no_kk_semula', '');
        }
        formik.setFieldValue('kepala_keluarga_nik', value);
        fetchSuggestions(value, 'kepalaKeluarga');
    };

    const handleVillageInputChange = (e: React.ChangeEvent<HTMLInputElement>, formik: FormikProps<TypeFormFieldBuatKK>) => {
        const { value, name } = e.target;
        if (value == '') {
            formik.setFieldValue('kecamatan.name', '');
            formik.setFieldValue('kabupaten.name', '');
        }
        formik.setFieldValue(name, value);
        fetchSuggestions(value, 'desa');
    };

    const handleVillageSelect = (village: Village, formik: FormikHelpers<TypeFormFieldBuatKK>) => {
        formik.setFieldValue('kelurahan.name', village.name);
        formik.setFieldValue('kelurahan.id', village.id);
        formik.setFieldValue('kecamatan.name', village.district.name);
        formik.setFieldValue('kecamatan.id', village.district.id);
        formik.setFieldValue('kabupaten.name', village.district.regency.name);
        formik.setFieldValue('kabupaten.id', village.district.regency.id);

        // Set field touched untuk memicu hilangnya pesan error
        formik.setFieldTouched('kecamatan.name', false, true); // Menambahkan ini
        formik.setFieldTouched('kabupaten.name', false, true);

        setSuggestions((prev) => {
            return { ...prev, desa: [] };
        });
    };

    const handleComboboxChange = (value: string, formik: FormikProps<TypeFormFieldBuatKK>, suggestions: SuggestionInterface, setSuggestions: React.Dispatch<React.SetStateAction<SuggestionInterface>>) => {
        const selectedPerson = suggestions.kepalaKeluarga.find((person) => person.nik === value);
        if (selectedPerson) {
            formik.setFieldValue('kepala_keluarga_nik', selectedPerson.nik);
            formik.setFieldValue('no_kk_semula', selectedPerson.no_kk);
        }

        setSuggestions((prev: { desa: Village[]; kepalaKeluarga: TypeKepalaKeluarga[] }) => ({
            ...prev,
            kepalaKeluarga: [],
        }));
    };

    const handleSubmitFormBuatKK = (values: TypeFormFieldBuatKK, { setSubmitting, resetForm }: FormikHelpers<TypeFormFieldBuatKK>) => {
        console.log(values);
        // router.post(
        //     route('kk.store.form'),
        //     {
        //         no_kk: '',
        //         no_kk_semula: values.no_kk_semula,
        //         kepala_keluarga_nik: values.kepala_keluarga_nik,
        //         alamat: values.alamat,
        //         rt: values.rt,
        //         rw: values.rw,
        //         kelurahan_id: values.kelurahan.id,
        //         kecamatan_id: values.kecamatan.id.toString().slice(-2),
        //         kabupaten_id: values.kabupaten.id.toString().slice(-2),
        //     },
        //     {
        //         onStart: () => setSubmitting(true),
        //         onSuccess: () => {
        //             alert('Data berhasil disimpan!');
        //             resetForm();
        //         },
        //         onError: (errors) => {
        //             console.error('Terjadi kesalahan:', errors);
        //         },
        //         onFinish: () => setSubmitting(false),
        //     },
        // );
    };

    return (
        <>
            <Link href="/dashboard/data-kk" className="mb-3 flex w-fit items-center rounded bg-white/70 px-3 py-2 text-blue-600 shadow hover:text-blue-800 hover:underline">
                <ChevronRightIcon className="w-5 rotate-180" />
                Kembali
            </Link>
            <Formik
                initialValues={formFieldBuatKK}
                validationSchema={validationSchemaBuatKK} // Menghubungkan skema validasi
                onSubmit={handleSubmitFormBuatKK}
            >
                {(formik) => (
                    <form onSubmit={formik.handleSubmit}>
                        <Box className="relative mb-3">
                            <FormHeader>
                                <FormTitle title={`Form Buat Kartu Keluarga`} showIndex={false} />
                            </FormHeader>
                            <hr className="border-blue-200" />
                            <div className="grid grid-cols-2 gap-3 p-5">
                                <DynamicCombobox
                                    name="kepala_keluarga_nik"
                                    onClose={() => {
                                        setSuggestions((prev) => {
                                            return { ...prev, kepalaKeluarga: [] };
                                        });
                                    }}
                                    label="NIK Kepala Keluarga/NIK Pemohon"
                                    value={formik.values.kepala_keluarga_nik}
                                    handleInputChange={(e: React.ChangeEvent<HTMLInputElement>) => handleKepalaKeluargaInputChange(e, formik)}
                                    handleComboboxChange={(value: string) => {
                                        handleComboboxChange(value, formik, suggestions, setSuggestions);
                                    }}
                                >
                                    {suggestions.kepalaKeluarga.map((person) => (
                                        <ComboboxOption key={person.nik} value={person.nik} className="group flex w-full gap-2 bg-white p-2 data-[focus]:bg-gray-200">
                                            <div className="block">{person.nik}</div>
                                            <p className="block">{person.nik}</p>
                                        </ComboboxOption>
                                    ))}
                                </DynamicCombobox>
                                <div>
                                    <Label htmlFor="kabupaten">No. KK Semula</Label>
                                    <Field disabled={true} id="no_kk_semula" name="no_kk_semula" placeholder="No. Kartu Keluarga Semula" className="w-full rounded-md border border-blue-200 p-2" />
                                    <ErrorMessage name="kepala_keluarga_nik" component="div" className="text-sm text-red-500" />
                                </div>
                                <div className="col-span-2 grid grid-cols-3 gap-3">
                                    <div>
                                        <Label htmlFor="kabupaten">Kabupaten</Label>
                                        <Field
                                            id="kabupaten"
                                            name="kabupaten.name"
                                            disabled={true}
                                            value={formik.values.kabupaten.name}
                                            placeholder="Kabupaten"
                                            onChange={formik.handleChange}
                                            className="w-full cursor-not-allowed resize-none rounded-md border border-blue-200 p-2"
                                        />
                                        <ErrorMessage name="kabupaten.name" component="div" className="text-sm text-red-500" />
                                    </div>
                                    <div>
                                        <Label htmlFor="kecamatan">Kecamatan</Label>
                                        <Field
                                            disabled={true}
                                            id="kecamatan"
                                            name="kecamatan.name"
                                            value={formik.values.kecamatan.name}
                                            placeholder="Kecamatan"
                                            onChange={formik.handleChange}
                                            className="w-full cursor-not-allowed resize-none rounded-md border border-blue-200 p-2"
                                        />
                                        <ErrorMessage name="kecamatan.name" component="div" className="text-sm text-red-500" />
                                    </div>

                                    <InputTextField<TypeFormFieldBuatKK>
                                        parentClassName="relative"
                                        formik={formik}
                                        name="kelurahan.name"
                                        label="Kelurahan/Desa"
                                        placeholder="Ketikkan Nama Desa disini"
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleVillageInputChange(e, formik)}
                                    >
                                        <ul className="absolute left-0 top-[70px] rounded-md border border-blue-200 bg-white shadow">
                                            {suggestions.desa.length > 0 &&
                                                suggestions.desa.map((village) => (
                                                    <li key={village.id} value={village.name} onClick={() => handleVillageSelect(village, formik)} className="cursor-pointer p-2 text-sm text-gray-600 transition-colors duration-200 hover:bg-blue-200">
                                                        <span className="block font-bold">{village.name}</span>
                                                        <span className="text-xs">
                                                            {village.name} - {village.district.name}, {village.district.regency.name}
                                                        </span>
                                                    </li>
                                                ))}
                                        </ul>
                                    </InputTextField>
                                </div>
                                <div className="col-span-2 grid grid-cols-2 gap-3">
                                    <InputTextField<TypeFormFieldBuatKK> placeholder="Masukkan Alamat" as="textarea" className="h-44 resize-none" formik={formik} name="alamat" label="alamat" />
                                    <div className="flex gap-x-3">
                                        <InputTextField<TypeFormFieldBuatKK> formik={formik} name="rt" label="RT" />
                                        <InputTextField<TypeFormFieldBuatKK> formik={formik} name="rw" label="RW" />
                                    </div>
                                </div>
                            </div>
                            <hr className="border border-blue-200" />
                            <div className="p-5">
                                <Button type="submit">Kirim</Button>
                            </div>
                        </Box>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default AddKartuKeluargaForm;
