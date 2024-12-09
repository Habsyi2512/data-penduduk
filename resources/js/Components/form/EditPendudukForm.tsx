import { useFormHooks } from '@/hooks/FormHooks';
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

export default function EditPendudukForm({
    formik,
    data,
    remove,
    openByIdx,
    toggleAccordion,
    setIsOpenSubmitModal,
    loading,
}: AddPendudukFormProps) {
    const {
        suggestions,
        queries,
        setDistrict,
        setRegency,
        handleInputChange,
        handleSuggestionClick,
    } = useFormHooks();

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
                        <FormTitle title={`Form Edit ${form.nik} `} showIndex={false} index={index} />
                        <FormHeaderAction>
                            
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
                                        disabled={true}
                                        name={`forms.${index}.nik`}
                                        className="mb-2 block disabled:bg-gray-200 disabled:cursor-not-allowed"
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

                            {/* Wilayah */}
                            <div className="col-span-2 grid grid-cols-3 gap-x-6">
                                <div className="flex-1">
                                    <Label htmlFor={`Kabupaten`}>
                                        Kabupaten
                                    </Label>
                                    <InputText
                                        disabled
                                        type="text"
                                        name={`forms.${index}.alamat.kabupaten_nama`}
                                        placeholder="Kabupaten"
                                    />
                                    <ErrorMessage
                                        name={`forms.${index}.alamat.kabupaten_nama`}
                                        component="div"
                                        className="text-sm text-red-500"
                                    />
                                </div>

                                <div className="flex-1">
                                    <Label htmlFor={`Kecamatan`}>
                                        Kecamatan
                                    </Label>
                                    <InputText
                                        disabled
                                        type="text"
                                        name={`forms.${index}.alamat.kecamatan_nama`}
                                        placeholder="Kecamatan"
                                    />
                                    <ErrorMessage
                                        name={`forms.${index}.alamat.kecamatan_nama`}
                                        component="div"
                                        className="text-sm text-red-500"
                                    />
                                </div>
                                <div className="relative flex-1">
                                    <Label htmlFor={`Kelurahan`}>
                                        Kelurahan/Desa
                                    </Label>
                                    <InputText
                                        type="text"
                                        name={`forms.${index}.alamat.kelurahan_nama`}
                                        placeholder="Desa/Kelurahan"
                                        onChange={(e) =>
                                            handleInputChange(e, index, formik)
                                        }
                                    />
                                    <ErrorMessage
                                        name={`forms.${index}.alamat.kelurahan_nama`}
                                        component="div"
                                        className="text-sm text-red-500"
                                    />

                                    <SuggestionList
                                        queries={queries}
                                        index={index} // Gunakan index yang sesuai
                                        formik={formik}
                                        handleSuggestionClick={
                                            handleSuggestionClick
                                        }
                                        suggestions={suggestions}
                                    />
                                </div>
                            </div>

                            {/* Alamat */}
                            <div>
                                <Label htmlFor={`forms.${index}.alamat.alamat`}>
                                    Alamat
                                </Label>
                                <InputText
                                    name={`forms.${index}.alamat.alamat`}
                                    className="mb-2 block"
                                    placeholder="Contoh: Jl. Merdeka No. 123, RT 04/03, Jakarta"
                                />
                                <ErrorMessage
                                    name={`forms.${index}.alamat.alamat`}
                                    component="div"
                                    className="text-sm text-red-500"
                                />
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
                        <div className="space-x-5">
                            <button
                                type="button"
                                onClick={() => setIsOpenSubmitModal(true)}
                                className="mt-4 rounded-md bg-green-500 px-4 py-2 text-white"
                            >
                                {loading ? 'Memuat...' : 'Kirim'}
                            </button>
                        </div>
                    </FormContent>
                </Box>
            ))}
        </Form>
    );
}
