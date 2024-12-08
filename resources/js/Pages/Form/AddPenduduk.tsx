import AddPendudukForm from '@/Components/form/AddPendudukForm';
import ConfirmDiscardModal from '@/Components/modal/ConfirmDiscardModal';
import { InputPendudukProps } from '@/interface/interface';
import { AddPendudukProps } from '@/interface/pageprops/interface';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { FieldArray, Formik, FormikProps } from 'formik';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import * as Yup from 'yup';

const validationSchema = Yup.object({
    forms: Yup.array().of(
        Yup.object({
            nik: Yup.string()
                .required('NIK Wajib diisi')
                .length(16, 'NIK harus berisi 16 karakter berupa angka'),
            nama: Yup.string().required('Nama wajib diisi'),
            tempat_lahir: Yup.string().required('Tempat lahir wajib diisi'),
            tanggal_lahir: Yup.string().required('Tanggal lahir wajib diisi'),
            jenis_kelamin: Yup.object({
                jenis_kelamin: Yup.string().required(
                    'Jenis kelamin wajib diisi',
                ),
            }).required(),
            gol_darahs: Yup.object({
                gol_darah: Yup.string().required('Golongan darah wajib diisi'),
            }).required('Golongan darah wajib diisi'),
            agama: Yup.object({
                agama: Yup.string().required('Agama wajib diisi'),
            }).required('Agama wajib diisi'),
            status_kawin: Yup.object({
                status: Yup.string().required('Status kawin wajib diisi'),
            }).required('Status kawin wajib diisi'),
            pekerjaan: Yup.object({
                pekerjaan: Yup.string().required('Pekerjaan wajib diisi'),
            }).required('Pekerjaan wajib diisi'),
            kewarganegaraan: Yup.object({
                kewarganegaraan: Yup.string().required(
                    'Kewarganegaraan wajib diisi',
                ),
            }).required('Kewarganegaraan wajib diisi'),
            alamat: Yup.object({
                alamat: Yup.string().required('Alamat wajib diisi'),
                kelurahan_id: Yup.string().required('Kelurahan wajib diisi'),
            }).required('Alamat wajib diisi'),
        }),
    ),
});

export default function AddPenduduk({
    agama,
    dataKelamin,
    dataGolDarah,
    dataKewarganegaraan,
    dataPekerjaan,
    dataStatusKawin,
}: AddPendudukProps) {
    const [openByIdx, setOpenByIdx] = useState<boolean[]>([true]);
    const [idx, setIdx] = useState<number>(0);
    const [isOpenConfirmModal, setIsOpenConfirmModal] =
        useState<boolean>(false);

    const toggleAccordion = (index: number) => {
        const newOpenByIdx = [...openByIdx];
        newOpenByIdx[index] = !newOpenByIdx[index];
        setOpenByIdx(newOpenByIdx);
    };

    const handleConfirmModal = (
        remove: <X = any>(index: number) => X | undefined,
        index: number,
        formik: FormikProps<{
            forms: InputPendudukProps[];
        }>,
    ) => {
        setIdx(index);
        const formValues = formik.values.forms[index];
        const isValid = Object.values(formValues).some((value) => value !== '');
        if (isValid) {
            setIsOpenConfirmModal(true);
        } else {
            remove(index);
        }
    };

    const handleSubmit = async (values: any) => {
        try {
            // Kirim data ke server menggunakan router.post
            router.post(route('penduduk.store'), { forms: values.forms }, {
                onSuccess: () => {
                    // Setelah berhasil submit, misalnya redirect ke halaman penduduk
                    console.log('Data submitted successfully');
                    router.get(route('dashboard')); // Redirect ke halaman index penduduk
                },
                onError: (errors) => {
                    console.error('Error submitting form:', errors);
                },
            });
        } catch (error) {
            console.error('Form submit error:', error);
        }
    };

    const formField: InputPendudukProps = {
        nik: '',
        nama: '',
        tempat_lahir: '',
        tanggal_lahir: '',
        jenis_kelamin: { id: '', jenis_kelamin: '' },
        gol_darahs: { id: '', gol_darah: '' },
        agama: { id: '', agama: '' },
        status_kawin: { id: '', status: '' },
        pekerjaan: { id: '', pekerjaan: '' },
        kewarganegaraan: { id: '', kewarganegaraan: '' },
        alamat: { id: '', alamat: '', kelurahan_id: '2105040005' },
    };
    return (
        <Authenticated>
            <Formik
                initialValues={{
                    forms: [formField],
                }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema} // Apply Yup validation schema
            >
                {(formikProps) => {
                    console.log('formikProps:', formikProps.values.forms);
                    return (
                        <FieldArray name="forms">
                            {({ push, remove }) => (
                                <>
                                    <AddPendudukForm
                                        data={{
                                            agama,
                                            dataKelamin,
                                            dataGolDarah,
                                            dataKewarganegaraan,
                                            dataPekerjaan,
                                            dataStatusKawin,
                                        }}
                                        formField={formField}
                                        handleConfirmModal={handleConfirmModal}
                                        setOpenByIdx={setOpenByIdx}
                                        toggleAccordion={toggleAccordion}
                                        formik={formikProps}
                                        openByIdx={openByIdx}
                                        push={push}
                                        remove={remove}
                                    />
                                    {isOpenConfirmModal && (
                                        <ConfirmDiscardModal
                                            isOpenConfirmModal={
                                                isOpenConfirmModal
                                            }
                                            index={idx}
                                            setIsOpenConfirmModal={
                                                setIsOpenConfirmModal
                                            }
                                            remove={remove}
                                        />
                                    )}
                                </>
                            )}
                        </FieldArray>
                    );
                }}
            </Formik>
        </Authenticated>
    );
}
