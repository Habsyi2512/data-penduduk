import EditPendudukForm from '@/Components/form/EditPendudukForm';
import ConfirmDiscardModal from '@/Components/modal/ConfirmDiscardModal';
import ConfirmEditModal from '@/Components/modal/ConfirmEditModal';
import { InputPendudukProps } from '@/interface/interface';
import { AddPendudukProps } from '@/interface/pageprops/interface';
import { DataPendudukProps } from '@/interface/pagination/interface';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { router } from '@inertiajs/react';
import { FieldArray, Formik } from 'formik';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface EditPendudukProps extends AddPendudukProps {
    data_penduduk: DataPendudukProps;
}

export default function EditPenduduk({
    agama,
    dataKelamin,
    dataGolDarah,
    dataKewarganegaraan,
    dataPekerjaan,
    dataStatusKawin,
    data_penduduk,
}: EditPendudukProps) {
    const [openByIdx, setOpenByIdx] = useState<boolean[]>([true]);
    const [idx, setIdx] = useState<number>(0);
    const [isOpenSubmitModal, setIsOpenSubmitModal] = useState(false);
    const [isOpenDiscardModal, setisOpenDiscardModal] =
        useState<boolean>(false);

    const toggleAccordion = (index: number) => {
        const newOpenByIdx = [...openByIdx];
        newOpenByIdx[index] = !newOpenByIdx[index];
        setOpenByIdx(newOpenByIdx);
    };

    const handleSubmit = (values: any) => {
        router.put(route('penduduk.update', data_penduduk.nik), values, {
            onSuccess: () => {
                toast.success('Data berhasil diperbarui!');
            },
            onError: (errors) => {
                console.error('Error:', errors);
                toast.error('Terjadi kesalahan, silakan coba lagi.');
            },
        });
    };

    const formField: InputPendudukProps = {
        nik: data_penduduk.nik,
        nama: data_penduduk.nama,
        tempat_lahir: data_penduduk.tempat_lahir,
        tanggal_lahir: data_penduduk.tanggal_lahir.split('T')[0],
        jenis_kelamin: {
            id: data_penduduk.jenis_kelamin.id,
            jenis_kelamin: data_penduduk.jenis_kelamin.jenis_kelamin,
        },
        gol_darahs: {
            id: data_penduduk.gol_darah.id,
            gol_darah: data_penduduk.gol_darah.gol_darah,
        },
        agama: { id: data_penduduk.agama.id, agama: data_penduduk.agama.agama },
        status_kawin: {
            id: data_penduduk.status_kawin.id,
            status: data_penduduk.status_kawin.status,
        },
        pekerjaan: {
            id: data_penduduk.pekerjaan.id,
            pekerjaan: data_penduduk.pekerjaan.pekerjaan,
        },
        kewarganegaraan: {
            id: data_penduduk.kewarganegaraan.id,
            kewarganegaraan: data_penduduk.kewarganegaraan.kewarganegaraan,
        },
        alamat: {
            id: data_penduduk.alamat.id.toString(),
            alamat: data_penduduk.alamat.alamat,
            kelurahan_id: data_penduduk.alamat.kelurahan_id,
            kelurahan_nama: data_penduduk.alamat.village.name,
            kecamatan_nama: data_penduduk.alamat.village.district.name,
            kabupaten_nama: data_penduduk.alamat.village.district.regency.name,
        },
        getKelurahan: function (): string {
            return this.alamat.kelurahan_nama;
        },
    };

    return (
        <Authenticated>
            <Formik
                initialValues={{
                    forms: [formField],
                }}
                onSubmit={handleSubmit}
            >
                {(formikProps) => {
                    return (
                        <FieldArray name="forms">
                            {({ push, remove }) => (
                                <>
                                    <EditPendudukForm
                                        data={{
                                            agama,
                                            dataKelamin,
                                            dataGolDarah,
                                            dataKewarganegaraan,
                                            dataPekerjaan,
                                            dataStatusKawin,
                                        }}
                                        formField={formField}
                                        setOpenByIdx={setOpenByIdx}
                                        toggleAccordion={toggleAccordion}
                                        formik={formikProps}
                                        openByIdx={openByIdx}
                                        push={push}
                                        remove={remove}
                                        setIsOpenSubmitModal={
                                            setIsOpenSubmitModal
                                        }
                                    />
                                    {isOpenDiscardModal && (
                                        <ConfirmDiscardModal
                                            isOpenConfirmModal={
                                                isOpenDiscardModal
                                            }
                                            index={idx}
                                            setIsOpenConfirmModal={
                                                setisOpenDiscardModal
                                            }
                                            remove={remove}
                                        />
                                    )}
                                    {isOpenSubmitModal && (
                                        <ConfirmEditModal
                                            formik={formikProps}
                                            isOpenSubmitModal={
                                                isOpenSubmitModal
                                            }
                                            index={idx}
                                            setIsOpenSubmitModal={
                                                setIsOpenSubmitModal
                                            }
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
