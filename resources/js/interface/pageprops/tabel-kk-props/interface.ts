import { Alamat } from "@/interface/pagination/interface";

interface DataPendudukProps {
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
    alamat: Alamat; // Menambahkan alamat ke data penduduk
}

export interface DataKKProps{
    no_kk: string;
    alamat: Alamat;
    alamat_id: string;
    data_penduduk: DataPendudukProps[];
}

export interface DataKKProps {
    data: DataKKProps[];
}

