import { DataKKProps } from './pageprops/tabel-kk-props/interface';

export type BaseEntity = {
    id: number | string;
    name: string;
};

export type Regency = BaseEntity;

export type District = BaseEntity & {
    regency: Regency;
};

export type Village = BaseEntity & {
    district: District;
};

export type DebugProps = {
    data: Village;
};

// Enumerated Types
export type EnumType<T extends string> = {
    id: number | string;
} & {
    [key in T]: string;
};

// Specific Enum Definitions
export type JenisKelaminType = EnumType<'jenis_kelamin'>;
export type GolDarahType = EnumType<'gol_darah'>;
export type AgamaType = EnumType<'agama'>;
export type StatusKawinType = EnumType<'status'>;
export type PekerjaanType = EnumType<'pekerjaan'>;
export type KewarganegaraanType = EnumType<'kewarganegaraan'>;
export type StatusHubunganType = EnumType<'nama_status'>;

// InputPendudukProps
export interface InputPendudukProps {
    no_kk: string;
    nama: string;
    tempat_lahir: string;
    tanggal_lahir: string;
    jenis_kelamin: JenisKelaminType;
    gol_darahs: GolDarahType;
    agama: AgamaType;
    status_kawin: StatusKawinType;
    pekerjaan: PekerjaanType;
    kewarganegaraan: KewarganegaraanType;
    status_hubungan: StatusHubunganType;
}

// Kepala Keluarga Type
export interface TypeKepalaKeluarga {
    nik: string;
    name: string;
    no_kk: string;
    statusHubungan: BaseEntity;
}

// Form Field for KK Creation
export interface TypeFormFieldBuatKK {
    alamat: string;
    rt: string;
    rw: string;
    kepala_keluarga_nik: string;
    no_kk_semula: string;
    kelurahan: BaseEntity;
    kecamatan: BaseEntity;
    kabupaten: BaseEntity;
    statusAnggotaKeluarga: {nik:string, status_hubungan:{id:string, nama_status:string}}[]
}

export interface TypeFormFieldPindahKK {
    nikPemohon: string;
    namaPemohon: string;
    noKKLama: string;
    noKKBaru: string;
    statusHubunganLama: BaseEntity;
    statusHubunganBaru: BaseEntity;
}

export interface TypeSuggestions {
    desa: Village[];
    NIK: TypeKepalaKeluarga[];
    KK: DataKKProps[];
}
