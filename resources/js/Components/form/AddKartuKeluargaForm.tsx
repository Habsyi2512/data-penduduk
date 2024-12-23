import { useLoadingContext } from '@/context/LoadingContext';
import useHandleChangeEvents from '@/helper/handleChangeEvents';
import { handleClickSubmitFormik } from '@/helper/handleClickSubmit';
import { handleComboboxChangeDesa, handleComboboxChangeNIK } from '@/helper/handleComboboxChange';
import { TypeFormFieldBuatKK, TypeKepalaKeluarga } from '@/interface/interface';
import { DataKKProps } from '@/interface/pageprops/tabel-kk-props/interface';
import { validationSchemaBuatKK } from '@/Pages/Form/validation';
import { handleSubmitFormBuatKK } from '@/services/form/routerService';
import { ComboboxOption } from '@headlessui/react';
import { Link } from '@inertiajs/react';
import { ErrorMessage, Field, Formik } from 'formik';
import React, { useState } from 'react';
import Box from '../box/Box';
import Button from '../button/Button';
import { ChevronRightIcon } from '../icons/ChevronRightIcon';
import ConfirmSubmitModal from '../modal/ConfirmSubmitModal';
import DynamicCombobox from './components/form-fields/DynamicCombobox';
import InputTextField from './components/form-fields/InputTextField';
import { FormHeader, FormTitle } from './components/FormComponents';
import Label from './components/Label';

const AddKartuKeluargaForm = () => {
    const [isOpenSubmitModal, setIsOpenSubmitModal] = useState(false);
    const [dataKK, setDataKK] = useState<DataKKProps | null>(null);
    const [dataStatusHubungan, setDataStatusHubungan] = useState<{ id: string | number; name: string }[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isKepalaKeluarga, setIsKepalaKeluarga] = useState(false);
    const { setLoading } = useLoadingContext();
    const [formField, setFormField] = useState<TypeFormFieldBuatKK>({
        alamat: '',
        kepala_keluarga_nik: '',
        rt: '',
        rw: '',
        no_kk_semula: '',
        statusAnggotaKeluarga: [{ nik: '', status_hubungan: { id: '', nama_status: '' } }],
        kelurahan: { id: '', name: '' },
        kecamatan: { id: '', name: '' },
        kabupaten: { id: '', name: '' },
    });
    const [nik, setNik] = useState<string>(formField.kepala_keluarga_nik);
    // const [kk, setKk] = useState<string>(formField.no_kk_semula);
    const [noKKSemula, setNoKKSemula] = useState(formField.no_kk_semula);
    const { handleKepalaKeluargaInputChange, handleVillageInputChange, suggestions, setSuggestions } = useHandleChangeEvents();
    const fetchDataKK = async () => {
        try {
            const res = await fetch(`/api/getDetailKKByNoKK/${noKKSemula}`);

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Error fetching data');
            }

            return await res.json();
        } catch (err) {
            console.error('Fetch error:', err);
            throw err;
        }
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

    React.useEffect(() => {
        fetchData();
    }, []);

    const getDataKK = async () => {
        try {
            const result = await fetchDataKK();
            setDataKK(result.data); // Gunakan key `data` dari response Laravel
            // setIsKepalaKeluarga(result.data?.data_penduduk.some((penduduk: TypeKepalaKeluarga) => penduduk.nik === formik.values.kepala_keluarga_nik && penduduk.statusHubungan.name.toLowerCase() === 'kepala keluarga'));
            setError(null); // Reset error jika berhasil
        } catch (err: any) {
            setError(err.message || 'Terjadi kesalahan');
        }
    };

    React.useEffect(() => {
        if (noKKSemula.length > 0) {
            getDataKK(); // Fetch ulang data KK
        } else {
            setDataKK(null); // Reset data KK jika No KK kosong
        }
    }, [noKKSemula]);

    React.useEffect(() => {
        if (dataKK) {
            // Memetakan data penduduk menjadi status anggota keluarga
            const statusAnggotaKeluargaBaru = dataKK.data_penduduk
                .filter((penduduk: any) => penduduk.status_hubungan_keluarga.id != '1')
                .map((penduduk: any) => ({
                    nik: penduduk.nik,
                    status_hubungan: {
                        id: penduduk.status_hubungan_keluarga.id,
                        nama_status: penduduk.status_hubungan_keluarga.nama_status,
                    },
                }));
            console.log('status', statusAnggotaKeluargaBaru);

            // Update formField dengan statusAnggotaKeluarga yang baru
            setFormField((prev) => ({
                ...prev,
                statusAnggotaKeluarga: statusAnggotaKeluargaBaru,
                kepala_keluarga_nik: nik,
                no_kk_semula: noKKSemula,
            }));
        }
        if (dataKK == null) {
            setFormField((prev) => ({
                ...prev,
                statusAnggotaKeluarga: [],
                kepala_keluarga_nik: '',
                no_kk_semula: noKKSemula,
            }));
        }
        console.log('data-kk', dataKK);
    }, [dataKK]);

    return (
        <>
            <Link href="/dashboard/data-kk" className="mb-3 flex w-fit items-center rounded bg-white/70 px-3 py-2 text-blue-600 shadow hover:text-blue-800 hover:underline">
                <ChevronRightIcon className="w-5 rotate-180" />
                Kembali
            </Link>
            <Formik
                initialValues={formField}
                enableReinitialize={true} // Mengaktifkan reset form ketika terjadi perubahan state
                validationSchema={validationSchemaBuatKK} // Menghubungkan skema validasi
                onSubmit={(value) => {
                    handleSubmitFormBuatKK(value, {
                        onLoading: () => {
                            setLoading(true);
                        },
                        onSuccess: () => {
                            setLoading(false);
                        },
                    });
                }}
            >
                {(formik: any) => {
                    return (
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
                                                return { ...prev, NIK: [] };
                                            });
                                        }}
                                        label="NIK Kepala Keluarga/NIK Pemohon"
                                        placeholder="Masukkan NIK"
                                        value={formik.values.kepala_keluarga_nik}
                                        handleInputChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            handleKepalaKeluargaInputChange(e, formik, () => {
                                                if (e.target.value === '') {
                                                    formik.setFieldValue('no_kk_semula', '');
                                                    setDataKK(null); // Reset data KK
                                                    setNoKKSemula('');
                                                    setFormField((prev) => {
                                                        return {
                                                            ...prev,
                                                            statusAnggotaKeluarga: [],
                                                        };
                                                    });
                                                }
                                            });
                                        }}
                                        handleComboboxChange={(value: string) => {
                                            handleComboboxChangeNIK(value, formik, suggestions, setSuggestions, (selectedPerson: TypeKepalaKeluarga) => {
                                                // Reset data terlebih dahulu
                                                setDataKK(null);
                                                setNik(selectedPerson.nik);
                                                setFormField((prev) => {
                                                    return {
                                                        ...prev,
                                                        kepala_keluarga_nik: selectedPerson.nik,
                                                        no_kk_semula: selectedPerson.no_kk,
                                                        statusAnggotaKeluarga: [],
                                                    };
                                                });
                                                setIsKepalaKeluarga(false);

                                                setNoKKSemula(selectedPerson.no_kk); // Update dengan No KK baru
                                                formik.setFieldValue('kepala_keluarga_nik', selectedPerson.nik);
                                                formik.setFieldValue('no_kk_semula', selectedPerson.no_kk);
                                                formik.setFieldTouched('kepala_keluarga_nik', false, true);
                                                formik.setFieldTouched('no_kk_semula', false, true);
                                                if (selectedPerson.statusHubungan.id === 1) {
                                                    setIsKepalaKeluarga(true);
                                                    setFormField((prev) => {
                                                        return {
                                                            ...prev,
                                                            kepala_keluarga_nik: selectedPerson.nik,
                                                            no_kk_semula: selectedPerson.no_kk,
                                                            statusAnggotaKeluarga: [],
                                                        };
                                                    });
                                                } 
                                            });
                                        }}
                                    >
                                        {suggestions.NIK.map((person) => (
                                            <ComboboxOption key={person.nik} value={person.nik} className="group w-full cursor-pointer gap-2 bg-white p-2 data-[focus]:bg-gray-200">
                                                <p className="font-inter font-bold text-gray-600">{person.nik}</p>
                                                <span className="inline-block text-xs">{person.name}</span>
                                                <span> - </span>
                                                <span className="inline-block text-xs">{person.statusHubungan.name}</span>
                                            </ComboboxOption>
                                        ))}
                                    </DynamicCombobox>
                                    <InputTextField<TypeFormFieldBuatKK> disabled={true} placeholder="No. KK" formik={formik} name="no_kk_semula" label="No. KK Pemohon" />
                                    <div className="col-span-2 grid grid-cols-3 gap-3">
                                        <InputTextField<TypeFormFieldBuatKK> disabled={true} placeholder="Kabupaten" formik={formik} name="kabupaten.name" label="Kabupaten" />
                                        <InputTextField<TypeFormFieldBuatKK> disabled={true} placeholder="Kecamatan" formik={formik} name="kecamatan.name" label="Kecamatan" />
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

                                {isKepalaKeluarga&&dataKK && dataKK.data_penduduk.length > 1 ? (
                                    <>
                                        <hr className="border border-blue-200" />
                                        <div className="px-5 pt-5">
                                            <h2 className="font-inter text-xl font-bold text-blue-500">Perubahan Status Hubungan Kartu Keluarga Lama</h2>
                                            <h3 className="font-inter text-lg font-bold text-blue-500">
                                                No. KK Lama : <span className="font-mono">{dataKK.no_kk}</span>
                                            </h3>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3 p-5">
                                            {dataKK?.data_penduduk
                                                ?.filter((person) => person.status_hubungan_keluarga.id != '1')
                                                .map((value, index) => (
                                                    <div key={value.nik} className="col-span-2 grid grid-cols-2 items-center">
                                                        <div>
                                                            <p className="font-inter font-bold text-blue-500">
                                                                {index + 1}. {value.nama} - {value.status_hubungan_keluarga.nama_status}
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <Label htmlFor={`statusAnggotaKeluarga.${index}.status_hubungan.nama_status`}>Status Hubungan Baru</Label>
                                                            <Field
                                                                as="select"
                                                                defaultValue={value.status_hubungan_keluarga.nama_status}
                                                                name={`statusAnggotaKeluarga.${index}.status_hubungan.nama_status`}
                                                                id={`statusAnggotaKeluarga.${index}.status_hubungan.nama_status`}
                                                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                                                    const filtered = dataStatusHubungan.find((item) => item.name == e.target.value);
                                                                    if (filtered) {
                                                                        formik.setFieldValue(`statusAnggotaKeluarga.${index}.status_hubungan.id`, filtered.id);
                                                                        formik.setFieldValue(`statusAnggotaKeluarga.${index}.status_hubungan.nama_status`, filtered.name);
                                                                    }
                                                                }}
                                                                className="mb-2 block w-full rounded-md border border-blue-300/50 bg-white px-3 py-2"
                                                            >
                                                                <option value="">Pilih Status Hubungan</option>
                                                                {dataStatusHubungan.map((option) => (
                                                                    <option key={option.id} value={option.name}>
                                                                        {option.name}
                                                                    </option>
                                                                ))}
                                                            </Field>
                                                            <ErrorMessage name={`statusAnggotaKeluarga.${index}.status_hubungan.nama_status`} component="div" className="text-sm text-red-500" />
                                                        </div>
                                                    </div>
                                                ))}
                                        </div>
                                    </>
                                ) : null}
                                <hr className="border border-blue-200" />
                                <div className="p-5">
                                    <Button type="button" onClick={(e) => handleClickSubmitFormik<TypeFormFieldBuatKK>(formik, setIsOpenSubmitModal)}>
                                        Kirim
                                    </Button>
                                </div>
                            </Box>
                        </form>
                    );
                }}
            </Formik>
        </>
    );
};

export default AddKartuKeluargaForm;
