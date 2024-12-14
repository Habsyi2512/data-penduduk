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

export type jenisKelaminType = { id: string; jenis_kelamin: string };
export type golDarahType = { id: string; gol_darah: string };
export type agamaType = { id: string; agama: string };
export type statusKawinType = { id: string; status: string };
export type pekerjaanType = { id: string; pekerjaan: string };
export type kewarganegaraanType = { id: string; kewarganegaraan: string };

export interface InputPendudukProps {
    nik: string;
    nama: string;
    tempat_lahir: string;
    tanggal_lahir: string;
    jenis_kelamin: jenisKelaminType;
    gol_darahs: {id:string, gol_darah:string};
    agama: agamaType;
    status_kawin: statusKawinType;
    pekerjaan: pekerjaanType;
    kewarganegaraan: kewarganegaraanType;
    alamat: {
        id: string;
        alamat: string;
        kelurahan_id: string;
        kelurahan_nama: string;
        kecamatan_nama: string;
        kabupaten_nama: string;
    };
}
