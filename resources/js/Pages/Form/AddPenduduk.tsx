import AddPendudukForm from '@/Components/form/AddPendudukForm';
import ConfirmDiscardModal from '@/Components/modal/ConfirmDiscardModal';
import ConfirmSubmitModal from '@/Components/modal/ConfirmSubmitModal';
import { AddPendudukProps } from '@/interface/pageprops/interface';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { handleSubmitTambahPenduduk } from '@/services/form/routerService';
import { FieldArray, Formik } from 'formik';
import { useState } from 'react';
import { Mosaic } from 'react-loading-indicators';
import { formFieldBiodata } from './InitialValues';
import { validationSchemabuatKTP } from './validation';

export default function AddPenduduk({ agama, dataKelamin, dataGolDarah, dataKewarganegaraan, dataPekerjaan, dataStatusKawin, dataStatusHubungan }: AddPendudukProps) {
    const [openByIdx, setOpenByIdx] = useState<boolean[]>([true]);
    const [idx, setIdx] = useState<number>(0);
    const [isOpenSubmitModal, setIsOpenSubmitModal] = useState(false);
    const [isOpenDiscardModal, setisOpenDiscardModal] = useState<boolean>(false);
    const [loading, setLoading] = useState(false);

    const toggleAccordion = (index: number) => {
        const newOpenByIdx = [...openByIdx];
        newOpenByIdx[index] = !newOpenByIdx[index];
        setOpenByIdx(newOpenByIdx);
    };

    return (
        <Authenticated>
            {loading && (
                <div className="fixed left-0 right-0 top-0 z-50 flex h-full items-center justify-center  bg-white/20 backdrop-blur-sm">
                    <Mosaic color={"#3b82f6"} />
                </div>
            )}
            <Formik
                initialValues={{
                    forms: [formFieldBiodata],
                }}
                onSubmit={(values, formikHelpers) => handleSubmitTambahPenduduk(values, formikHelpers, setLoading)}
                validationSchema={validationSchemabuatKTP}
            >
                {(formikProps) => {
                    return (
                        <FieldArray name="forms">
                            {({ push, remove }) => (
                                <>
                                    <AddPendudukForm
                                        loading={loading}
                                        setIsOpenDiscardModal={setisOpenDiscardModal}
                                        data={{
                                            agama,
                                            dataKelamin,
                                            dataGolDarah,
                                            dataKewarganegaraan,
                                            dataPekerjaan,
                                            dataStatusKawin,
                                            dataStatusHubungan,
                                        }}
                                        formField={formFieldBiodata}
                                        setOpenByIdx={setOpenByIdx}
                                        toggleAccordion={toggleAccordion}
                                        formik={formikProps}
                                        openByIdx={openByIdx}
                                        push={push}
                                        remove={remove}
                                        setIsOpenSubmitModal={setIsOpenSubmitModal}
                                        setIdx={setIdx}
                                    />
                                    <ConfirmDiscardModal isOpenConfirmModal={isOpenDiscardModal} index={idx} setIsOpenConfirmModal={setisOpenDiscardModal} remove={remove} />
                                    <ConfirmSubmitModal formik={formikProps} isOpenSubmitModal={isOpenSubmitModal} index={idx} setIsOpenSubmitModal={setIsOpenSubmitModal} />
                                </>
                            )}
                        </FieldArray>
                    );
                }}
            </Formik>
        </Authenticated>
    );
}
