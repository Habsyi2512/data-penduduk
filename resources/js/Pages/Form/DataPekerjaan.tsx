import DataPekerjaanForm from '@/Components/form/DataPekerjaanForm';
import ConfirmDiscardModal from '@/Components/modal/ConfirmDiscardModal';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { FieldArray, Formik, FormikProps } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';

const validationSchema = Yup.object({
forms: Yup.array().of(
Yup.object({
pekerjaan: Yup.string().required('Pekerjaan is required'),
}),
),
});
export default function DataPekerjaan() {
const [openByIdx, setOpenByIdx] = React.useState<boolean[]>([true]);
    const [idx, setIdx] = useState<number>(0);
        const [isOpenConfirmModal, setIsOpenConfirmModal] = useState<boolean>(false);
            const toggleAccordion = (index: number) => {
            const newOpenByIdx = [...openByIdx];
            newOpenByIdx[index] = !newOpenByIdx[index];
            setOpenByIdx(newOpenByIdx);
            }
            const handleConfirmModal = (
            remove: <X=any>(index: number) => X | undefined,
                index: number,
                formik: FormikProps<{ forms: { pekerjaan: string }[]; }>,
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
                    return (
                        <Authenticated>
                            <Formik
                                initialValues={{ forms: [{ pekerjaan: '' }] }}
                                onSubmit={(values) => {
                                    console.log(values);
                                }}
                                validationSchema={validationSchema}
                            >
                                {(formikProps) => (
                                    <FieldArray name="forms">
                                        {({ push, remove }) => (
                                            <>
                                                <DataPekerjaanForm
                                                    handleConfirmModal={
                                                        handleConfirmModal
                                                    }
                                                    setOpenByIdx={setOpenByIdx}
                                                    toggleAccordion={
                                                        toggleAccordion
                                                    }
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
                                )}
                            </Formik>
                        </Authenticated>
                    );
                    }
