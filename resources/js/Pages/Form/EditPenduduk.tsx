import Button from '@/Components/button/Button';
import EditPendudukForm from '@/Components/form/EditPendudukForm';
import ConfirmDiscardModal from '@/Components/modal/ConfirmDiscardModal';
import ConfirmEditModal from '@/Components/modal/ConfirmEditModal';
import { InputPendudukProps } from '@/interface/interface';
import { AddPendudukProps } from '@/interface/pageprops/interface';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { handleSubmit } from '@/services/edit-router/routerService';
import { FieldArray, Formik } from 'formik';
import { useEffect, useMemo, useState } from 'react';
import { validationSchemaEdit } from './validation';

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
    const [isOpenDiscardModal, setIsOpenDiscardModal] =
        useState<boolean>(false);

    const initialOpenByIdx = useMemo(
        () => new Array(data_penduduk.length).fill(true),
        [data_penduduk.length],
    );

    useEffect(() => {
        setOpenByIdx(initialOpenByIdx);
    }, [initialOpenByIdx]);

    const toggleAccordion = (index: number) => {
        setOpenByIdx((prevState) => {
            const newState = [...prevState];
            newState[index] = !newState[index];
            return newState;
        });
    };

    // Initial values function
    const getInitialValues = () => ({
        forms: data_penduduk.map((penduduk) => ({
            nik: penduduk.nik,
            nama: penduduk.nama,
            tanggal_lahir: penduduk.tanggal_lahir,
            tempat_lahir: penduduk.tempat_lahir,
            jenis_kelamin: penduduk.jenis_kelamin,
            gol_darahs: penduduk.gol_darahs,
            agama: penduduk.agama,
            status_kawin: penduduk.status_kawin,
            pekerjaan: penduduk.pekerjaan,
            kewarganegaraan: penduduk.kewarganegaraan,
            alamat: {
                id: penduduk.alamat.id.toString(),
                alamat: penduduk.alamat.alamat,
                kelurahan_id: penduduk.alamat.kelurahan_id,
                kelurahan_nama: penduduk.alamat.kelurahan_nama,
                kecamatan_nama: penduduk.alamat.kecamatan_nama,
                kabupaten_nama: penduduk.alamat.kabupaten_nama,
            },
        })),
    });

    return (
        <Authenticated>
            <Formik
                validationSchema={validationSchemaEdit}
                initialValues={getInitialValues()}
                onSubmit={handleSubmit}
                validateOnChange={true}
            >
                {(formikProps) => (
                    <FieldArray name="forms">
                        {({ push, remove }) => {
                            console.log(
                                'data edit penduduk',
                                formikProps.values.forms,
                            );
                            return (
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
                                    <ConfirmDiscardModal
                                        isOpenConfirmModal={isOpenDiscardModal}
                                        index={idx}
                                        setIsOpenConfirmModal={
                                            setIsOpenDiscardModal
                                        }
                                        remove={remove}
                                    />
                                    <ConfirmEditModal
                                        formik={formikProps}
                                        isOpenSubmitModal={isOpenSubmitModal}
                                        index={idx}
                                        setIsOpenSubmitModal={
                                            setIsOpenSubmitModal
                                        }
                                    />
                                </>
                            );
                        }}
                    </FieldArray>
                )}
            </Formik>

            <div className="mt-4 space-x-5">
                <Button onClick={() => setIsOpenSubmitModal(true)}>
                    Simpan
                </Button>
            </div>
        </Authenticated>
    );
}
