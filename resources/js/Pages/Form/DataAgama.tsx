import DataAgamaForm from '@/Components/form/DataAgamaForm';
import ConfirmDiscardModal from '@/Components/modal/ConfirmDiscardModal';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Inertia } from '@inertiajs/inertia';
import { FieldArray, Formik, FormikProps } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';

const validationSchema = Yup.object({
    forms: Yup.array().of(
        Yup.object({
            agama: Yup.string().required('Agama is required'),
        }),
    ),
});

interface DataAgamaProps {
    data_agama: {
        id: number;
        agama: string;
    }[];
}

export default function DataAgama({data_agama}: DataAgamaProps){
    const [openByIdx, setOpenByIdx] = React.useState<boolean[]>([true]);
    const [idx, setIdx] = useState<number>(0);
    const [isOpenConfirmModal, setIsOpenConfirmModal] = useState<boolean>(false);
    const toggleAccordion = (index: number) => {
        const newOpenByIdx = [...openByIdx];
        newOpenByIdx[index] = !newOpenByIdx[index];
        setOpenByIdx(newOpenByIdx);
    }
    const handleConfirmModal = (
        remove: <X = any>(index: number) => X | undefined,
        index: number,
        formik: FormikProps<{
            forms: { agama: string }[]; 
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

    const handleSubmit = (values: { forms: { agama: string }[] }) => {
        console.log(values);
        // Kirim data ke backend
        Inertia.post(
            '/dashboard/data-agama',
            { agama: values.forms[0].agama },
            {
                onFinish: () => {
                    values.forms[0].agama = '';
                },
            },
        );
    };

    return (
        <Authenticated>
            <div className="p-5">
                <h1 className="mb-5 text-center text-3xl font-bold text-blue-600">
                    Manajemen Data Agama
                </h1>

                <div className="overflow-x-auto">
                    <table
                        className="border-collaps table-fixed border border-gray-300"
                        style={{ width: '600px' }}
                    >
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="w-1/4 border border-gray-300 px-4 py-2 text-left">
                                    No
                                </th>
                                <th className="w-3/4 border border-gray-300 px-4 py-2 text-left">
                                    Agama
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data_agama.map((item, index) => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="border border-gray-300 px-4 py-2">
                                        {index + 1}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {item.agama}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Formik
                initialValues={{ forms:[{agama: ''}] }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            
            >
                {(formikProps) => (
                    <FieldArray name="forms">
                        {({ push, remove }) => (
                            <>
                                <DataAgamaForm
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