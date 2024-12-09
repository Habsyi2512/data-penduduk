import DataAgamaForm from '@/Components/form/DataAgamaForm';
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

export default function DataAgama({ data_agama}: DataAgamaProps) {
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
            <div className="px-5">
                <h1 className="mb-3 py-2 font-inter text-2xl font-bold text-blue-500">
                    Management Data Agama
                </h1>
            </div>
            <Table>
                <TableHead>
                    <Tr>
                        <Th>No</Th>
                        <Th>Agama</Th>
                    </Tr>
                </TableHead>
                <TableBody>
                    {data_agama.map((item, index) => (
                        <Tr>
                            <Td>{index + 1}</Td>
                            <Td>{item.agama}</Td>
                        </Tr>
                    ))}
                </TableBody>
            </Table>
            <Formik
                initialValues={{ forms: [{ agama: '' }] }}
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
