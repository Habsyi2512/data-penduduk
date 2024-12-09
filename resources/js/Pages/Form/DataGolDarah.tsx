import DataAgamaForm from '@/Components/form/DataAgamaForm';
import DataGolDarahForm from '@/Components/form/DataGolDarahForm';
import ConfirmDiscardModal from '@/Components/modal/ConfirmDiscardModal';
import Table from '@/Components/table/Table';
import TableBody from '@/Components/table/TableBody';
import TableHead from '@/Components/table/TableHead';
import Td from '@/Components/table/Td';
import Th from '@/Components/table/Th';
import Tr from '@/Components/table/Tr';
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
                            <div className="px-5">
                                <h1 className="mb-3 py-2 font-inter text-2xl font-bold text-blue-500">
                                    Management Data Golongan Darah
                                </h1>
                            </div>
                            <Table>
                                <TableHead>
                                    <Tr>
                                        <Th>No</Th>
                                        <Th>Golongan Darah</Th>
                                    </Tr>
                                </TableHead>
                                <TableBody>
                                    {gol_darah.map((item, index) => (
                                        <Tr>
                                            <Td>{index + 1}</Td>
                                            <Td>{item.gol_darah}</Td>
                                        </Tr>
                                    ))}
                                </TableBody>
                            </Table>
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
