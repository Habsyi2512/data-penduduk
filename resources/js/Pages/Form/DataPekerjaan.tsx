import DataPekerjaanForm from '@/Components/form/DataPekerjaanForm';
import ConfirmDiscardModal from '@/Components/modal/ConfirmDiscardModal';
import PaginationLinks from '@/Components/pagination/PaginationLinks';
import Table from '@/Components/table/Table';
import TableBody from '@/Components/table/TableBody';
import TableHead from '@/Components/table/TableHead';
import Td from '@/Components/table/Td';
import Th from '@/Components/table/Th';
import Tr from '@/Components/table/Tr';
import { PaginatePekerjaan } from '@/interface/pagination/interface';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Inertia } from '@inertiajs/inertia';
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

interface PopulationDataProps {
    pekerjaan: PaginatePekerjaan;
}

interface PekerjaanFormProps {
    pekerjaan : {
        id: number;
        pekerjaan: string;
    }[];
}
export default function DataPekerjaan({pekerjaan}: PopulationDataProps) {
const current_page = pekerjaan.current_page;
const per_page = pekerjaan.per_page;
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

                    const handleSubmit = (values: {
                        forms: { pekerjaan: string }[];
                    }) => {
                        console.log(values);
                        // Kirim data ke backend
                        Inertia.post(
                            '/dashboard/data-pekerjaan',
                            { pekerjaan: values.forms[0].pekerjaan },
                            {
                                onFinish: () => {
                                    values.forms[0].pekerjaan = '';
                                },
                            },
                        );
                    };
                    return (
                        <Authenticated>
                            <div className="px-5">
                                <h1 className="mb-3 py-2 font-inter text-2xl font-bold text-blue-500">
                                    Management Data Pekerjaan
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
                                    {pekerjaan.data.map((item, index) => (
                                        <Tr>
                                            <Td>
                                                {index +
                                                    1 +
                                                    (current_page - 1) *
                                                        per_page}
                                            </Td>
                                            <Td>{item.pekerjaan}</Td>
                                        </Tr>
                                    ))}
                                </TableBody>
                            </Table>
                            <tfoot className="mt-5 flex items-center justify-center">
                                <PaginationLinks links={pekerjaan.links} />
                            </tfoot>
                            <Formik
                                initialValues={{ forms: [{ pekerjaan: '' }] }}
                                onSubmit={handleSubmit}
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
