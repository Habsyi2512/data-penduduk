import EditPendudukForm from '@/Components/form/EditPendudukForm';
import ConfirmDiscardModal from '@/Components/modal/ConfirmDiscardModal';
import ConfirmEditModal from '@/Components/modal/ConfirmEditModal';
import { InputPendudukProps } from '@/interface/interface';
import { AddPendudukProps } from '@/interface/pageprops/interface';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { router } from '@inertiajs/react';
import { FieldArray, Formik } from 'formik';
import { useState } from 'react';

interface EditPendudukProps extends AddPendudukProps {
    data_penduduk: InputPendudukProps[];
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
        router.put(route('penduduk.update'), values);
    };

    return (
        <Authenticated>
            <Formik
                initialValues={{
                    forms: data_penduduk.map((penduduk) => ({
                        nik: penduduk.nik,
                        nama: penduduk.nama,
                        tanggal_lahir: penduduk.tanggal_lahir,
                        tempat_lahir: penduduk.tempat_lahir,
                        jenis_kelamin: {
                            id: penduduk.jenis_kelamin.id,
                            jenis_kelamin: penduduk.jenis_kelamin.jenis_kelamin,
                        },
                        gol_darahs: {
                            id: penduduk.gol_darahs.id,
                            gol_darah: penduduk.gol_darahs.gol_darah,
                        },
                        agama: {
                            id: penduduk.agama.id,
                            agama: penduduk.agama.agama,
                        },
                        status_kawin: {
                            id: penduduk.status_kawin.id,
                            status: penduduk.status_kawin.status,
                        },
                        pekerjaan: {
                            id: penduduk.pekerjaan.id,
                            pekerjaan: penduduk.pekerjaan.pekerjaan,
                        },
                        kewarganegaraan: {
                            id: penduduk.kewarganegaraan.id,
                            kewarganegaraan:
                                penduduk.kewarganegaraan.kewarganegaraan,
                        },
                        alamat: {
                            id: penduduk.alamat.id.toString(),
                            alamat: penduduk.alamat.alamat,
                            kelurahan_id: penduduk.alamat.kelurahan_id,
                            kelurahan_nama: penduduk.alamat.kelurahan_nama,
                            kecamatan_nama: penduduk.alamat.kecamatan_nama,
                            kabupaten_nama: penduduk.alamat.kabupaten_nama,
                        },
                    })),
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
                                        formField={formikProps.values.forms}
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
            {/* Button to remove the current form */}
            <div className="space-x-5">
                <button
                    type="button"
                    onClick={() => setIsOpenSubmitModal(true)}
                    className="mt-4 rounded-md bg-green-500 px-4 py-2 text-white"
                >
                    Simpan
                </button>
            </div>
        </Authenticated>
    );
}
