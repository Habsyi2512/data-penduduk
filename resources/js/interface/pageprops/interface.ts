import { FormikProps } from 'formik';
import { SetStateAction } from 'react';
import {
    agamaType,
    golDarahType,
    InputPendudukProps,
    jenisKelaminType,
    kewarganegaraanType,
    pekerjaanType,
    statusKawinType,
} from '../interface';

export interface AddPendudukProps {
    agama: agamaType[];
    dataKelamin: jenisKelaminType[];
    dataGolDarah: golDarahType[];
    dataStatusKawin: statusKawinType[];
    dataPekerjaan: pekerjaanType[];
    dataKewarganegaraan: kewarganegaraanType[];
}

export interface AddPendudukFormProps {
    formik: FormikProps<{
        forms: InputPendudukProps[];
    }>;
    data: AddPendudukProps;
    formField: InputPendudukProps;
    push: <X = any>(obj: X) => void;
    remove: <X = any>(index: number) => X | undefined;
    openByIdx: boolean[];
    setOpenByIdx: React.Dispatch<SetStateAction<boolean[]>>;
    toggleAccordion: (index: number) => void;
    handleConfirmModal?: (
        remove: <X = any>(index: number) => X | undefined,
        index: number,
        formik: FormikProps<{
            forms: InputPendudukProps[];
        }>,
    ) => void;
    setIsOpenDiscardModal?:React.Dispatch<SetStateAction<boolean>>;
    setIsOpenSubmitModal:React.Dispatch<SetStateAction<boolean>>;
    setIdx?: React.Dispatch<React.SetStateAction<number>>|undefined;
}
