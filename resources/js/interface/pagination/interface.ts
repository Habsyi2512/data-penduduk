import { DataKKProps } from "../pageprops/tabel-kk-props/interface";

export interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

export interface PaginationMeta {
    current_page: number;
    from: number | null;
    last_page: number;
    path: string;
    per_page: number;
    to: number | null;
    total: number;
}

export interface PaginatedData<T> {
    data: (T & { globalIndex: number })[]; // Menambahkan globalIndex pada setiap item data
    links: PaginationLink[];
    meta: PaginationMeta;
    current_page: number;
    per_page: number;
}


export interface Regency {
    id: string;
    name: string;
}

export interface District {
    id: string;
    name: string;
    regency_id: string;
    regency: Regency;
}

export interface Village {
    id: string;
    name: string;
    district_id: string;
    district: District;
}

export interface Alamat {
    id: number;
    alamat: string;
    kelurahan_id: string;
    created_at: string;
    updated_at: string;
    
}

export interface DataPendudukProps {
    id: number;
    nik: string;
    nama: string;
    tempat_lahir: string;
    tanggal_lahir: string;
    no_kk: {id:string, no_kk: string};
    status_hubungan: {id:string, status_hubungan: string};
    jenis_kelamin: { id: string; jenis_kelamin: string };
    gol_darah: { id: string; gol_darah: string };
    agama: { id: string; agama: string };
    status_kawin: { id: string; status: string };
    pekerjaan: { id: string; pekerjaan: string };
    kewarganegaraan: { id: string; kewarganegaraan: string };
}

// Gunakan tipe dengan InputPendudukProps
export type PaginatedPenduduk = PaginatedData<DataPendudukProps>;
export type PaginatedKK = PaginatedData<DataKKProps>;

export type PaginatePekerjaan = PaginatedData<{
    id: number;
    pekerjaan: string;
}>;
