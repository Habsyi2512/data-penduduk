import { useFormHooks } from '@/hooks/FormHooks';
import ModalHooks from '@/hooks/ModalHooks';
import { AddPendudukFormProps } from '@/interface/pageprops/interface';
import { ErrorMessage, Field, Form } from 'formik';
import { useEffect } from 'react';
import Box from '../box/Box';
import Divider from '../ui/Divider';
import {
    BlueButton,
    FormContent,
    FormHeader,
    FormHeaderAction,
    FormTitle,
    RemoveButton,
    SuggestionList,
} from './components/FormComponents';
import InputText from './components/InputText';
import Label from './components/Label';

export default function AddPendudukForm({
    formik,
    data,
    formField,
    push,
    remove,
    openByIdx,
    setOpenByIdx,
    toggleAccordion,
    setIsOpenSubmitModal,
    setIsOpenDiscardModal,
    setIdx,
}: AddPendudukFormProps) {
    const {
        suggestions,
        queries,
        setDistrict,
        setRegency,
        handleAddForm,
        handleInputChange,
        handleSuggestionClick,
    } = useFormHooks();

    const { handleConfirmModal } = ModalHooks();

    const {
        agama,
        dataKelamin,
        dataGolDarah,
        dataKewarganegaraan,
        dataPekerjaan,
        dataStatusKawin,
    } = data;

    const handleChange = (
        value: string,
        data: any,
        key: string,
        name: { id: string; name: string },
    ) => {
        const selectedData = data.find(
            (dataItem: any) => dataItem[key] === value,
        );

        if (selectedData) {
            formik.setFieldValue(name.id, selectedData.id);
            formik.setFieldValue(name.name, selectedData[key]);
        }
    };

    useEffect(() => {
        if (Object.keys(queries).length === 0) {
            Object.keys(queries).forEach((index) => {
                setDistrict(parseInt(index), {
                    district_id: '',
                    district_name: '',
                });
                setRegency(parseInt(index), {
                    regency_id: '',
                    regency_name: '',
                });
            });
        }
    }, [queries]);

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
                                        if (setIdx && setIsOpenDiscardModal) {
                                            handleConfirmModal(
                                                remove,
                                                index,
                                                formik,
                                                setIdx, // Pastikan setIdx sudah didefinisikan
                                                setIsOpenDiscardModal,
                                            );
                                        }
                                    }}
                                />
                            )}
                            <BlueButton
                                onClick={() => toggleAccordion(index)}
                                isOpen={openByIdx[index]}
                            />
                        </FormHeaderAction>
                    </FormHeader>
                    <Divider isOpen={openByIdx[index]} />
                    <FormContent isOpen={openByIdx[index]}>
                        <div className="grid grid-cols-2 gap-5">
                            <div className="col-span-2 grid grid-cols-3 gap-x-6">
                                {/* NIK */}
                                <div>
                                    <Label htmlFor={`forms.${index}.nik`}>
                                        NIK
                                    </Label>
                                    <InputText
                                        name={`forms.${index}.nik`}
                                        className="mb-2 block"
                                        value={form.nik || ''}
                                    />
                                    <ErrorMessage
                                        name={`forms.${index}.nik`}
                                        component="div"
                                        className="text-sm text-red-500"
                                    />
                                </div>

                                {/* Nama */}
                                <div>
                                    <Label htmlFor={`forms.${index}.nama`}>
                                        Nama
                                    </Label>
                                    <InputText
                                        name={`forms.${index}.nama`}
                                        className="mb-2 block"
                                        value={form.nama || ''}
                                    />
                                    <ErrorMessage
                                        name={`forms.${index}.nama`}
                                        component="div"
                                        className="text-sm text-red-500"
                                    />
                                </div>

                                {/* Tempat Lahir */}
                                <div>
                                    <Label
                                        htmlFor={`forms.${index}.tempat_lahir`}
                                    >
                                        Tempat Lahir
                                    </Label>
                                    <InputText
                                        name={`forms.${index}.tempat_lahir`}
                                        className="mb-2 block"
                                        value={form.tempat_lahir || ''}
                                    />
                                    <ErrorMessage
                                        name={`forms.${index}.tempat_lahir`}
                                        component="div"
                                        className="text-sm text-red-500"
                                    />
                                </div>
                            </div>

                            <div className="col-span-2 grid grid-cols-3 gap-x-6">
                                {/* Tanggal Lahir */}
                                <div>
                                    <Label
                                        htmlFor={`forms.${index}.tanggal_lahir`}
                                    >
                                        Tanggal Lahir
                                    </Label>
                                    <Field
                                        type="date"
                                        name={`forms.${index}.tanggal_lahir`}
                                        className="mb-2 mt-1 block w-full rounded-md border border-blue-300/50 bg-white px-3 py-2 dark:border-gray-500/50 dark:bg-gray-700 dark:focus:ring-gray-800"
                                        value={form.tanggal_lahir || ''}
                                    />
                                    <ErrorMessage
                                        name={`forms.${index}.tanggal_lahir`}
                                        component="div"
                                        className="text-sm text-red-500"
                                    />
                                </div>

                                {/* Golongan Darah */}
                                <div>
                                    <Label
                                        htmlFor={`forms.${index}.gol_darahs`}
                                    >
                                        Golongan Darah
                                    </Label>
                                    <Field
                                        as="select"
                                        name={`forms.${index}.gol_darahs.gol_darah`}
                                        onChange={(e: any) =>
                                            handleChange(
                                                e.target.value,
                                                dataGolDarah,
                                                'gol_darah',
                                                {
                                                    id: `forms.${index}.gol_darahs.id`,
                                                    name: `forms.${index}.gol_darahs.gol_darah`,
                                                },
                                            )
                                        }
                                        className="mb-2 mt-1 block w-full rounded-md border border-blue-300/50 bg-white px-3 py-2 dark:border-gray-500/50 dark:bg-gray-700 dark:focus:ring-gray-800"
                                    >
                                        {dataGolDarah.map(
                                            ({ id, gol_darah }) => (
                                                <option
                                                    key={id}
                                                    value={gol_darah}
                                                >
                                                    {gol_darah}
                                                </option>
                                            ),
                                        )}
                                    </Field>

                                    <ErrorMessage
                                        name={`forms.${index}.gol_darahs.gol_darah`}
                                        component="div"
                                        className="text-sm text-red-500"
                                    />
                                </div>

                                {/* Agama */}
                                <div>
                                    <Label htmlFor={`forms.${index}.agama`}>
                                        Agama
                                    </Label>
                                    <Field
                                        as="select"
                                        name={`forms.${index}.agama.agama`}
                                        onChange={(e: any) =>
                                            handleChange(
                                                e.target.value,
                                                agama,
                                                'agama',
                                                {
                                                    id: `forms.${index}.agama.id`,
                                                    name: `forms.${index}.agama.agama`,
                                                },
                                            )
                                        }
                                        className="mb-2 mt-1 block w-full rounded-md border border-blue-300/50 bg-white px-3 py-2 dark:border-gray-500/50 dark:bg-gray-700 dark:focus:ring-gray-800"
                                    >
                                        {agama.map(({ id, agama }) => (
                                            <option key={id} value={agama}>
                                                {agama}
                                            </option>
                                        ))}
                                    </Field>

                                    <ErrorMessage
                                        name={`forms.${index}.agama.agama`}
                                        component="div"
                                        className="text-sm text-red-500"
                                    />
                                </div>
                            </div>

                            <div className="col-span-2 grid grid-cols-3 gap-6">
                                {/* Pekerjaan */}
                                <div>
                                    <Label
                                        htmlFor={`forms.${index}.pekerjaan.pekerjaan`}
                                    >
                                        Pekerjaan
                                    </Label>
                                    <Field
                                        as="select"
                                        name={`forms.${index}.pekerjaan.pekerjaan`}
                                        onChange={(e: any) =>
                                            handleChange(
                                                e.target.value,
                                                dataPekerjaan,
                                                'pekerjaan',
                                                {
                                                    id: `forms.${index}.pekerjaan.id`,
                                                    name: `forms.${index}.pekerjaan.pekerjaan`,
                                                },
                                            )
                                        }
                                        className="mb-2 mt-1 block w-full rounded-md border border-blue-300/50 bg-white px-3 py-2 dark:border-gray-500/50 dark:bg-gray-700 dark:focus:ring-gray-800"
                                    >
                                        {dataPekerjaan.map(
                                            ({ id, pekerjaan }) => (
                                                <option
                                                    key={id}
                                                    value={pekerjaan}
                                                >
                                                    {pekerjaan}
                                                </option>
                                            ),
                                        )}
                                    </Field>

                                    <ErrorMessage
                                        name={`forms.${index}.pekerjaan.pekerjaan`}
                                        component="div"
                                        className="text-sm text-red-500"
                                    />
                                </div>

                                {/* Kewarganegaraan */}
                                <div>
                                    <Label
                                        htmlFor={`forms.${index}.kewarganegaraan.kewarganegaraan`}
                                    >
                                        Kewarganegaraan
                                    </Label>
                                    <Field
                                        as="select"
                                        name={`forms.${index}.kewarganegaraan.kewarganegaraan`}
                                        onChange={(e: any) =>
                                            handleChange(
                                                e.target.value,
                                                dataKewarganegaraan,
                                                'kewarganegaraan',
                                                {
                                                    id: `forms.${index}.kewarganegaraan.id`,
                                                    name: `forms.${index}.kewarganegaraan.kewarganegaraan`,
                                                },
                                            )
                                        }
                                        className="mb-2 mt-1 block w-full rounded-md border border-blue-300/50 bg-white px-3 py-2 dark:border-gray-500/50 dark:bg-gray-700 dark:focus:ring-gray-800"
                                    >
                                        {dataKewarganegaraan.map(
                                            ({ id, kewarganegaraan }) => (
                                                <option
                                                    key={id}
                                                    value={kewarganegaraan}
                                                >
                                                    {kewarganegaraan}
                                                </option>
                                            ),
                                        )}
                                    </Field>

                                    <ErrorMessage
                                        name={`forms.${index}.kewarganegaraan.kewarganegaraan`}
                                        component="div"
                                        className="text-sm text-red-500"
                                    />
                                </div>

                                {/* Status Kawin */}
                                <div>
                                    <Label
                                        htmlFor={`forms.${index}.status_kawin.status`}
                                    >
                                        Status Kawin
                                    </Label>
                                    <Field
                                        as="select"
                                        name={`forms.${index}.status_kawin.status`}
                                        onChange={(e: any) =>
                                            handleChange(
                                                e.target.value,
                                                dataStatusKawin,
                                                'status',
                                                {
                                                    id: `forms.${index}.status_kawin.id`,
                                                    name: `forms.${index}.status_kawin.status`,
                                                },
                                            )
                                        }
                                        className="mb-2 mt-1 block w-full rounded-md border border-blue-300/50 bg-white px-3 py-2 dark:border-gray-500/50 dark:bg-gray-700 dark:focus:ring-gray-800"
                                    >
                                        {dataStatusKawin.map(
                                            ({ id, status }) => (
                                                <option key={id} value={status}>
                                                    {status}
                                                </option>
                                            ),
                                        )}
                                    </Field>

                                    <ErrorMessage
                                        name={`forms.${index}.status_kawin.status`}
                                        component="div"
                                        className="text-sm text-red-500"
                                    />
                                </div>
                            </div>

                            {/* Jenis Kelamin */}
                            <div className="col-span-2">
                                <Label
                                    htmlFor={`forms.${index}.jenis_kelamin.jenis_kelamin`}
                                    className="block"
                                >
                                    Jenis Kelamin
                                </Label>
                                {dataKelamin.map(({ id, jenis_kelamin }) => (
                                    <div
                                        key={'kelamin' + id}
                                        className="inline-block"
                                    >
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
                                                    },
                                                )
                                            }
                                        />
                                        <Field
                                            type="text"
                                            name={`forms.${index}.jenis_kelamin.id`}
                                            hidden={true}
                                            value={id}
                                        />
                                        <label
                                            htmlFor={`forms.${index}.jenis_kelamin.jenis_kelamin`}
                                            className="mr-4"
                                        >
                                            {jenis_kelamin}
                                        </label>
                                    </div>
                                ))}

                                <ErrorMessage
                                    name={`forms.${index}.jenis_kelamin.jenis_kelamin`}
                                    component="div"
                                    className="text-sm text-red-500"
                                />
                            </div>
                        </div>

                        {/* Button to remove the current form */}
                        <button
                            type="button"
                            onClick={() => {
                                if (setIdx && setIsOpenDiscardModal) {
                                    handleConfirmModal(
                                        remove,
                                        index,
                                        formik,
                                        setIdx, // Pastikan setIdx sudah didefinisikan
                                        setIsOpenDiscardModal,
                                    );
                                }
                            }}
                            disabled={formik.values.forms.length === 1}
                            className="mt-8 rounded-md bg-red-500 px-4 py-2 text-white disabled:cursor-not-allowed disabled:bg-gray-500"
                        >
                            Hapus
                        </button>
                    </FormContent>
                </Box>
            ))}

            <div className="space-x-5">
                <button
                    type="button"
                    onClick={() =>
                        handleAddForm(push, setOpenByIdx, formField, formik)
                    }
                    className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-white"
                >
                    Tambah Formulir
                </button>

                <button
                    type="button"
                    onClick={async () => {
                        // Lakukan validasi form
                        const isValid = await formik.validateForm();

                        // Cek apakah validasi berhasil
                        if (Object.keys(isValid).length === 0) {
                            setIsOpenSubmitModal(true); // Buka modal jika valid
                        } else {
                            // Tampilkan pesan error jika form tidak valid
                            alert(
                                'Form belum terisi dengan benar, silakan periksa kembali.',
                            );
                        }
                    }}
                    className="mt-4 rounded-md bg-green-500 px-4 py-2 text-white"
                >
                    Kirim
                </button>
            </div>
        </Form>
    );
}
