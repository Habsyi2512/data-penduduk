import useHandleChangeEvents from '@/helper/handleChangeEvents';
import { handleClickSubmitFormik } from '@/helper/handleClickSubmit';
import { handleComboboxChangeKK } from '@/helper/handleComboboxChange';
import ModalHooks from '@/hooks/ModalHooks';
import { InputPendudukProps } from '@/interface/interface';
import { AddPendudukFormProps, CommonFormikProps } from '@/interface/pageprops/interface';
import { DataKKProps } from '@/interface/pageprops/tabel-kk-props/interface';
import { ComboboxOption } from '@headlessui/react';
import { ErrorMessage, Field, Form } from 'formik';
import React, { SetStateAction, useState } from 'react';
import Box from '../box/Box';
import Button from '../button/Button';
import Divider from '../ui/Divider';
import { BlueButton, FormContent, FormHeader, FormHeaderAction, FormTitle, RemoveButton } from './components/FormComponents';
import Label from './components/Label';
import DynamicCombobox from './components/form-fields/DynamicCombobox';
import InputSelectField from './components/form-fields/InputSelectField';
import InputTextField from './components/form-fields/InputTextField';

export default function AddPendudukForm({ formik, data, formField, push, remove, openByIdx, setOpenByIdx, toggleAccordion, setIdx, setIsOpenSubmitModal, setIsOpenDiscardModal, loading }: AddPendudukFormProps) {
    console.log('loading', loading);
    const { handleConfirmModal } = ModalHooks();
    const { agama, dataKelamin, dataGolDarah, dataKewarganegaraan, dataPekerjaan, dataStatusKawin, dataStatusHubungan } = data;
    const { suggestions, setSuggestions, handleKKInputChange } = useHandleChangeEvents();
    const [detailKK, setDetailKK] = useState<DataKKProps | null>(null);

    const handleChange = (value: string, data: any, key: string, name: { id: string; name: string }) => {
        const selectedData = data.find((dataItem: any) => dataItem[key] === value);
        if (selectedData) {
            formik.setFieldValue(name.id, selectedData.id);
            formik.setFieldValue(name.name, selectedData[key]);
        }
    };

    function handleRemove(index: number, formik: CommonFormikProps, remove: <X = any>(index: number) => X | undefined, setIdx: React.Dispatch<SetStateAction<number>>, setIsOpenDiscardModal: React.Dispatch<SetStateAction<boolean>>) {
        // Ambil form pada index tertentu
        const currentForm = formik.values.forms[index];
        const isFormFilled = Object.values(currentForm).some((value) => value.length > 0);

        if (isFormFilled) {
            setIdx(index);
            setIsOpenDiscardModal(true);
        } else {
            remove(index);
        }
    }

    const handleClickCombobox = (value: string, formik: CommonFormikProps, name: string) => {
        handleComboboxChangeKK(value, formik, suggestions, setSuggestions, name, (value: DataKKProps) => {
            setDetailKK(value);
        });
    };

    return (
        <Form>
            {formik.values.forms.map((form, index) => (
                <Box key={index} className="mb-3">
                    <FormHeader>
                        <FormTitle title="Form" index={index} />
                        <FormHeaderAction>
                            {!openByIdx[index] && (
                                <RemoveButton
                                    disabled={formik.values.forms.length === 1}
                                    onClick={() => {
                                        handleRemove(index, formik, remove, setIdx, setIsOpenDiscardModal);
                                    }}
                                />
                            )}

                            <BlueButton onClick={() => toggleAccordion(index)} isOpen={openByIdx[index]} />
                        </FormHeaderAction>
                    </FormHeader>
                    <Divider isOpen={openByIdx[index]} />
                    <FormContent isOpen={openByIdx[index]}>
                        <div className="grid grid-cols-2 gap-5">
                            <div className="col-span-2 grid grid-cols-3 gap-x-6">
                                {/* No. KK */}
                                <DynamicCombobox
                                    name={`forms.${index}.no_kk`}
                                    onClose={() => {
                                        setSuggestions((prev) => {
                                            return { ...prev, KK: [] };
                                        });
                                    }}
                                    label="No. KK"
                                    placeholder="Masukkan No. KK"
                                    value={formik.values.forms[index].no_kk}
                                    handleInputChange={(e: React.ChangeEvent<HTMLInputElement>) => handleKKInputChange(e, formik)}
                                    handleComboboxChange={(value: string) => {
                                        handleClickCombobox(value, formik, `forms.${index}.no_kk`);
                                    }}
                                >
                                    {suggestions.KK.map((data) => (
                                        <ComboboxOption key={data.no_kk} value={data.no_kk} className="group w-full gap-2 bg-white p-2 data-[focus]:bg-gray-200">
                                            <p className="font-inter font-bold text-gray-600">{data.no_kk}</p>
                                            <span className="inline-block text-xs">{data.alamat}</span>
                                        </ComboboxOption>
                                    ))}
                                </DynamicCombobox>

                                {/* Nama */}
                                <InputTextField<{ forms: InputPendudukProps[] }> placeholder="Masukkan Nama" formik={formik} label="Nama" name={`forms.${index}.nama`} />

                                {/* Tempat Lahir */}
                                <InputTextField<{ forms: InputPendudukProps[] }> placeholder="Masukkan Tempat Lahir" formik={formik} label="Tempat Lahir" name={`forms.${index}.tempat_lahir`} />
                            </div>

                            <div className="col-span-2 grid grid-cols-3 gap-x-6">
                                {/* Tanggal Lahir */}
                                <InputTextField<{ forms: InputPendudukProps[] }> formik={formik} type="date" label="Tanggal Lahir" name={`forms.${index}.tanggal_lahir`} />

                                {/* Golongan Darah */}
                                <InputSelectField index={index} dataKey="gol_darah" onChange={handleChange} name={`forms.${index}.gol_darahs.gol_darah`} label="Golongan Darah" options={dataGolDarah} />

                                {/* Agama */}
                                <InputSelectField index={index} dataKey="agama" onChange={handleChange} name={`forms.${index}.agama.agama`} label="Agama" options={agama} />
                            </div>

                            <div className="col-span-2 grid grid-cols-3 gap-6">
                                {/* Pekerjaan */}
                                <InputSelectField index={index} dataKey="pekerjaan" onChange={handleChange} name={`forms.${index}.pekerjaan.pekerjaan`} label="Pekerjaan" options={dataPekerjaan} />

                                {/* Kewarganegaraan */}
                                <InputSelectField index={index} dataKey="kewarganegaraan" onChange={handleChange} name={`forms.${index}.kewarganegaraan.kewarganegaraan`} label="Kewarganegaraan" options={dataKewarganegaraan} />

                                {/* Status Kawin */}
                                <InputSelectField index={index} dataKey="status" onChange={handleChange} name={`forms.${index}.status_kawin.status`} label="Status Kawin" options={dataStatusKawin} />
                            </div>
                            <div className="col-span-2 grid grid-cols-3 gap-6">
                                {/* Status Hubungan Keluarga */}
                                <InputSelectField index={index} dataKey="nama_status" onChange={handleChange} name={`forms.${index}.status_hubungan.nama_status`} label="Status Hubungan Keluarga" options={dataStatusHubungan} />

                                {/* Jenis Kelamin */}
                                <div className="col-span-2">
                                    <Label htmlFor={`forms.${index}.jenis_kelamin.jenis_kelamin`} className="block">
                                        Jenis Kelamin
                                    </Label>
                                    {dataKelamin.map(({ id, jenis_kelamin }) => (
                                        <div key={'kelamin' + id} className="inline-block">
                                            <Field
                                                type="radio"
                                                name={`forms.${index}.jenis_kelamin.jenis_kelamin`}
                                                value={jenis_kelamin}
                                                className="mr-2"
                                                onChange={(e: any) =>
                                                    handleChange(
                                                        jenis_kelamin, // Value yang dipilih
                                                        dataKelamin, // Data array untuk mencari ID
                                                        'jenis_kelamin', // Key untuk mencari data
                                                        {
                                                            id: `forms.${index}.jenis_kelamin.id`,
                                                            name: `forms.${index}.jenis_kelamin.jenis_kelamin`,
                                                        }
                                                    )
                                                }
                                            />
                                            <Field type="text" name={`forms.${index}.jenis_kelamin.id`} hidden={true} value={id} />
                                            <label htmlFor={`forms.${index}.jenis_kelamin.jenis_kelamin`} className="mr-4">
                                                {jenis_kelamin}
                                            </label>
                                        </div>
                                    ))}

                                    <ErrorMessage name={`forms.${index}.jenis_kelamin.jenis_kelamin`} component="div" className="text-sm text-red-500" />
                                </div>
                            </div>
                        </div>

                        {/* Button to remove the current form */}
                    </FormContent>
                </Box>
            ))}

            <div className="space-x-5">
                <Button type="button" onClick={(e) => handleClickSubmitFormik<{ forms: InputPendudukProps[] }>(formik, setIsOpenSubmitModal)}>
                    {loading?'Loading':'Kirim'}
                </Button>
                <Button
                    btnColor="green"
                    type="button"
                    onClick={() => {
                        setOpenByIdx((prev) => [...prev, true]);
                        push(formField);
                    }}
                >
                    Tambah Form
                </Button>
            </div>
        </Form>
    );
}
