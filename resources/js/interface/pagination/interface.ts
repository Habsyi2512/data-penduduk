import { InputPendudukProps } from "../interface";


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
    data: T[];
    links: PaginationLink[];
    meta: PaginationMeta;
}

// Gunakan tipe dengan InputPendudukProps
export type PaginatedPenduduk = PaginatedData<InputPendudukProps>;
