import DataAgamaForm from '@/Components/form/DataAgamaForm';
import DataGolDarahForm from '@/Components/form/DataGolDarahForm';
import ConfirmDiscardModal from '@/Components/modal/ConfirmDiscardModal';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Inertia } from '@inertiajs/inertia';
import { FieldArray, Formik, FormikProps } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';

const validationSchema = Yup.object({
forms: Yup.array().of(
Yup.object({
gol_darah: Yup.string().required('Golongan Darah is required'),
}),
),
});

interface DataGolDarahProps {
    gol_darah: { 
        id: number;
        gol_darah: string;
    }[];
}


export default function DataGolDarah({ gol_darah }: DataGolDarahProps) {
const [openByIdx, setOpenByIdx] = React.useState<boolean[]>([true]);
    const [idx, setIdx] = useState<number>(0);
        const [isOpenConfirmModal, setIsOpenConfirmModal] =
        useState<boolean>(false);
            const toggleAccordion = (index: number) => {
            const newOpenByIdx = [...openByIdx];
            newOpenByIdx[index] = !newOpenByIdx[index];
            setOpenByIdx(newOpenByIdx);
            };
            const handleConfirmModal = (
            remove: <X=any>(index: number) => X | undefined,
                index: number,
                formik: FormikProps<{ forms: { gol_darah: string }[]; }>,
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
                const handleSubmit = (values: {
                    forms: { gol_darah: string }[];
                }) => {
                    console.log(values);
                    // Kirim data ke backend
                    Inertia.post(
                        '/dashboard/data-gol-darah',
                        { gol_darah: values.forms[0].gol_darah },
                        {
                            onFinish: () => {
                                values.forms[0].gol_darah = '';
                            },
                        },
                    );
                };

                    return (
                        <Authenticated>
                            <div className="p-5">
                                <h1 className="mb-5 text-center text-3xl font-bold text-blue-600">
                                    Manajemen Data Golongan Darah
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
                                                    Golongan Darah
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {gol_darah.map((item, index) => (
                                                <tr
                                                    key={item.id}
                                                    className="hover:bg-gray-50"
                                                >
                                                    <td className="border border-gray-300 px-4 py-2">
                                                        {index + 1}
                                                    </td>
                                                    <td className="border border-gray-300 px-4 py-2">
                                                        {item.gol_darah}
                                                        
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <Formik
                                initialValues={{ forms: [{ gol_darah: '' }] }}
                                onSubmit={handleSubmit}
                                validationSchema={validationSchema}
                            >
                                {(formikProps) => (
                                    <FieldArray name="forms">
                                        {({ push, remove }) => (
                                            <>
                                                <DataGolDarahForm
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
