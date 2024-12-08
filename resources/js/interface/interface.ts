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
    jenis_kelamin: {id:string, jenis_kelamin:string};
    gol_darahs: {id:string, gol_darah:string};
    agama: {id:string, agama:string};
    status_kawin: {id:string, status:string};
    pekerjaan: {id:string, pekerjaan:string};
    kewarganegaraan: {id:string, kewarganegaraan:string};
    alamat: {id:string, alamat: string, kelurahan_id:string}
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
