import AddPendudukForm from '@/Components/form/AddPendudukForm';
import ConfirmDiscardModal from '@/Components/modal/ConfirmDiscardModal';
import ConfirmSubmitModal from '@/Components/modal/ConfirmSubmitModal';
import { useLoadingContext } from '@/context/LoadingContext';
import { AddPendudukProps, CommonFormikProps } from '@/interface/pageprops/interface';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { handleSubmitTambahPenduduk } from '@/services/form/routerService';
import { FieldArray, Formik, FormikProps } from 'formik';
import { useState } from 'react';
import { formFieldBiodata } from './InitialValues';
import { validationSchemabuatKTP } from './validation';
import { InputPendudukProps } from '@/interface/interface';

export default function AddPenduduk({ agama, dataKelamin, dataGolDarah, dataKewarganegaraan, dataPekerjaan, dataStatusKawin, dataStatusHubungan }: AddPendudukProps) {
    const [openByIdx, setOpenByIdx] = useState<boolean[]>([true]);
    const [idx, setIdx] = useState<number>(0);
    const [isOpenSubmitModal, setIsOpenSubmitModal] = useState(false);
    const [isOpenDiscardModal, setisOpenDiscardModal] = useState<boolean>(false);
    const { setLoading } = useLoadingContext();

    const toggleAccordion = (index: number) => {
        const newOpenByIdx = [...openByIdx];
        newOpenByIdx[index] = !newOpenByIdx[index];
        setOpenByIdx(newOpenByIdx);
    };

    // const printRef = useRef<HTMLDivElement>(null);

    // const handlePrint = useReactToPrint({ contentRef: printRef });

    return (
        <Authenticated>
            {/* <PrintComponent ref={printRef} /> */}
            <Formik
                initialValues={{
                    forms: [formFieldBiodata],
                }}
                onSubmit={(values) =>
                    handleSubmitTambahPenduduk(values, {
                        onSuccess: () => {
                            setLoading(false);
                        },
                    })
                }
                validationSchema={validationSchemabuatKTP}
            >
                {(formikProps) => {
                    return (
                        <FieldArray name="forms">
                            {({ push, remove }) => (
                                <>
                                    <AddPendudukForm
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

// const PrintComponent = React.forwardRef<HTMLDivElement, {}>((props, ref) => (
//     <div {...props} ref={ref} className="hidden bg-red-200 p-8" id="print-section">
//         <div>
//             <h1>Data Penduduk</h1>
//             <p>Nama: John Doe</p>
//             <p>Alamat: Jalan Kebon Kacang, Jakarta</p>
//             <p>Usia: 30 Tahun</p>
//         </div>
//         <hr />
//         <div>
//             <h1>Data Penduduk</h1>
//             <p>Nama: John Doe</p>
//             <p>Alamat: Jalan Kebon Kacang, Jakarta</p>
//             <p>Usia: 30 Tahun</p>
//         </div>
//         <div>
//             <h1>Data Penduduk</h1>
//             <p>Nama: John Doe</p>
//             <p>Alamat: Jalan Kebon Kacang, Jakarta</p>
//             <p>Usia: 30 Tahun</p>
//         </div>
//     </div>
// ));
