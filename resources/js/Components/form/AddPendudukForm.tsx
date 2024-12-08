import { InputPendudukProps } from '@/interface/interface';
import { AddPendudukProps } from '@/interface/pageprops/interface';
import { ErrorMessage, Field, Form, FormikProps } from 'formik';
import { SetStateAction, useEffect, useState } from 'react';
import Box from '../box/Box';
import { TrashIcon } from '../icons/TrashIcon';
import InputText from './components/InputText';
import Label from './components/Label';

interface AddPendudukFormProps {
    formik: FormikProps<{
        forms: InputPendudukProps[]; // Ensure this matches the actual structure you're using
    }>;
    data: AddPendudukProps;
    formField: InputPendudukProps;
    push: <X = any>(obj: X) => void;
    remove: <X = any>(index: number) => X | undefined;
    openByIdx: boolean[];
    setOpenByIdx: React.Dispatch<SetStateAction<boolean[]>>;
    toggleAccordion: (index: number) => void;
    handleConfirmModal: (
        remove: <X = any>(index: number) => X | undefined,
        index: number,
        formik: FormikProps<{
            forms: InputPendudukProps[]; // Ensure this matches the actual structure you're using
        }>,
    ) => void;
}

export default function AddPendudukForm({
    formik,
    data,
    formField,
    push,
    remove,
    openByIdx,
    setOpenByIdx,
    toggleAccordion,
    handleConfirmModal,
}: AddPendudukFormProps) {
    const handleAddForm = (push: <X = any>(obj: X) => void) => {
        push<InputPendudukProps>(formField);
        setOpenByIdx((prevState) => [...prevState, true]);
    };

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
        // Temukan data yang sesuai berdasarkan key dan value yang dipilih
        const selectedData = data.find(
            (dataItem: any) => dataItem[key] === value,
        );

        if (selectedData) {
            // Mengatur nilai ID berdasarkan data yang ditemukan
            formik.setFieldValue(name.id, selectedData.id);
            // Mengatur nilai field name berdasarkan data yang ditemukan
            formik.setFieldValue(name.name, selectedData[key]);
        }
    };

    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [regency, setRegency] = useState<{
        regency_id: string;
        regency_name: string;
    }>({ regency_id: '', regency_name: '' });
    const [district, setDistrict] = useState<{
        district_id: string;
        district_name: string;
    }>({ district_id: '', district_name: '' });
    const [village, setVillage] = useState<{ id: string; name: string }>({
        id: '',
        name: '',
    });

    const fetchSuggestions = async (searchQuery: string) => {
        const response = await fetch(`/api/search-village?q=${searchQuery}`);
        const data = await response.json();
        // console.log('dataa', data);

        setSuggestions(data);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        console.log('value = ', value);
        setQuery(value);

        if (value.length > 2) {
            fetchSuggestions(value);
        } else {
            setSuggestions([]);
        }
    };

    // Menangani klik pada item saran
    const handleSuggestionClick = (suggestion: any, index:number) => {
        setQuery(suggestion.name); // Isi input dengan nama desa yang dipilih
        setRegency({
            regency_id: suggestion.regency_id,
            regency_name: suggestion.regency_name,
        });
        setDistrict({
            district_id: suggestion.district_id,
            district_name: suggestion.district_name,
        });
        console.log('data', suggestion);
        formik.setFieldValue(`alamat.${index}.kelurahan_id`, suggestion.id);
        setSuggestions([]); // Reset daftar saran setelah klik
    };

    useEffect(() => {
        if (query.length == 0) {
            setDistrict({ district_id: '', district_name: '' });
            setRegency({ regency_id: '', regency_name: '' });
        }
    }, [query]);

    return (
        <Form>
            {formik.values.forms.map((form, index) => (
                <Box key={index} className="mb-3">
                    <div className="flex items-center justify-between p-5">
                        <h2 className="font-inter text-xl font-bold text-blue-600 dark:text-gray-400">
                            Form {index + 1}
                        </h2>
                        <div className="flex h-full w-auto space-x-3">
                            {!openByIdx[index] && (
                                <button
                                    type="button"
                                    onClick={() =>
                                        handleConfirmModal(
                                            remove,
                                            index,
                                            formik,
                                        )
                                    }
                                    disabled={formik.values.forms.length === 1} // Disable when there's only one form
                                    className="flex aspect-square w-10 flex-1 items-center justify-center rounded-md bg-red-500 text-white hover:bg-red-600 disabled:cursor-not-allowed disabled:bg-gray-500"
                                >
                                    <TrashIcon className="h-5 w-5" />
                                </button>
                            )}
                            <button
                                type="button"
                                onClick={() => toggleAccordion(index)}
                                className="w-20 rounded-md border border-blue-300/50 bg-blue-100 p-2 text-blue-600 dark:bg-gray-700 dark:text-gray-300 hover:dark:border-gray-500/50 dark:hover:bg-gray-600"
                            >
                                {openByIdx[index] ? 'Tutup' : 'Buka'}
                            </button>
                        </div>
                    </div>
                    {openByIdx[index] && (
                        <hr className="border-blue-200 dark:border-gray-800" />
                    )}
                    <div
                        className={`grid transition-all ${
                            openByIdx[index]
                                ? 'grid-rows-[1fr] opacity-100'
                                : 'grid-rows-[0fr] opacity-0'
                        }`}
                    >
                        <div className="overflow-hidden">
                            <div className="p-5">
                                <div className="grid grid-cols-2 gap-5">
                                    <div className="col-span-2 grid grid-cols-3 gap-x-6">
                                        {/* NIK */}
                                        <div>
                                            <Label
                                                htmlFor={`forms.${index}.nik`}
                                            >
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
                                            <Label
                                                htmlFor={`forms.${index}.nama`}
                                            >
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
                                            <Label
                                                htmlFor={`forms.${index}.agama`}
                                            >
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
                                                    <option
                                                        key={id}
                                                        value={agama}
                                                    >
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
                                                    ({
                                                        id,
                                                        kewarganegaraan,
                                                    }) => (
                                                        <option
                                                            key={id}
                                                            value={
                                                                kewarganegaraan
                                                            }
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
                                                        <option
                                                            key={id}
                                                            value={status}
                                                        >
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
                                                name="Kabupaten"
                                                placeholder="Kabupaten"
                                                value={regency.regency_name}
                                            />
                                        </div>

                                        <div className="flex-1">
                                            <Label htmlFor={`Kecamatan`}>
                                                Kecamatan
                                            </Label>
                                            <InputText
                                                disabled
                                                type="text"
                                                name="Kecamatan"
                                                placeholder="Kecamatan"
                                                value={district.district_name}
                                            />
                                        </div>
                                        <div className="relative flex-1">
                                            <Label htmlFor={`Kelurahan`}>
                                                Kelurahan/Desa
                                            </Label>
                                            <InputText
                                                type="text"
                                                name="desa"
                                                placeholder="Desa/Kelurahan"
                                                value={query}
                                                onChange={handleInputChange}
                                            />
                                            <ul className="absolute top-[70px] z-[9999] mt-2 w-auto rounded border bg-white shadow">
                                                {suggestions.map(
                                                    (item: any) => {
                                                        console.log(item)
                                                        return (
                                                            <li
                                                                key={item.id}
                                                                onClick={() =>
                                                                    handleSuggestionClick(
                                                                        item,
                                                                        index
                                                                    )
                                                                } // Tangani klik
                                                                className="cursor-pointer truncate px-4 py-2 hover:bg-gray-100"
                                                            >
                                                                <span className="text-sm">
                                                                    {item.name}
                                                                </span>
                                                                ,{' '}
                                                                <span className="text-xs text-gray-500">
                                                                    {
                                                                        item.district_name
                                                                    }
                                                                </span>
                                                                ,{' '}
                                                                <span className="text-xs text-gray-500">
                                                                    {
                                                                        item.regency_name
                                                                    }
                                                                </span>
                                                            </li>
                                                        );
                                                    },
                                                )}
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Alamat */}
                                    <div>
                                        <Label
                                            htmlFor={`forms.${index}.alamat.alamat`}
                                        >
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
                                        {dataKelamin.map(
                                            ({ id, jenis_kelamin }) => (
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
                                            ),
                                        )}

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
                                    onClick={() =>
                                        handleConfirmModal(
                                            remove,
                                            index,
                                            formik,
                                        )
                                    }
                                    disabled={formik.values.forms.length === 1}
                                    className="mt-8 rounded-md bg-red-500 px-4 py-2 text-white disabled:cursor-not-allowed disabled:bg-gray-500"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                </Box>
            ))}

            <div className="space-x-5">
                <button
                    type="button"
                    onClick={() => handleAddForm(push)}
                    className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-white"
                >
                    Add Form
                </button>

                <button
                    type="submit"
                    className="mt-4 rounded-md bg-green-500 px-4 py-2 text-white"
                >
                    Submit
                </button>
            </div>
        </Form>
    );
}

const TextArea = ({ children }: { children: React.ReactNode }) => {
    return (
        <textarea
            className="mb-2 mt-1 block w-full rounded-md border border-blue-300/50 bg-white px-3 py-2 dark:border-gray-500/50 dark:bg-gray-700 dark:focus:ring-gray-800"
            id="w3review"
            name="w3review"
            rows={4}
            cols={50}
        >
            {children}
        </textarea>
    );
};
