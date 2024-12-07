export type Province = {
    id: number;
    name: string;
};

export type Regency = {
    id: number;
    name: string;
    province: Province;
};

export type District = {
    id: number;
    name: string;
    regency: Regency;
};

export type Village = {
    id: number;
    name: string;
    district: District;
};

export type DebugProps = {
    data: Village;
};

export interface InputPendudukProps {
    nik: string;
    nama: string;
    tanggaLahir: string;
    kelamin: { id: string | null; name: string };
}

// nik
// nama
// tempat_lahir
// tanggal_lahir
// kelamin_id
// gol_darah_id
// alamat_id
// agama_id
// status_kawin_id
// pekerjaan_id
// kewarganegaraan_id
