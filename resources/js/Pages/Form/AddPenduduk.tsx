import AddPendudukForm from '@/Components/form/AddPendudukForm';
import ConfirmDiscardModal from '@/Components/modal/ConfirmDiscardModal';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { FieldArray, Formik, FormikProps } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';

const validationSchema = Yup.object({
    forms: Yup.array().of(
        Yup.object({
            nik: Yup.string()
                .required('NIK is required')
                .length(16, 'NIK must be 16 characters'),
            name: Yup.string().required('Name is required'),
        }),
    ),
});

export default function AddPenduduk() {
    const [openByIdx, setOpenByIdx] = useState<boolean[]>([false]);
    const [idx, setIdx] = useState<number>(0);
    const [isOpenConfirmModal, setIsOpenConfirmModal] =
        useState<boolean>(false);
    // Fungsi untuk toggle accordion
    const toggleAccordion = (index: number) => {
        const newOpenByIdx = [...openByIdx];
        newOpenByIdx[index] = !newOpenByIdx[index];
        setOpenByIdx(newOpenByIdx);
    };

    // Fungsi untuk konfirmasi penghapusan
    const handleConfirmModal = (
        remove: <X = any>(index: number) => X | undefined,
        index: number,
        formik: FormikProps<{
            forms: { nik: string; name: string }[]; // Ensure this matches the actual structure you're using
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
    return (
        <Authenticated>
            <Formik
                initialValues={{ forms: [{ nik: '', name: '' }] }}
                onSubmit={(values) => {
                    console.log('Form Submitted:', values);
                }}
                validationSchema={validationSchema} // Apply Yup validation schema
            >
                {(formikProps) => (
                    <FieldArray name="forms">
                        {({ push, remove }) => (
                            <>
                                <AddPendudukForm
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
                                        isOpenConfirmModal={isOpenConfirmModal}
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
