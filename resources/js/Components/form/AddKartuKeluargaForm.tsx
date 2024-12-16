import { TypeFormFieldBuatKK, TypeKepalaKeluarga, Village } from '@/interface/interface';
import { validationSchemaBuatKK } from '@/Pages/Form/validation';
import { Link, router } from '@inertiajs/react';
import {
    ErrorMessage,
    Field,
    Formik,
    FormikHelpers,
    FormikProps,
} from 'formik';
import React, { useState } from 'react';
import Box from '../box/Box';
import Button from '../button/Button';
import { ChevronRightIcon } from '../icons/ChevronRightIcon';
import { FormHeader, FormTitle } from './components/FormComponents';
import Label from './components/Label';

// interface TypeKepalaKeluarga {
//     nik: string;
//     nama: string;
//     no_kk: string;
// }

const AddKartuKeluargaForm = () => {
    const [suggestions, setSuggestions] = useState<{
        desa: Village[];
        kepalaKeluarga: TypeKepalaKeluarga[];
    }>({ desa: [], kepalaKeluarga: [] });

    const formFieldBuatKK: TypeFormFieldBuatKK = {
        noKK: '',
        alamat: '',
        kepala_keluarga_nik: '',
        no_kk_semula: '',
        kelurahan: { id: 0, name: '' },
        kecamatan: { id: 0, name: '' },
        kabupaten: { id: 0, name: '' },
    };

    const fetchSuggestions = async (
        query: string,
        type: 'desa' | 'kepalaKeluarga',
    ) => {
        if (query.length < 3) {
            setSuggestions((prev) => ({
                ...prev,
                [type]: [],
            }));
            return;
        }
        try {
            const url =
                type === 'desa'
                    ? `/search-desa?searchDesa=${query}`
                    : `/search-kepala-keluarga?searchKepalaKeluarga=${query}`;

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

    const handleKepalaKeluargaInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        formik: FormikProps<TypeFormFieldBuatKK>,
    ) => {
        const { value } = e.target;
        if (value == '') {
            formik.setFieldValue('no_kk_semula', '');
        }
        formik.setFieldValue('kepala_keluarga_nik', value);
        fetchSuggestions(value, 'kepalaKeluarga');
    };

    const handleVillageInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        formik: FormikProps<TypeFormFieldBuatKK>,
    ) => {
        const { value } = e.target;
        if (value == '') {
            formik.setFieldValue('kecamatan.name', '');
            formik.setFieldValue('kabupaten.name', '');
        }
        formik.setFieldValue('kelurahan.name', value);
        fetchSuggestions(value, 'desa');
    };

    const handleVillageSelect = (
        village: Village,
        formik: FormikHelpers<TypeFormFieldBuatKK>,
    ) => {
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
    const handleKepalaKeluargaSelect = (
        value: TypeKepalaKeluarga,
        formik: FormikHelpers<TypeFormFieldBuatKK>,
    ) => {
        formik.setFieldValue('kepala_keluarga_nik', value.nik);
        formik.setFieldValue('no_kk_semula', value.no_kk);
        setSuggestions((prev) => {
            return { ...prev, kepalaKeluarga: [] };
        });
    };

    const handleSubmitFormBuatKK = (
        values: TypeFormFieldBuatKK,
        { setSubmitting, resetForm }: FormikHelpers<TypeFormFieldBuatKK>,
    ) => {
        router.post(
            route('kk.store.form'),
            {
                noKK: '',
                no_kk_semula:values.no_kk_semula,
                kepala_keluarga_nik: values.kepala_keluarga_nik,
                alamat: values.alamat,
                kelurahan_id: values.kelurahan.id,
                kecamatan_id: values.kecamatan.id.toString().slice(-2),
                kabupaten_id: values.kabupaten.id.toString().slice(-2),
            },
            {
                onStart: () => setSubmitting(true),
                onSuccess: () => {
                    alert('Data berhasil disimpan!');
                    resetForm();
                },
                onError: (errors) => {
                    console.error('Terjadi kesalahan:', errors);
                },
                onFinish: () => setSubmitting(false),
            },
        );
    };

    return (
        <>
            <Link
                href="/dashboard/data-kk"
                className="mb-3 flex w-fit items-center rounded bg-white/70 px-3 py-2 text-blue-600 shadow hover:text-blue-800 hover:underline"
            >
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
                        <Box className="mb-3">
                            <FormHeader>
                                <FormTitle
                                    title={`Form Buat Kartu Keluarga`}
                                    showIndex={false}
                                />
                            </FormHeader>
                            <hr className="border-blue-200" />
                            <div className="grid grid-cols-2 gap-3 p-5">
                                <div className="">
                                    <div className="relative">
                                        <Label htmlFor="kabupaten">
                                            NIK Kepala Keluarga/NIK Pemohon
                                        </Label>
                                        <Field
                                            autoComplete="off"
                                            id="kepala_keluarga_nik"
                                            name="kepala_keluarga_nik"
                                            value={
                                                formik.values
                                                    .kepala_keluarga_nik
                                            }
                                            placeholder="Masukkan NIK Kepala Keluarga"
                                            onChange={(
                                                e: React.ChangeEvent<HTMLInputElement>,
                                            ) => {
                                                handleKepalaKeluargaInputChange(
                                                    e,
                                                    formik,
                                                );
                                            }}
                                            className="w-full rounded-md border border-blue-200 p-2"
                                        />
                                        <ErrorMessage
                                            name="kepala_keluarga_nik"
                                            component="div"
                                            className="text-sm text-red-500"
                                        />
                                        <ul className="absolute left-0 top-[70px] z-10 w-fit rounded-md border border-blue-200 bg-white shadow">
                                            {suggestions.kepalaKeluarga.map(
                                                (item) => (
                                                    <li
                                                        key={item.nik}
                                                        value={item.name}
                                                        onClick={() =>
                                                            handleKepalaKeluargaSelect(
                                                                item,
                                                                formik,
                                                            )
                                                        }
                                                        className="cursor-pointer p-2 text-sm text-gray-600 transition-colors duration-200 hover:bg-blue-200"
                                                    >
                                                        <span className="block font-bold">
                                                            {item.nik}
                                                        </span>
                                                        <span className="text-xs">
                                                            {item.name}
                                                        </span>
                                                    </li>
                                                ),
                                            )}
                                        </ul>
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="kabupaten">
                                        No. KK Semula
                                    </Label>
                                    <Field
                                        disabled={true}
                                        id="no_kk_semula"
                                        name="no_kk_semula"
                                        placeholder="No. Kartu Keluarga Semula"
                                        className="w-full rounded-md border border-blue-200 p-2"
                                    />
                                    <ErrorMessage
                                        name="kepala_keluarga_nik"
                                        component="div"
                                        className="text-sm text-red-500"
                                    />
                                </div>
                                <div className="col-span-2 grid grid-cols-3 gap-3">
                                    <div>
                                        <Label htmlFor="kabupaten">
                                            Kabupaten
                                        </Label>
                                        <Field
                                            id="kabupaten"
                                            name="kabupaten.name"
                                            disabled={true}
                                            value={formik.values.kabupaten.name}
                                            placeholder="Kabupaten"
                                            onChange={formik.handleChange}
                                            className="w-full cursor-not-allowed resize-none rounded-md border border-blue-200 p-2"
                                        />
                                        <ErrorMessage
                                            name="kabupaten.name"
                                            component="div"
                                            className="text-sm text-red-500"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="kecamatan">
                                            Kecamatan
                                        </Label>
                                        <Field
                                            disabled={true}
                                            id="kecamatan"
                                            name="kecamatan.name"
                                            value={formik.values.kecamatan.name}
                                            placeholder="Kecamatan"
                                            onChange={formik.handleChange}
                                            className="w-full cursor-not-allowed resize-none rounded-md border border-blue-200 p-2"
                                        />
                                        <ErrorMessage
                                            name="kecamatan.name"
                                            component="div"
                                            className="text-sm text-red-500"
                                        />
                                    </div>
                                    <div className="relative">
                                        <Label htmlFor="kelurahan">
                                            Kelurahan/Desa
                                        </Label>
                                        <Field
                                            id="kelurahan"
                                            name="kelurahan.name"
                                            autoComplete="off"
                                            value={formik.values.kelurahan.name}
                                            onChange={(
                                                e: React.ChangeEvent<HTMLInputElement>,
                                            ) =>
                                                handleVillageInputChange(
                                                    e,
                                                    formik,
                                                )
                                            }
                                            placeholder="Masukkan Kelurahan/Desa"
                                            className="w-full resize-none rounded-md border border-blue-200 p-2"
                                            list="village-suggestions"
                                        />
                                        <ul className="absolute left-0 top-[70px] rounded-md border border-blue-200 bg-white shadow">
                                            {suggestions.desa.length>0&&suggestions.desa.map((village) => (
                                                <li
                                                    key={village.id}
                                                    value={village.name}
                                                    onClick={() =>
                                                        handleVillageSelect(
                                                            village,
                                                            formik,
                                                        )
                                                    }
                                                    className="cursor-pointer p-2 text-sm text-gray-600 transition-colors duration-200 hover:bg-blue-200"
                                                >
                                                    <span className="block font-bold">
                                                        {village.name}
                                                    </span>
                                                    <span className="text-xs">
                                                        {village.name} -{' '}
                                                        {village.district.name},{' '}
                                                        {
                                                            village.district
                                                                .regency.name
                                                        }
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                        <ErrorMessage
                                            name="kelurahan.name"
                                            component="div"
                                            className="text-sm text-red-500"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-2 grid grid-cols-2">
                                    <div>
                                        <Label htmlFor="alamat">Alamat</Label>
                                        <Field
                                            as="textarea"
                                            id="alamat"
                                            name="alamat"
                                            value={formik.values.alamat}
                                            onChange={formik.handleChange}
                                            placeholder="Masukkan alamat"
                                            className="h-32 w-full resize-none rounded-md border border-blue-200 p-2"
                                        />
                                        <ErrorMessage
                                            name="alamat"
                                            component="div"
                                            className="text-sm text-red-500"
                                        />
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
