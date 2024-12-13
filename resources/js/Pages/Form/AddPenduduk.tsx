import AddPendudukForm from '@/Components/form/AddPendudukForm';
import ConfirmDiscardModal from '@/Components/modal/ConfirmDiscardModal';
import ConfirmSubmitModal from '@/Components/modal/ConfirmSubmitModal';
import { AddPendudukProps } from '@/interface/pageprops/interface';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { router } from '@inertiajs/react';
import { FieldArray, Formik } from 'formik';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { formField } from './FormatData';
import { validationSchema } from './validation';

export default function AddPenduduk({
    agama,
    dataKelamin,
    dataGolDarah,
    dataKewarganegaraan,
    dataPekerjaan,
    dataStatusKawin,
}: AddPendudukProps) {
    const [loading, setLoading] = useState(false);
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

    const handleSubmit = async (values: any) => {
        try {
            setLoading(true);
            router.post(
                route('penduduk.store'),
                { forms: values.forms },
                {
                    onSuccess: () => {
                        toast.success('Berhasil input data');
                        router.visit('/population');
                    },
                    onError: (errors) => {
                        console.error('Error submitting form:', errors);
                    },
                },
            );
        } catch (error) {
            console.error('Form submit error:', error);
        } finally {
            setLoading(false); // Set loading to false when the submit finishes
        }
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
                                        setOpenByIdx={setOpenByIdx}
                                        toggleAccordion={toggleAccordion}
                                        formik={formikProps}
                                        openByIdx={openByIdx}
                                        push={push}
                                        loading={loading}
                                        remove={remove}
                                        setIsOpenSubmitModal={
                                            setIsOpenSubmitModal
                                        }
                                        setIdx={setIdx}
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
                                        <ConfirmSubmitModal
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
