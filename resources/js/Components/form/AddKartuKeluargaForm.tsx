import useHandleChangeEvents from '@/helper/handleChangeEvents';
import { handleClickSubmitFormik } from '@/helper/handleClickSubmit';
import { handleComboboxChangeDesa, handleComboboxChangeNIK } from '@/helper/handleComboboxChange';
import { TypeFormFieldBuatKK } from '@/interface/interface';
import { formFieldBuatKK } from '@/Pages/Form/InitialValues';
import { validationSchemaBuatKK } from '@/Pages/Form/validation';
import { handleSubmitFormBuatKK } from '@/services/form/routerService';
import { ComboboxOption } from '@headlessui/react';
import { Link } from '@inertiajs/react';
import { ErrorMessage, Formik } from 'formik';
import React, { useState } from 'react';
import Box from '../box/Box';
import Button from '../button/Button';
import { ChevronRightIcon } from '../icons/ChevronRightIcon';
import ConfirmSubmitModal from '../modal/ConfirmSubmitModal';
import DynamicCombobox from './components/form-fields/DynamicCombobox';
import InputTextField from './components/form-fields/InputTextField';
import { FormHeader, FormTitle } from './components/FormComponents';

const AddKartuKeluargaForm = () => {
    const [isOpenSubmitModal, setIsOpenSubmitModal] = useState(false);
    const { handleKepalaKeluargaInputChange, handleVillageInputChange, suggestions, setSuggestions } = useHandleChangeEvents();

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
                        {isOpenSubmitModal && <ConfirmSubmitModal<TypeFormFieldBuatKK> formik={formik} isOpenSubmitModal={isOpenSubmitModal} setIsOpenSubmitModal={setIsOpenSubmitModal} title="Ajukan Pembuatan Kartu Keluarga?" />}
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
                                    placeholder="Masukkan NIK"
                                    value={formik.values.kepala_keluarga_nik}
                                    handleInputChange={(e: React.ChangeEvent<HTMLInputElement>) => handleKepalaKeluargaInputChange(e, formik)}
                                    handleComboboxChange={(value: string) => {
                                        handleComboboxChangeNIK(value, formik, suggestions, setSuggestions);
                                    }}
                                >
                                    {suggestions.kepalaKeluarga.map((person) => (
                                        <ComboboxOption key={person.nik} value={person.nik} className="group w-full gap-2 bg-white p-2 data-[focus]:bg-gray-200">
                                            <p className="font-inter font-bold text-gray-600">{person.nik}</p>
                                            <span className="inline-block text-xs">{person.name}</span>
                                        </ComboboxOption>
                                    ))}
                                </DynamicCombobox>
                                <InputTextField<TypeFormFieldBuatKK> disabled={true} placeholder="Masukkan No. KK" formik={formik} name="no_kk_semula" label="No. KK" />
                                <div className="col-span-2 grid grid-cols-3 gap-3">
                                    <InputTextField<TypeFormFieldBuatKK> disabled={true} placeholder="Masukkan Kabupaten" formik={formik} name="kabupaten.name" label="Kabupaten" />
                                    <InputTextField<TypeFormFieldBuatKK> disabled={true} placeholder="Masukkan Kecamatan" formik={formik} name="kecamatan.name" label="Kecamatan" />
                                    <DynamicCombobox
                                        placeholder="Masukkan Nama Kelurahan/Desa"
                                        name="kelurahan.name"
                                        onClose={() => {
                                            setSuggestions((prev) => {
                                                return { ...prev, desa: [] };
                                            });
                                        }}
                                        label="Kelurahan/Desa"
                                        value={formik.values.kelurahan.name}
                                        handleInputChange={(e: React.ChangeEvent<HTMLInputElement>) => handleVillageInputChange(e, formik)}
                                        handleComboboxChange={(value: string) => {
                                            handleComboboxChangeDesa(value, formik, suggestions, setSuggestions);
                                        }}
                                    >
                                        {suggestions.desa.map((village) => (
                                            <ComboboxOption key={village.id} value={village.name} className="group w-full cursor-pointer gap-2 bg-white p-2 data-[focus]:bg-gray-200">
                                                <span className="block font-bold text-gray-600">{village.name}</span>
                                                <span className="text-xs">
                                                    {village.name} - {village.district.name}, {village.district.regency.name}
                                                </span>
                                            </ComboboxOption>
                                        ))}
                                    </DynamicCombobox>
                                </div>
                                <div className="col-span-2 grid grid-cols-2 gap-3">
                                    <InputTextField<TypeFormFieldBuatKK> placeholder="Masukkan Alamat" as="textarea" className="h-44 resize-none" formik={formik} name="alamat" label="alamat" />
                                    <div className="flex gap-x-3">
                                        <InputTextField<TypeFormFieldBuatKK> placeholder="Masukkan RT" formik={formik} name="rt" label="RT" />
                                        <InputTextField<TypeFormFieldBuatKK> placeholder="Masukkan RW" formik={formik} name="rw" label="RW" />
                                    </div>
                                    <ErrorMessage name="rt-rw-rule" component="div" className="text-sm text-red-500" />
                                </div>
                            </div>
                            <hr className="border border-blue-200" />
                            <div className="p-5">
                                <Button type="button" onClick={(e) => handleClickSubmitFormik<TypeFormFieldBuatKK>(formik, setIsOpenSubmitModal)}>
                                    Kirim
                                </Button>
                            </div>
                        </Box>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default AddKartuKeluargaForm;
