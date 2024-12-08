import { InputPendudukProps } from "@/interface/interface";

export const formField: InputPendudukProps = {
    nik: '',
    nama: '',
    tempat_lahir: '',
    tanggal_lahir: '',
    jenis_kelamin: { id: '', jenis_kelamin: '' },
    gol_darahs: { id: '', gol_darah: '' },
    agama: { id: '', agama: '' },
    status_kawin: { id: '', status: '' },
    pekerjaan: { id: '', pekerjaan: '' },
    kewarganegaraan: { id: '', kewarganegaraan: '' },
    alamat: {
        id: '',
        alamat: '',
        kelurahan_id: '',
        kelurahan_nama: '',
        kecamatan_nama: '',
        kabupaten_nama: '',
    },
};