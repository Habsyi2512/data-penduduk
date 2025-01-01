import { useFormHooks } from '@/hooks/FormHooks';
import { EditPendudukFormProps } from '@/interface/pageprops/interface';
import { Link } from '@inertiajs/react';
import { ErrorMessage, Field, Form } from 'formik';
import Box from '../box/Box';
import { ChevronRightIcon } from '../icons/ChevronRightIcon';
import Divider from '../ui/Divider';
import {
    BlueButton,
    FormContent,
    FormHeader,
    FormHeaderAction,
    FormTitle,
} from './components/FormComponents';
import Label from './components/Label';
import InputDateField from './components/form-fields/InputDateField';
import InputSelectField from './components/form-fields/InputSelectField';
import InputTextField from './components/form-fields/InputTextField';

export default function EditPendudukForm({
    formik,
    data,
    openByIdx,
    toggleAccordion,
}: EditPendudukFormProps) {

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
        } else {
            formik.setFieldValue(name.id, '');
            formik.setFieldValue(name.name, '');
        }
    };

    return (
        <>
            <Link
                href="/population"
                className="mb-3 flex w-fit items-center rounded bg-white/70 px-3 py-2 text-blue-600 shadow hover:text-blue-800 hover:underline"
            >
                <ChevronRightIcon className="w-5 rotate-180" />
                Kembali
            </Link>

            <Form>
                {formik.values.forms.map((form, index) => (
                    <Box key={index} className="mb-3">
                        <FormHeader>
                            <FormTitle
                                title={`Form Edit ${form.no_kk} `}
                                showIndex={false}
                                index={index}
                            />
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

                                    <InputTextField
                                        label="NIK"
                                        type='hidden'
                                        formik={formik}
                                        name={`forms.${index}.nik`}
                                        disabled={true}
                                        placeholder="Masukkan NIK"
                                    />

                                    {/* Nama */}
                                    <InputTextField
                                        label="Nama"
                                        formik={formik}
                                        name={`forms.${index}.nama`}
                                        placeholder="Masukkan nama"
                                    />

                                    {/* Tempat Lahir */}
                                    <InputTextField
                                        formik={formik}
                                        label="Tempat Lahir"
                                        name={`forms.${index}.tempat_lahir`}
                                        placeholder="Masukkan tempat lahir"
                                    />
                                </div>

                                <div className="col-span-2 grid grid-cols-3 gap-x-6">
                                    {/* Tanggal Lahir */}
                                    <InputDateField
                                        label="Tanggal Lahir"
                                        name={`forms.${index}.tanggal_lahir`}
                                        className="custom-class"
                                    />

                                    {/* Golongan Darah */}
                                    <InputSelectField
                                        index={index}
                                        dataKey="gol_darah"
                                        onChange={handleChange}
                                        name={`forms.${index}.gol_darahs.gol_darah`}
                                        label="Golongan Darah"
                                        options={dataGolDarah}
                                    />

                                    {/* Agama */}
                                    <InputSelectField
                                        index={index}
                                        dataKey="agama"
                                        onChange={handleChange}
                                        name={`forms.${index}.agama.agama`}
                                        label="Agama"
                                        options={agama}
                                    />
                                </div>

                                <div className="col-span-2 grid grid-cols-3 gap-6">
                                    {/* Pekerjaan */}
                                    <InputSelectField
                                        index={index}
                                        dataKey="pekerjaan"
                                        onChange={handleChange}
                                        name={`forms.${index}.pekerjaan.pekerjaan`}
                                        label="Pekerjaan"
                                        options={dataPekerjaan}
                                    />

                                    {/* Kewarganegaraan */}
                                    <InputSelectField
                                        index={index}
                                        dataKey="kewarganegaraan"
                                        onChange={handleChange}
                                        name={`forms.${index}.kewarganegaraan.kewarganegaraan`}
                                        label="Kewarganegaraan"
                                        options={dataKewarganegaraan}
                                    />

                                    {/* Status Kawin */}
                                    <InputSelectField
                                        index={index}
                                        dataKey="status"
                                        onChange={handleChange}
                                        name={`forms.${index}.status_kawin.status`}
                                        label="Status Kawin"
                                        options={dataStatusKawin}
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
                                                    onChange={() =>
                                                        handleChange(
                                                            jenis_kelamin,
                                                            dataKelamin,
                                                            'jenis_kelamin',
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
                        </FormContent>
                    </Box>
                ))}
            </Form>
        </>
    );
}
