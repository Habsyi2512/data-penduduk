import { useLoadingContext } from '@/context/LoadingContext';
import useHandleChangeEvents from '@/helper/handleChangeEvents';
import { handleClickSubmitFormik } from '@/helper/handleClickSubmit';
import { handleComboboxChangeKK, handleComboboxChangeNIK } from '@/helper/handleComboboxChange';
import { TypeFormFieldPindahKK, TypeKepalaKeluarga } from '@/interface/interface';
import { formFieldPindahKK } from '@/Pages/Form/InitialValues';
import { validationSchemaPindahKK } from '@/Pages/Form/validation';
import { handleSubmitPindahKK } from '@/services/form/routerService';
import { ComboboxOption } from '@headlessui/react';
import { Link } from '@inertiajs/react';
import { ErrorMessage, Field, Formik, FormikProps } from 'formik';
import React, { useState } from 'react';
import Box from '../box/Box';
import Button from '../button/Button';
import { ChevronRightIcon } from '../icons/ChevronRightIcon';
import ConfirmSubmitModal from '../modal/ConfirmSubmitModal';
import DynamicCombobox from './components/form-fields/DynamicCombobox';
import InputTextField from './components/form-fields/InputTextField';
import FormHeader from './components/FormHeader';
import FormTitle from './components/FormTitle';
import Label from './components/Label';

export default function PindahKKForm() {
    const [isOpenSubmitModal, setIsOpenSubmitModal] = useState(false);
    const { handleKepalaKeluargaInputChange, handleKKInputChange, suggestions, setSuggestions } = useHandleChangeEvents();
    const { setLoading } = useLoadingContext();
    const [dataStatusHubungan, setDataStatusHubungan] = useState<{ id: string | number; name: string }[]>([]);
    const handleClickComboboxKK = (value: string, formik: FormikProps<TypeFormFieldPindahKK>, name: string) => {
        handleComboboxChangeKK(value, formik, suggestions, setSuggestions, name);
    };

    const getStatusHubunganKeluarga = async () => {
        const res = await fetch('/api/getStatusHubungan');
        const data = res.json();
        return data;
    };

    const fetchData = async () => {
        try {
            const data = await getStatusHubunganKeluarga();
            setDataStatusHubungan(data.data);
        } catch (err) {
            console.log('error:', err);
        }
    };
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>, formik: FormikProps<TypeFormFieldPindahKK>) => {
        const selectedValue = e.target.value;
        const selectedOption = dataStatusHubungan.find((option) => option.name === selectedValue);

        // Jika value kosong, set field menjadi kosong dan tandai sebagai touched
        if (selectedValue === '') {
            formik.setFieldValue('statusHubunganBaru.id', '');
            formik.setFieldValue('statusHubunganBaru.name', '');
        } else {
            // Memperbarui nilai statusHubunganBaru.name dan statusHubunganBaru.id di Formik
            formik.setFieldValue('statusHubunganBaru.name', selectedValue);
            formik.setFieldTouched('statusHubunganBaru.name', false);
            if (selectedOption) {
                formik.setFieldValue('statusHubunganBaru.id', selectedOption.id);
            }
        }
    };

    React.useEffect(() => {
        fetchData();
    }, []);

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
                    handleSubmitPindahKK(values, {
                        onLoading: () => {
                            setLoading(true);
                        },

                        onSuccess: () => {
                            setLoading(false);
                        },
                    });
                }}
            >
                {(formik) => (
                    <form onSubmit={formik.handleSubmit}>
                        {isOpenSubmitModal && <ConfirmSubmitModal<TypeFormFieldPindahKK> formik={formik} isOpenSubmitModal={isOpenSubmitModal} setIsOpenSubmitModal={setIsOpenSubmitModal} title="Ajukan Permohonan Pindah Kartu Keluarga?" />}
                        <Box className="relative mb-3">
                            <FormHeader>
                                <FormTitle title={`Form Pindah Kartu Keluarga`} showIndex={false} />
                            </FormHeader>
                            <hr className="border-blue-200" />
                            <div className="grid grid-cols-2 gap-3 p-5">
                                <DynamicCombobox
                                    parentClassName=""
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
                                                formik.setFieldValue('namaPemohon', '');
                                                formik.setFieldValue('statusHubunganLama.name', '');
                                            }
                                            console.log(formik.values);
                                        })
                                    }
                                    handleComboboxChange={(value: string) => {
                                        handleComboboxChangeNIK<TypeFormFieldPindahKK>(value, formik, suggestions, setSuggestions, (value: TypeKepalaKeluarga) => {
                                            formik.setFieldValue('nikPemohon', value.nik);
                                            formik.setFieldValue('noKKLama', value.no_kk);
                                            formik.setFieldValue('namaPemohon', value.name);
                                            formik.setFieldValue('statusHubunganLama.id', value.statusHubungan.id);
                                            formik.setFieldValue('statusHubunganLama.name', value.statusHubungan.name);
                                            formik.setFieldTouched('nikPemohon', false, false);
                                            formik.setFieldTouched('noKKLama', false, false);
                                            formik.setFieldTouched('namaPemohon', false, false);
                                            formik.setFieldTouched('statusHubunganLama.id', false, false);
                                            formik.setFieldTouched('statusHubunganLama.name', false, false);
                                        });
                                    }}
                                >
                                    {suggestions.NIK.map((person) => (
                                        <ComboboxOption key={person.nik} value={person.nik} className="group w-full cursor-pointer gap-2 bg-white p-2 data-[focus]:bg-gray-200">
                                            <p className="font-inter font-bold text-gray-600">{person.nik}</p>
                                            <span className="inline-block text-xs">{person.name}</span>
                                        </ComboboxOption>
                                    ))}
                                </DynamicCombobox>
                                <InputTextField<TypeFormFieldPindahKK> disabled={true} placeholder="Nama Pemohon" formik={formik} name="namaPemohon" label="Nama Pemohon" />

                                <InputTextField<TypeFormFieldPindahKK> disabled={true} placeholder="No. KK Lama" formik={formik} name="noKKLama" label="No. KK Lama" />

                                <DynamicCombobox
                                    name={`noKKBaru`}
                                    onClose={() => {
                                        setSuggestions((prev) => {
                                            return { ...prev, KK: [] };
                                        });
                                    }}
                                    label="No. KK Tujuan/No. KK Baru"
                                    placeholder="Masukkan No. KK Baru"
                                    value={formik.values.noKKBaru}
                                    handleInputChange={(e: React.ChangeEvent<HTMLInputElement>) => handleKKInputChange(e, formik)}
                                    handleComboboxChange={(value: string) => {
                                        handleClickComboboxKK(value, formik, 'noKKBaru');
                                    }}
                                >
                                    {suggestions.KK.map((data) => (
                                        <ComboboxOption key={data.no_kk} value={data.no_kk} className="group w-full cursor-pointer gap-2 bg-white p-2 data-[focus]:bg-gray-200">
                                            <p className="font-inter font-bold text-gray-600">{data.no_kk}</p>
                                            <span className="inline-block text-xs">{data.alamat}</span>
                                        </ComboboxOption>
                                    ))}
                                </DynamicCombobox>
                                <InputTextField<TypeFormFieldPindahKK> disabled={true} placeholder="Status Hubungan Keluarga Lama" formik={formik} name="statusHubunganLama.name" label="Status Hubungan Keluarga Lama" />

                                <div>
                                    <Label htmlFor={'statusHubunganBaru.name'}>Status Hubungan Baru</Label>
                                    <Field
                                        as="select"
                                        name={`statusHubunganBaru.name`}
                                        id={`statusHubunganBaru.name`}
                                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                            handleSelectChange(e, formik);
                                        }}
                                        className={`mb-2 block w-full rounded-md border border-blue-300/50 bg-white px-3 py-2 dark:border-gray-500/50 dark:bg-gray-700 dark:focus:ring-gray-800`}
                                    >
                                        <option value="">Pilih Status Hubungan</option>
                                        {dataStatusHubungan.length > 0 &&
                                            dataStatusHubungan.map((option) => (
                                                <option key={option.id} value={option.name}>
                                                    {option.name}
                                                </option>
                                            ))}
                                    </Field>
                                    <ErrorMessage name={'statusHubunganBaru.name'} component="div" className="text-sm text-red-500" />
                                </div>
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
