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

// Type untuk properti yang sering digunakan
type CommonFormikProps = FormikProps<{
    forms: InputPendudukProps[];
}>;

type CommonModalHandlers = {
    setIsOpenDiscardModal?: React.Dispatch<SetStateAction<boolean>>;
    setIsOpenSubmitModal: React.Dispatch<SetStateAction<boolean>>;
    setIdx?: React.Dispatch<SetStateAction<number>> | undefined;
};

type AccordionHandlers = {
    openByIdx: boolean[];
    setOpenByIdx: React.Dispatch<SetStateAction<boolean[]>>;
    toggleAccordion: (index: number) => void;
};

// Type untuk data tambahan yang dibutuhkan
export interface AddPendudukProps {
    agama: agamaType[];
    dataKelamin: jenisKelaminType[];
    dataGolDarah: golDarahType[];
    dataStatusKawin: statusKawinType[];
    dataPekerjaan: pekerjaanType[];
    dataKewarganegaraan: kewarganegaraanType[];
}

// Base interface untuk form penduduk
interface BasePendudukFormProps {
    formik: CommonFormikProps;
    data: AddPendudukProps;
    push: <X = any>(obj: X) => void;
    remove: <X = any>(index: number) => X | undefined;
    handleConfirmModal?: (
        remove: <X = any>(index: number) => X | undefined,
        index: number,
        formik: CommonFormikProps,
    ) => void;
}

// Interface untuk form Add Penduduk
export interface AddPendudukFormProps extends BasePendudukFormProps, AccordionHandlers, CommonModalHandlers {
    formField: InputPendudukProps; // Form field tunggal
}

// Interface untuk form Edit Penduduk
export interface EditPendudukFormProps extends BasePendudukFormProps, AccordionHandlers, CommonModalHandlers {
    formField: InputPendudukProps[]; // Form field array
}
