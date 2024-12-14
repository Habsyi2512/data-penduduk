import { useFormHooks } from '@/hooks/FormHooks';
import { EditPendudukFormProps } from '@/interface/pageprops/interface';
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
    SuggestionList,
} from './components/FormComponents';
import InputText from './components/InputText';
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
    const { suggestions, queries, setDistrict, setRegency, handleInputChange, handleSuggestionClick } = useFormHooks();
    const { agama, dataKelamin, dataGolDarah, dataKewarganegaraan, dataPekerjaan, dataStatusKawin } = data;

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

    useEffect(() => {
        if (!Object.keys(queries).length) {
            setDistrict(0, { district_id: '', district_name: '' });
            setRegency(0, { regency_id: '', regency_name: '' });
        }
    }, [queries]);

    return (
        <Form>
            {formik.values.forms.map((form, index) => (
                <Box key={index} className="mb-3">
                    <FormHeader>
                        <FormTitle
                            title={`Form Edit ${form.nik} `}
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
                                    name={`forms.${index}.nik`}
                                    disabled={true}
                                    placeholder="Masukkan NIK"
                                />

                                {/* Nama */}
                                <InputTextField
                                    label="Nama"
                                    name={`forms.${index}.nama`}
                                    placeholder="Masukkan nama"
                                />

                                {/* Tempat Lahir */}
                                <InputTextField
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

                            {/* Wilayah */}
                            <div className="col-span-2 grid grid-cols-3 gap-x-6">
                                <div>
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

                                <div>
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
                                            onChange={() =>
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
                    </FormContent>
                </Box>
            ))}
        </Form>
    );
}
