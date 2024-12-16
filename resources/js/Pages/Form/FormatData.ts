import { InputPendudukProps, TypeFormFieldBuatKK } from '@/interface/interface';

export const formFieldBiodata: InputPendudukProps = {
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

export const formFieldBuatKK: TypeFormFieldBuatKK = {
    noKK: '',
    alamat: '',
    kepala_keluarga_nik: '',
    no_kk_semula: '',
    kelurahan: { id: '', name: '' },
    kecamatan: { id: '', name: '' },
    kabupaten: { id: '', name: '' },
};
