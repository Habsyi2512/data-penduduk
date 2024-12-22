import { FormikProps } from 'formik';
import { SetStateAction } from 'react';
import { AgamaType, GolDarahType, InputPendudukProps, JenisKelaminType, KewarganegaraanType, PekerjaanType, StatusHubunganType, StatusKawinType } from '../interface';

// Type untuk properti yang sering digunakan
export type CommonFormikProps = FormikProps<{ forms: InputPendudukProps[] }>;

type CommonModalHandlers = {
    setIsOpenDiscardModal: React.Dispatch<SetStateAction<boolean>>;
    setIsOpenSubmitModal: React.Dispatch<SetStateAction<boolean>>;
    setIdx: React.Dispatch<SetStateAction<number>>;
};

type AccordionHandlers = {
    openByIdx: boolean[];
    setOpenByIdx: React.Dispatch<SetStateAction<boolean[]>>;
    toggleAccordion: (index: number) => void;
};

// Type untuk data tambahan yang dibutuhkan
export interface AddPendudukProps {
    agama: AgamaType[];
    dataKelamin: JenisKelaminType[];
    dataGolDarah: GolDarahType[];
    dataStatusKawin: StatusKawinType[];
    dataPekerjaan: PekerjaanType[];
    dataKewarganegaraan: KewarganegaraanType[];
    dataStatusHubungan: StatusHubunganType[];
}

// Base interface untuk form penduduk
interface BasePendudukFormProps {
    formik: CommonFormikProps;
    data: AddPendudukProps;
    push: <X = any>(obj: X) => void;
    remove: <X = any>(index: number) => X | undefined;
    handleConfirmModal?: (remove: <X = any>(index: number) => X | undefined, index: number, formik: CommonFormikProps) => void;
}

// Interface untuk form Add Penduduk
export interface AddPendudukFormProps extends BasePendudukFormProps, AccordionHandlers, CommonModalHandlers {
    formField: InputPendudukProps; // Form field tunggal
}

// Interface untuk form Edit Penduduk
export interface EditPendudukFormProps extends BasePendudukFormProps, AccordionHandlers, CommonModalHandlers {
    formField: InputPendudukProps[]; // Form field array
}
