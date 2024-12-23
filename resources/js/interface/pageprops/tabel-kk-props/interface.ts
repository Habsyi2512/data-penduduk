import { JenisKelaminType, Village } from "@/interface/interface";
import { PaginatedKK } from "@/interface/pagination/interface";

export interface DataPendudukProps {
    id: number;
    nik: string;
    nama: string;
    tempat_lahir: string;
    tanggal_lahir: string;
    jenis_kelamin: JenisKelaminType;
    gol_darah: { id: string; gol_darah: string };
    agama: { id: string; agama: string };
    status_kawin: { id: string; status: string };
    pekerjaan: { id: string; pekerjaan: string };
    kewarganegaraan: { id: string; kewarganegaraan: string };
    status_hubungan_keluarga: { id: string; nama_status: string };
}

// "no_kk": "2105011803090007",
// "alamat": "JL. TANJUNG NO. 35",
// "rt": "001",
// "rw": "002",
// "kelurahan_id": "2105040003",
// "created_at": "2024-12-22T08:53:35.000000Z",
// "updated_at": "2024-12-22T08:53:35.000000Z",
// "data_penduduk": [
export interface DataKKProps{
    no_kk: string;
    alamat:string;
    rt:string;
    rw:string;
    kelurahan_id: string;
    data_penduduk: DataPendudukProps[];
    village: Village;
    created_at: string;
}

// untuk halaman debug
export interface DataKKPageProps {
    data: DataKKProps[];
}

export interface PopulationDataProps {
    data: PaginatedKK;
    filters: { kabupaten: string };
}

