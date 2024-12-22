import useHandleChangeEvents from '@/helper/handleChangeEvents';
import { handleClickSubmitFormik } from '@/helper/handleClickSubmit';
import { handleComboboxChangeNIK } from '@/helper/handleComboboxChange';
import { TypeFormFieldPindahKK, TypeKepalaKeluarga } from '@/interface/interface';
import { formFieldPindahKK } from '@/Pages/Form/InitialValues';
import { validationSchemaPindahKK } from '@/Pages/Form/validation';
import { handleSubmitPindahKK } from '@/services/form/routerService';
import { ComboboxOption } from '@headlessui/react';
import { Link } from '@inertiajs/react';
import { Formik } from 'formik';
import React, { useState } from 'react';
import Box from '../box/Box';
import Button from '../button/Button';
import { ChevronRightIcon } from '../icons/ChevronRightIcon';
import ConfirmSubmitModal from '../modal/ConfirmSubmitModal';
import DynamicCombobox from './components/form-fields/DynamicCombobox';
import InputTextField from './components/form-fields/InputTextField';
import FormHeader from './components/FormHeader';
import FormTitle from './components/FormTitle';

export default function PindahKKForm() {
    const [isOpenSubmitModal, setIsOpenSubmitModal] = useState(false);
    const { handleKepalaKeluargaInputChange, suggestions, setSuggestions } = useHandleChangeEvents();
    return (
        <>
            <Link href="/dashboard/data-kk" className="mb-3 flex w-fit items-center rounded bg-white/70 px-3 py-2 text-blue-600 shadow hover:text-blue-800 hover:underline">
                <ChevronRightIcon className="w-5 rotate-180" />
                Kembali
            </Link>
            <Formik
                initialValues={formFieldPindahKK}
                validationSchema={validationSchemaPindahKK} // Menghubungkan skema validasi
                onSubmit={(values) => {
                    handleSubmitPindahKK(values);
                }}
            >
                {(formik) => (
                    <form onSubmit={formik.handleSubmit}>
                        {isOpenSubmitModal && <ConfirmSubmitModal<TypeFormFieldPindahKK> formik={formik} isOpenSubmitModal={isOpenSubmitModal} setIsOpenSubmitModal={setIsOpenSubmitModal} title="Ajukan Pembuatan Kartu Keluarga?" />}
                        <Box className="relative mb-3">
                            <FormHeader>
                                <FormTitle title={`Form Pindah Kartu Keluarga`} showIndex={false} />
                            </FormHeader>
                            <hr className="border-blue-200" />
                            <div className="grid grid-cols-2 gap-3 p-5">
                                <DynamicCombobox
                                    name="nikPemohon"
                                    onClose={() => {
                                        setSuggestions((prev) => {
                                            return { ...prev, NIK: [] };
                                        });
                                    }}
                                    label="NIK Pemohon"
                                    placeholder="Masukkan NIK"
                                    value={formik.values.nikPemohon}
                                    handleInputChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        handleKepalaKeluargaInputChange<TypeFormFieldPindahKK>(e, formik, () => {
                                            console.log('value', e.target.value);
                                            if (e.target.value == '') {
                                                formik.setFieldValue('noKKLama', '');
                                            }
                                            console.log(formik.values);
                                        })
                                    }
                                    handleComboboxChange={(value: string) => {
                                        handleComboboxChangeNIK<TypeFormFieldPindahKK>(value, formik, suggestions, setSuggestions, (value: TypeKepalaKeluarga) => {
                                            formik.setFieldValue('nikPemohon', value.nik);
                                            formik.setFieldValue('noKKLama', value.no_kk);
                                        });
                                    }}
                                >
                                    {suggestions.NIK.map((person) => (
                                        <ComboboxOption key={person.nik} value={person.nik} className="group cursor-pointer w-full gap-2 bg-white p-2 data-[focus]:bg-gray-200">
                                            <p className="font-inter font-bold text-gray-600">{person.nik}</p>
                                            <span className="inline-block text-xs">{person.name}</span>
                                        </ComboboxOption>
                                    ))}
                                </DynamicCombobox>
                                <InputTextField<TypeFormFieldPindahKK> disabled={true} placeholder="No. KK" formik={formik} name="noKKLama" label="No. KK" />
                            </div>
                            <hr className="border border-blue-200" />
                            <div className="p-5">
                                <Button type="button" onClick={(e) => handleClickSubmitFormik<TypeFormFieldPindahKK>(formik, setIsOpenSubmitModal)}>
                                    Kirim
                                </Button>
                            </div>
                        </Box>
                    </form>
                )}
            </Formik>
        </>
    );
}
