import DataKewarganegaraanForm from '@/Components/form/DataKewarganegaraanForm';
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
            kewarganegaraan: Yup.string().required('Kewarganegaraan is required'),
        }),
    ),
});

interface DataKewarganegaraanProps {
    kewarganegaraan : {
        id: number,
        kewarganegaraan: string,
    }[];
}

export default function DataKewarganegaraan({kewarganegaraan}: DataKewarganegaraanProps) {
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
            forms: { kewarganegaraan: string }[];
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
 const handleSubmit = (values: { forms: { kewarganegaraan: string }[] }) => {
     Inertia.post(
         '/dashboard/data-kewarganegaraan',
         { kewarganegaraan: values.forms[0].kewarganegaraan },
         {
             onFinish: () => {
                 values.forms[0].kewarganegaraan = '';
             },
         },
     );
 };
return (
    <Authenticated>
        <div className="px-5">
            <h1 className="mb-3 py-2 font-inter text-2xl font-bold text-blue-500">
                Management Data Kewarganegaraan
            </h1>
        </div>
        <Table>
            <TableHead>
                <Tr>
                    <Th>No</Th>
                    <Th>Kewarganegaraan</Th>
                </Tr>
            </TableHead>
            <TableBody>
                {kewarganegaraan.map((item, index) => (
                    <Tr>
                        <Td>{index + 1}</Td>
                        <Td>{item.kewarganegaraan}</Td>
                    </Tr>
                ))}
            </TableBody>
        </Table>
        <Formik
            initialValues={{ forms: [{ kewarganegaraan: '' }] }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
        >
            {(formikProps) => (
                <FieldArray name="forms">
                    {({ push, remove }) => (
                        <>
                            <DataKewarganegaraanForm
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
