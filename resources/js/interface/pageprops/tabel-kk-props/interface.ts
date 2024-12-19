import { Village } from "@/interface/interface";
import { Alamat } from "@/interface/pagination/interface";

export interface DataPendudukProps {
    id: number;
    nik: string;
    nama: string;
    tempat_lahir: string;
    tanggal_lahir: string;
    jenis_kelamin: { id: string; jenis_kelamin: string };
    gol_darah: { id: string; gol_darah: string };
    agama: { id: string; agama: string };
    status_kawin: { id: string; status: string };
    pekerjaan: { id: string; pekerjaan: string };
    kewarganegaraan: { id: string; kewarganegaraan: string };
    status_hubungan_keluarga: { id: string; nama_status: string };
}

export interface DataKKProps{
    no_kk: string;
    alamat:string;
    rt:string;
    rw:string;
    kelurahan_id: string;
    data_penduduk: DataPendudukProps[];
    village: Village;
}

// untuk halaman debug
export interface DataKKPageProps {
    data: DataKKProps[];
}

